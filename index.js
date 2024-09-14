const express = require("express")();
const http = require('http').Server(express);
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mehardeepk38:JzlByvi3SPJJQKNj@cluster0.afkg8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
const india = require('./models/model');
//const { name } = require("ejs");

async function insert(){
    await india.create({
        name:'Mehardeep Kaur',
        rollno:'2210997287' 
    });
}
insert();
http.listen(3000,()=>{
    console.log("server is running ")
})