const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const studentSchema = new Schema({
    id: {type: Number , unique: true},
    name: {type: String , required:true},
    currentClass: {type: Number , required:true},
    division: {type: String , required:true}
    
})

const studentModel = mongoose.model("datas" , studentSchema);

module.exports = studentModel