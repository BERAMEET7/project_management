const mongoose = require("mongoose");
const {Schema} = mongoose;

const ProjectSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique: true
    },
    price:{
        type:Number,
        required:true
    },
    due_date:{
        type: Date,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps :true});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;