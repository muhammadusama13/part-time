import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableTaskItem = ({ children, id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // Slightly reduce opacity when dragging
    cursor: isDragging ? 'grabbing' : 'grab', // Change cursor style
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-2 bg-white rounded shadow">
      {children}
    </div>
  );
};

export default SortableTaskItem;
