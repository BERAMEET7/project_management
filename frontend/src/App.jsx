import React, { useEffect, useState } from 'react';
import {getProjects, createProject, updateProject, deleteProject,getTasksByProject, createTask, updateTask, deleteTask} from './api';
import ProjectForm from './components/ProjectForm';
import TaskForm from './components/TaskForm';

import './index.css';

export default function App() {
  const [projects, setProjects] = useState([]);

  const [projectForm, setProjectForm] = useState({ name: '', price: '', due_date: '', description: '', id: null });
  const [taskForm, setTaskForm] = useState({ name: '', due_date: '', description: '', id: null });

  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {fetchProjects();}, []);

  const fetchProjects = async () => {
      const res = await getProjects();
        setProjects(res.data.data);
  };

  const fetchTasks = async (projectId) => {
       const res = await getTasksByProject(projectId);
     setTasks(res.data.data);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    fetchTasks(project._id);
    setProjectForm({ ...project, id: project._id }); // Pre-fill form
    setTaskForm({ name: '', due_date: '', description: '', id: null }); // Reset task form
  };

  const handleTaskEdit = (task) => {
    setTaskForm({ ...task, id: task._id });
  };

  return (
    <div className="container">

      <h1>Project Management System</h1>

      <div className="grid">
        <div className="panel">
          <ProjectForm form={projectForm} setForm={setProjectForm} onCreate={createProject} onUpdate={updateProject} onDelete={deleteProject}
            onRefresh={fetchProjects}
          />

          <h3>All Projects</h3>
          <ul className="list">
            {projects.map((p) => (
              <li key={p._id} className="list-item">
                <span onClick={() => handleProjectSelect(p)}>{p.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {selectedProject && (
          <div className="panel">
            <h2>Tasks for: {selectedProject.name}</h2>
            <TaskForm form={taskForm} setForm={setTaskForm} projectId={selectedProject._id} onCreate={createTask} onUpdate={updateTask} onDelete={deleteTask}
            fetchTasks={() => fetchTasks(selectedProject._id)}
            />

            <ul className="list">
              {tasks.map((t) => (
                <li key={t._id} className="list-item">
                  <span onClick={() => handleTaskEdit(t)}>{t.name} - {t.due_date}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
