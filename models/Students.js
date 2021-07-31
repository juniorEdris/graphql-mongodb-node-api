const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    dob: String,
    subjectId:String,
})

module.exports = mongoose.model('Students',StudentSchema)