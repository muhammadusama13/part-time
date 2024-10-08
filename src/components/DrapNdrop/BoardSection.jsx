import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskItem from './TaskItem';
import SortableTaskItem from './SortableTaskItem';

const BoardSection = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="bg-gray-200 p-4 rounded">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef}>
          {tasks.map((task) => (
            <div key={task.id} className="mb-4">
              <SortableTaskItem id={task.id}>
                <TaskItem task={task} />
              </SortableTaskItem>
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default BoardSection;
