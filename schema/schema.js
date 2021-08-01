const {GraphQLObjectType, GraphQLString,GraphQLSchema, GraphQLID, GraphQLList,GraphQLNonNull} = require('graphql')
var { buildSchema } = require('graphql');
const Students = require('../models/Students');
const Subjects = require('../models/Subjects');

const student = buildSchema(`
    type Query{
        hello:String!
    }
`)

const StudentType = new GraphQLObjectType({
    name: 'Student',
    fields: () => ({
        id: { type: GraphQLID },
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone: { type: GraphQLString },
        dob: { type: GraphQLString },
        subjects: {
            type: SubjectType,
            resolve(parent, args) {
                //code to get subjects
                return Subjects.findById(parent.subjectId)
            }
        }
    })
})
const SubjectType = new GraphQLObjectType({
    name: 'Subject',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        students: {
            type: new GraphQLList(StudentType),
            resolve(parent, args) {
                // code to get the students
                return Students.find({subjectId:parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        student: {
            type: StudentType,
            args: { id: { type: GraphQLID } },
            resolve(parent,args) {
                // code to get data from db
                return Students.findById(args.id)
            }
        },
        subject: {
            type: SubjectType,
            args: ({ id: { type: GraphQLID } }),
            resolve(parent, args) {
                // code to get data from db
                return Subjects.findById(args.id)
            }
        },
        students: {
            type: new GraphQLList(StudentType),
            resolve() {
                // return results
                return Students.find({})
            }
        },
        subjects: {
            type: new GraphQLList(SubjectType),
            resolve() {
                // return results
                return Subjects.find({})
            }
        },
        deleteStudent: {
            type: StudentType,
            args: { id: { type: GraphQLID } },
            resolve(parent,args) {
                // code to get data from db
                return Students.findByIdAndDelete(args.id)
            }
        },
    },
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addSubject: {
            type: SubjectType,
            args: {
                name :{type:new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                let subject = new Subjects({
                    name:args.name
                })
                return subject.save()
            }
        },
        addStudent: {
            type: StudentType,
            args: {
                name :{type:new GraphQLNonNull(GraphQLString)},
                email :{type:new GraphQLNonNull(GraphQLString)},
                phone :{type:new GraphQLNonNull(GraphQLString)},
                dob: { type: new GraphQLNonNull(GraphQLString) },
                subjectId:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let student = new Students({
                    name: args.name,
                    email :args.email,
                    phone :args.phone,
                    dob: args.dob,
                    subjectId:args.subjectId
                })
                return student.save()
            }
        }
    }
})

module.exports = {
    student, StudentType, RootQuery, schema: new GraphQLSchema({
        query: RootQuery,
        mutation:Mutation
    })
}