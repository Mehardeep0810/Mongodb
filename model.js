const mongoose  = require("mongoose");
const player = new mongoose.Schema({
    name:String,
    rollno:String
});
module.exports = mongoose.model('india',player)