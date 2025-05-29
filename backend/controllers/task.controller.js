const Project = require("../models/project.model");
const Task = require("../models/task.model");

exports.getAllTask = async(req,res,next)=>{
    try {
        const allproject = await Task.find();
        return res.status(200).json({success:true , data:allproject});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getAllTaskOfProject = async(req,res,next)=>{
    try {
        const projectid = req.params.id;
        const tasks = await Task.find({project_id : projectid});
        return res.status(200).json({data:tasks , success:true});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.createTask = async(req,res,next)=>{
    try {
        const {name ,project_id , due_date ,description} = req.body;

        if(project_id){
            const pproject = await Project.findById(project_id); 
            if (!pproject) {
                return res.status(400).json({success : false , message :"Project Not Found"});
            }
        }
        
        let newTask = new Task ({
            name , project_id , due_date ,description
        })

        await newTask.save();
        return res.status(201).json({data:newTask , success:true });
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.editTask = async(req,res,next)=>{
     try {
        const { name, project_id, due_date, description } = req.body;
        const Taskid = req.params.id;

        const task = await Task.findById(Taskid)
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        task.name =name ||task.name
        task.price =project_id ||task.project_id
        task.due_date =due_date ||task.due_date
        task.description =description ||task.description

        await task.save();
        return res.status(200).json({success:true , data:task});

    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteTask = async(req,res,next)=>{
    try {
        const taskid = req.params.id;
        await Task.findByIdAndDelete(taskid);
        return res.status(200).json({data:"Task Deleted Successfully" , success:true});
    } catch (error) {
        console.log(error);
        next(error);
    }
}