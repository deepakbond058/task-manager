// components/TaskItem.js
import '../styles/TaskItem.css';
import React, { useState } from 'react';

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleSave = () => {
    updateTask(task.id, updatedTask);
    setIsEditing(false);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {isEditing ? (
          <>
            <div className="form-group">
              <label htmlFor="edit-title">Title</label>
              <input
                type="text"
                id="edit-title"
                className="form-control"
                value={updatedTask.title}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-description">Description</label>
              <input
                type="text"
                id="edit-description"
                className="form-control"
                value={updatedTask.description}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-status">Status</label>
              <select
                id="edit-status"
                className="form-control"
                value={updatedTask.status}
                onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button onClick={handleSave} className="btn btn-success mr-2">Save</button>
            <button onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
          </>
        ) : (
          <>
            <h5 className="card-title">{task.title}</h5>
            <p className="card-text">{task.description}</p>
            <p className="card-text"><strong>Status:</strong> {task.status}</p>
            <button onClick={() => setIsEditing(true)} className="btn btn-warning mr-2">Edit</button>
            <button onClick={() => deleteTask(task.id)} className="btn btn-danger">Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
