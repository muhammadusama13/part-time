import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded">
      {task.title}
    </div>
  );
};

export default TaskItem;
