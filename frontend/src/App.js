// App.js
import './styles/App.css';
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`);
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTask = async (id, updatedTask) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}?status=${updatedTask.status}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  return (
    <div className="app container my-4">
      <h1 className="text-center mb-4">Task Manager</h1>
      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
