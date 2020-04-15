const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    studentname:{type:String,required:true},
    studentage:{type:String,required:true}   
});

module.exports = mongoose.model('Student',studentSchema);