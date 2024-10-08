import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { SortableItem } from "./SortableItem"; // Same as previous
import { DroppableContainer } from "./DroppableContainer"; // Container for columns

const initialColumns = [
    {
        id: 'column-1',
        title: 'To Do',
        cards: [
            { id: 'card-1', content: 'Write blog post' },
            { id: 'card-2', content: 'Prepare slides' },
        ],
    },
    {
        id: 'column-2',
        title: 'In Progress',
        cards: [
            { id: 'card-3', content: 'Develop landing page' },
            { id: 'card-4', content: 'Fix bugs in app' },
        ],
    },
    {
        id: 'column-3',
        title: 'Done',
        cards: [
            { id: 'card-5', content: 'Submit project report' },
            { id: 'card-6', content: 'Release new version' },
        ],
    },
];

function TrelloClone() {
    const [columns, setColumns] = useState(initialColumns);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return; // No destination to drop to

        const activeColumnId = findColumnByCardId(active.id);
        const overColumnId = findColumnByCardId(over.id);

        if (!activeColumnId || !overColumnId) return;

        if (activeColumnId === overColumnId) {
            // Reordering within the same column
            const columnIndex = columns.findIndex(column => column.id === activeColumnId);
            const updatedCards = arrayMove(
                columns[columnIndex].cards,
                columns[columnIndex].cards.findIndex(card => card.id === active.id),
                columns[columnIndex].cards.findIndex(card => card.id === over.id)
            );
            const updatedColumns = [...columns];
            updatedColumns[columnIndex].cards = updatedCards;
            setColumns(updatedColumns);
        } else {
            // Moving between different columns
            const activeColumnIndex = columns.findIndex(column => column.id === activeColumnId);
            const overColumnIndex = columns.findIndex(column => column.id === overColumnId);

            const activeCard = columns[activeColumnIndex].cards.find(card => card.id === active.id);
            const updatedActiveCards = columns[activeColumnIndex].cards.filter(card => card.id !== active.id);
            const updatedOverCards = [
                ...columns[overColumnIndex].cards,
                activeCard
            ];

            const updatedColumns = [...columns];
            updatedColumns[activeColumnIndex].cards = updatedActiveCards;
            updatedColumns[overColumnIndex].cards = updatedOverCards;

            setColumns(updatedColumns);
        }
    };

    const findColumnByCardId = (cardId) => {
        for (const column of columns) {
            if (column.cards.some(card => card.id === cardId)) {
                return column.id;
            }
        }
        return null;
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div style={{ display: "flex", gap: "16px" }}>
                {columns.map((column) => (
                    <DroppableContainer key={column.id} id={column.id} title={column.title}>
                        <SortableContext
                            items={column.cards.map(card => card.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {column.cards.map((card) => (
                                <SortableItem key={card.id} id={card.id} content={card.content} />
                            ))}
                        </SortableContext>
                    </DroppableContainer>
                ))}
            </div>
        </DndContext>
    );
}

export default TrelloClone;
