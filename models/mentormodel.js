const mongoose = require('mongoose')

const mentorSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true, 
        minlength:5, 
        maxlength:30,
        unique: true
    },
    assignedStudents:{
        type: Array,
        default: []
    }
})
const Mentormodel = mongoose.model('MentorModel', mentorSchema)
module.exports = Mentormodel
