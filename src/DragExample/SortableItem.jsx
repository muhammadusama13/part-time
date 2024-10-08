import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ id }) => {
    const { setNodeRef, listeners, transform, transition } = useSortable({ id });

    const styles = {
        transform: CSS.Transform.toString(transform),
        transition,
        border: "1px solid red",
        marginTop: "10px"
    };

    return (
        <div ref={setNodeRef} {...listeners} style={styles}>
            {id}
        </div>
    );
};