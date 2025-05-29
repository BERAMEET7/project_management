const mongoose = require("mongoose");
const {Schema} = mongoose;

const TaskSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique: true
    },
    project_id:{
        type:mongoose.Types.ObjectId,
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

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;