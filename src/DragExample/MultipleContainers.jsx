import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/utilities";
import React, { useState } from "react";

export default function MultipleContainers() {
    const [items, setItems] = useState({
        A: ["A1", "A2", "A3", "A4"],
        B: ["B1", "B2", "B3"]
    });

    function findContainer(id) {
        if (id in items) {
            return id;
        }
        return Object.keys(items).find(key => items[key].includes(id));
    }

    function dragEndFn(e) {
        const { active, over } = e;
        const activeId = active?.id;
        const overId = over?.id;

        const activeContainer = findContainer(activeId);
        const overContainer = findContainer(overId);

        // Check if both containers are valid and different
        if (!activeContainer || !overContainer || activeContainer === overContainer) return;

        const activeItems = items[activeContainer];
        const overItems = items[overContainer];

        // Remove the item from the active container
        const newActiveItems = activeItems.filter(item => item !== activeId);

        // Handle empty drop
        const newOverItems = overId
            ? [
                ...overItems.slice(0, overItems.indexOf(overId)),
                activeId,
                ...overItems.slice(overItems.indexOf(overId))
            ]
            : [...overItems, activeId]; // If overId is undefined, append to the end

        setItems(prevItems => ({
            ...prevItems,
            [activeContainer]: newActiveItems,
            [overContainer]: newOverItems
        }));
    }

    return (
        <div>
            <h2>Multiple Draggable Lists</h2>
            <DndContext onDragEnd={dragEndFn}>
                <div style={{ display: "flex" }}>
                    {Object.keys(items).map(containerId => (
                        <div
                            key={containerId}
                            style={{
                                border: "1px solid blue",
                                width: "300px",
                                padding: "12px",
                                minHeight: "100px" // Ensure visibility for empty sections
                            }}
                        >
                            <SortableContext items={items[containerId]}>
                                {items[containerId].map(itemId => (
                                    <SortableItem key={itemId} id={itemId} />
                                ))}
                            </SortableContext>
                        </div>
                    ))}
                </div>
            </DndContext>
        </div>
    );
}

const SortableItem = ({ id }) => {
    const { setNodeRef, listeners, transform, transition } = useSortable({ id });

    const styles = {
        transform: CSS.Transform?.toString(transform),
        transition,
        border: "1px solid red",
        marginTop: "10px",
        padding: "8px"
    };

    return (
        <div ref={setNodeRef} {...listeners} style={styles}>
            {id}
        </div>
    );
};
