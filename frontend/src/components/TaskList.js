// components/TaskList.js
import '../styles/TaskList.css';
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <div className="row">
      {tasks.map(task => (
        <div className="col-md-4 mb-4" key={task.id}>
          <TaskItem
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
