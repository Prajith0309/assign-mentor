const express = require('express')

const Mentormodel = require('../models/mentormodel')
const Studentmodel = require('../models/studentmodel')

const router = express.Router()

router.post('/api/mentor',async(req,res)=>{
    try{
        const mentor = new Mentormodel({
            name: req.body.name
        })
        await mentor.save()
        res.send(mentor)
    }catch(err){
        console.log('Error:', err)
        res.status(500).send('Internal Server Error');
    }
    
})

router.put('/api/mentor/assign-students/:mentorid',async(req,res)=>{
    try{
        let selected_mentor = await Mentormodel.findById(req.params.mentorid)
        if(!selected_mentor) return res.status(404).send('No match found')
    
        let arr = req.body.assignedStudents;
        const value = arr.split('[')[1].split(']')[0];
        
        const aftersplit = value.split(",").map(element => element.replace(/'/g, '').trim());
        
        let students = await Studentmodel.find({})
        
        let studval = students.map((student)=>{
            return student.name
        })
        
        let studentcheck = aftersplit.filter((val) => {
            return studval.includes(val)
        });
        
        if(studentcheck.length>0){
            res.send('one or more students in the list already have a mentor or they will choose there mentor through another route')
        }
        else{
            let alreadyAsiigned = selected_mentor.assignedStudents
            let assigncheck = aftersplit.filter((val) => {
                return alreadyAsiigned.includes(val)
            });
            if(assigncheck.length>0){
                res.send('one or more names in the list already astudent of this mentor')
            }else{
                
                alreadyAsiigned.push(...aftersplit)
                await selected_mentor.save()
                res.send(selected_mentor);
            }
        }
    }catch(err){
        console.log('Error:', err)
        res.status(500).send('Internal Server Error');
    }   
})

router.get('/api/student-list/:mentorid',async(req,res)=>{
    try{
        let mentordata = await Mentormodel.findOne({ _id: req.params.mentorid });
        if(!mentordata) return res.status(404).send('No match found')
        res.send(mentordata.assignedStudents)
    }catch(err){
        console.log('Error:', err)
        res.status(500).send('Internal Server Error');
    }
    
})

module.exports = router;