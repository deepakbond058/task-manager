// components/TaskForm.js
import '../styles/TaskForm.css';
import React, { useState } from 'react';

const TaskForm = ({ fetchTasks }) => {
  const [task, setTask] = useState({ title: '', description: '', status: 'Pending' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    setTask({ title: '', description: '', status: 'Pending' });
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit} className="form-group mb-4">
      <div className="form-row">
        <div className="col-12 mb-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
        </div>
        <div className="col-12 mb-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            className="form-control"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            required
          />
        </div>
        <div className="col-12 mb-2">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className="form-control"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-block mt-3">Add Task</button>
    </form>
  );
};

export default TaskForm;
