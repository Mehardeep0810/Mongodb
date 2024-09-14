const mongoose  = require("mongoose");
const student = new mongoose.Schema({
    name:String,
    rollno:String
})
module.exports = mongoose.model('students',student)