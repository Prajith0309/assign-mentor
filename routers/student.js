const express = require('express')

const Studentmodel = require('../models/studentmodel')
const Mentormodel = require('../models/mentormodel')
const router = express.Router()

router.post('/api/student',async(req,res)=>{
    try{
        const student = new Studentmodel({
            name: req.body.name
        })
        await student.save()
        res.send(student)
    }catch(err){
        console.log('Error:', err)
        res.status(500).send('Internal Server Error');
    }
    
})

router.put('/api/student/assign-mentor/:studentid', async(req,res)=>{
    try{
        let selected_student = await Studentmodel.findById(req.params.studentid)
    
        if(!selected_student) return res.status(404).send('No match found')
   
        let mentors = await Mentormodel.find()
    
        let newmentorname = req.body.assignedMentor;
        let selected_studentname = selected_student.name;

        let checkname = mentors.filter((mentor)=>{
          return mentor.name == newmentorname
        })
        if(newmentorname === selected_student.assignedMentor){
          res.send('you are not updating the you have entered the same mentorname')
    }else{
        if(checkname.length>0){
            
            let selected_mentor = await Mentormodel.findOne({ name: checkname[0].name });
            selected_mentor.assignedStudents.push(selected_studentname)
            
            
            selected_student.assignedMentor = newmentorname;
            await selected_student.save()
            await selected_mentor.save()
            res.send(selected_student)
        }else{
            selected_student.assignedMentor = newmentorname;
            await selected_student.save()
            res.send(selected_student)
        }
    }
    }catch(err){
        console.log('Error:', err)
        res.status(500).send('Internal Server Error');
    }   
})

router.get('/api/mentor/:studentid',async(req,res)=>{
    try{
        let studentdata = await Studentmodel.findOne({ _id: req.params.studentid });
        if(!studentdata) return res.status(404).send('No match found')
        res.send(studentdata.assignedMentor)
    }catch(err){
        console.log('Error:', err)
        res.status(500).send('Internal Server Error');
    }
    
})


module.exports = router;