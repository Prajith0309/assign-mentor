const express = require('express')
const mongoose = require('mongoose')
const mentor = require('./routers/mentor')
const student = require('./routers/student')
const connection = require("./dbconnect")
const app = express()

connection.then(() => {
    console.log('Connection successful');
  }).catch(err => console.log('Connection failed', err));
  
app.use(express.json())



app.use(mentor)
app.use(student)
  
const port = process.env.PORT || 3001
app.listen(port,()=>{console.log(`running in ${port}`)})