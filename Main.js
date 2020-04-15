const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./model/Student');

mongoose.connect('mongodb://localhost:27017/studentdb',{ useNewUrlParser: true } )
.then(() => {
    console.log("Connected to MongoDB with the port 27017");
})
.catch(()=> {
    console.log("Unable to connect to MongoDB"); 
})
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/createStudent',(req,res) => {
    const newStudent = new Student({
        studentname: req.body.studentname,
        studentage: req.body.studentage
    });
    newStudent.save();
    res.status(200).json({
        Status:'Success',
        Message:'Inserted successfully into MongoDB'
    });
})

app.get("/",(req,res,next) => {
    res.json({name:'juju', age:8});
});

app.listen(3001, () => {
    console.log("Running on port 3001");
})

module.exports = app;