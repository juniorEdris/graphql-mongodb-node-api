const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubjectSchema = new Schema({
    name: String,
})

module.exports = mongoose.model('Subjects',SubjectSchema)