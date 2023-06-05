const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true, 
        minlength:5, 
        maxlength:20,
        unique: true
    },
    assignedMentor:{
        type: String,
        default: null
    }
})
const Studentmodel = mongoose.model('StudentModel', studentSchema)
module.exports = Studentmodel