const Project = require("../models/project.model");

exports.getAllProject = async(req,res,next)=>{
    try {
        const allproject = await Project.find();
        return res.status(200).json({success:true , data:allproject});
    } catch (error) {
        console.log(error);
        next(error);
    }
}
exports.createProject = async(req,res,next)=>{
    try {
        const {name ,price , due_date ,description} = req.body;
        
        let newProject = new Project ({
            name ,price , due_date ,description
        })

        await newProject.save();
        return res.status(201).json({data:newProject , success:true });
    } catch (error) {
        console.log(error)
        next(error)
    }
}
exports.editProject = async(req,res,next)=>{
    try {
        const { name, price, due_date, description } = req.body;
        const projectid = req.params.id;

        const project = await Project.findById(projectid)
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        project.name =name ||project.name
        project.price =price ||project.price
        project.due_date =due_date ||project.due_date
        project.description =description ||project.description

        await project.save();

        return res.status(200).json({success:true , data:project});
    } catch (error) {
        console.log(error);
        next(error);
    }
}
exports.deleteProject = async(req,res,next)=>{
    try {
        const projectid = req.params.id;
        await Project.findByIdAndDelete(projectid);

        return res.status(200).json({data:"project Deleted Successfully" , success:true});

    } catch (error) {
        console.log(error);
        next(error);
    }
}
