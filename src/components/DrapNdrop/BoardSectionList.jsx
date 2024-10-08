import React, { useState } from 'react';
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragOverlay,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import { INITIAL_TASKS } from './data';
import { getTaskById } from './task';
import { findBoardSectionContainer, initializeBoard } from './board';
import BoardSection from './BoardSection';
import TaskItem from './TaskItem';

const BoardSectionList = () => {
  const tasks = INITIAL_TASKS;
  const initialBoardSections = initializeBoard(INITIAL_TASKS);
  const [boardSections, setBoardSections] = useState(initialBoardSections);
  const [activeTaskId, setActiveTaskId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }) => {
    setActiveTaskId(active.id);
  };

  const handleDragOver = ({ active, over }) => {
    const activeContainer = findBoardSectionContainer(boardSections, active.id);
    const overContainer = findBoardSectionContainer(boardSections, over?.id);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      const activeIndex = activeItems.findIndex((item) => item.id === active.id);
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: activeItems.filter((item) => item.id !== active.id),
        [overContainer]: [
          ...overItems.slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...overItems.slice(overIndex),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }) => {
    const activeContainer = findBoardSectionContainer(boardSections, active.id);
    const overContainer = findBoardSectionContainer(boardSections, over?.id);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(boardSection[overContainer], activeIndex, overIndex),
      }));
    }

    setActiveTaskId(null);
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;

  return (
    <div className="container mx-auto p-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col gap-10">
          {Object.keys(boardSections).map((boardSectionKey) => (
            <div key={boardSectionKey} className="p-4">
              <BoardSection
                id={boardSectionKey}
                title={boardSectionKey}
                tasks={boardSections[boardSectionKey]}
              />
            </div>
          ))}
          <DragOverlay>
            {task ? <TaskItem task={task} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};

export default BoardSectionList;
