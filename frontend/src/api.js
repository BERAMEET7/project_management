import axios from 'axios';

const API_BASE = 'http://localhost:3000'; 

// Project APIs
export const getProjects = () => axios.get(`${API_BASE}/project`);
export const createProject = (data) => axios.post(`${API_BASE}/project`, data);
export const updateProject = (id, data) => axios.put(`${API_BASE}/project/${id}`, data);
export const deleteProject = (id) => axios.delete(`${API_BASE}/project/${id}`);

// Task APIs
export const getAllTasks = () => axios.get(`${API_BASE}/task`);
export const getTasksByProject = (id) => axios.get(`${API_BASE}/task/${id}`);
export const createTask = (data) => axios.post(`${API_BASE}/task`, data);
export const updateTask = (id, data) => axios.put(`${API_BASE}/task/${id}`, data);
export const deleteTask = (id) => axios.delete(`${API_BASE}/task/${id}`);