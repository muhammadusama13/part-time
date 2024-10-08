import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';

// Sortable Video Item Component
const SortableVideo = ({ video, id }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '8px',
        margin: '0 0 8px 0',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div>
                <input type="checkbox" style={{ marginRight: '10px' }} />
                <span>{video.title}</span>
            </div>
            <span>{video.duration}</span>
        </div>
    );
};

// Sortable Section Component
const SortableSection = ({ section, sectionIndex }) => {
    return (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
            <h3>{section.title}</h3>
            <SortableContext items={section.videos.map((_, videoIndex) => `section-${sectionIndex}-video-${videoIndex}`)}>
                {section.videos.map((video, videoIndex) => (
                    <SortableVideo key={`section-${sectionIndex}-video-${videoIndex}`} id={`section-${sectionIndex}-video-${videoIndex}`} video={video} />
                ))}
            </SortableContext>
        </div>
    );
};

// Main Component
const CourseContent = () => {
    const [sections, setSections] = useState([
        {
            title: 'WordPress Basic & Domain Hosting explained',
            videos: [
                { title: 'How to install WordPress (domain-hosting explained)', duration: '29:30' },
                { title: 'How to install WordPress (domain-hosting explained)', duration: '29:30' },
                { title: 'How to install WordPress (domain-hosting explained)', duration: '29:30' },
                { title: 'How to install WordPress (domain-hosting explained)', duration: '29:30' },
            ],
        },
        {
            title: 'Web Designing basic to advance ( learn from scratch )',
            videos: [
                { title: 'How to install WordPress (domain-hosting explained)', duration: '29:30' },
                { title: 'How to install WordPress (domain-hosting explained)', duration: '29:30' },
                { title: 'How to install WordPress (domain-hosting explained)', duration: '29:30' },
                { title: 'How to install WordPress (domain-hosting explained)', duration: '29:30' },
            ],
        },
    ]);



    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        // If there is no destination, do nothing
        if (!over) return;

        const activeIdParts = active.id.split('-');
        const overIdParts = over.id.split('-');

        if (activeIdParts[0] === 'section' && activeIdParts[2] === 'video') {
            // Moving a video between sections
            const [sourceSectionIndex, sourceVideoIndex] = [parseInt(activeIdParts[1]), parseInt(activeIdParts[3])];
            const [destinationSectionIndex] = [parseInt(overIdParts[1])];

            const newSections = [...sections];
            const [movedVideo] = newSections[sourceSectionIndex].videos.splice(sourceVideoIndex, 1);
            newSections[destinationSectionIndex].videos.push(movedVideo); // Add to the end of the destination section

            setSections(newSections);
        } else if (activeIdParts[0] === 'section' && overIdParts[0] === 'section') {
            // Moving entire sections (if needed, just for completeness)
            const oldIndex = parseInt(activeIdParts[1]);
            const newIndex = parseInt(overIdParts[1]);

            setSections((prevSections) => arrayMove(prevSections, oldIndex, newIndex));
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
            <h2>Course Content</h2>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                {sections.map((section, sectionIndex) => (
                    <SortableSection key={`section-${sectionIndex}`} section={section} sectionIndex={sectionIndex} />
                ))}
            </DndContext>
        </div>
    );
};

export default CourseContent;
