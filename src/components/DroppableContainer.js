import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function DroppableContainer({ id, title, children }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            style={{
                backgroundColor: "#f0f0f0",
                padding: "10px",
                borderRadius: "8px",
                width: "300px",
                minHeight: "400px",
                border: "1px solid #ccc",
            }}
        >
            <h3>{title}</h3>
            {children}
        </div>
    );
}
