import { useState } from 'react';
import DragIcon from '../assets/images/dragdrop.svg'
import SelectIcon from '../assets/images/selectAll.svg'
import TrashIcon from '../assets/images/trash.svg'
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';

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


const CourseContent = () => {
    // const { user } = useSelector((state) => state.user);
    // const userRole = user?.publicMetadata?.privileges || 'student';
    // console.log(userRole)
    // const canEdit = userRole === 'admin' || userRole === 'teacher';
    const canEdit = true;
    const [modules, setModules] = useState([
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
    const [openModuleIndex, setOpenModuleIndex] = useState(0); // Default first module expanded
    const [editMode, setEditMode] = useState(false);
    const [selectedVideos, setSelectedVideos] = useState([]);

    // Toggle edit mode
    const handleEditToggle = () => {
        setEditMode(!editMode);
        setSelectedVideos([]); // Reset selected videos on entering edit mode
    };

    // Handle video selection
    const handleVideoSelect = (moduleIndex, videoIndex) => {
        const key = `${moduleIndex}-${videoIndex}`;
        if (selectedVideos.includes(key)) {
            setSelectedVideos(selectedVideos.filter((id) => id !== key));
        } else {
            setSelectedVideos([...selectedVideos, key]);
        }
    };

    // Handle select all videos in a module
    const handleSelectAll = (moduleIndex) => {
        const videoKeys = modules[moduleIndex].videos.map((_, videoIndex) => `${moduleIndex}-${videoIndex}`);
        if (videoKeys.every((key) => selectedVideos.includes(key))) {
            setSelectedVideos(selectedVideos.filter((key) => !videoKeys.includes(key)));
        } else {
            setSelectedVideos([...selectedVideos, ...videoKeys]);
        }
    };

    // Delete selected videos
    const handleDeleteSelected = (moduleIndex) => {
        const newModules = [...modules];
        newModules[moduleIndex].videos = newModules[moduleIndex].videos.filter(
            (_, videoIndex) => !selectedVideos.includes(`${moduleIndex}-${videoIndex}`)
        );
        setModules(newModules);
        setSelectedVideos([]);
        setEditMode(false); // Exit edit mode after deletion
    };

    // Handle expanding/collapsing module
    const handleModuleToggle = (moduleIndex) => {
        if (openModuleIndex === moduleIndex) {
            setEditMode(false); // Exit edit mode when collapsing
            setOpenModuleIndex(null); // Collapse module
        } else {
            setOpenModuleIndex(moduleIndex); // Expand selected module
            setEditMode(false); // Exit edit mode when switching modules
        }
    };

    const handleAddVideo = (moduleIndex, selectedVideos) => {
        const newModules = [...modules];
        selectedVideos.forEach(video => {
            newModules[moduleIndex].videos.push({
                title: video.name,
                duration: video.duration
            });
        });
        setModules(newModules);
    };

    const handleAddModule = () => {
        setModules([...modules, { title: 'New Module', videos: [] }]);
    };

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

            const newSections = [...modules];
            const [movedVideo] = newSections[sourceSectionIndex].videos.splice(sourceVideoIndex, 1);
            newSections[destinationSectionIndex].videos.push(movedVideo); // Add to the end of the destination section

            setModules(newSections);
        } else if (activeIdParts[0] === 'section' && overIdParts[0] === 'section') {
            // Moving entire sections (if needed, just for completeness)
            const oldIndex = parseInt(activeIdParts[1]);
            const newIndex = parseInt(overIdParts[1]);

            setModules((prevSections) => arrayMove(prevSections, oldIndex, newIndex));
        }
    };

    return (
        <div className="p-6 flex flex-col gap-4">
            <h1 className="text-xl font-bold">Course Content</h1>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                {modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className='flex flex-col gap-4'>
                        <div className="border border-gray-300 rounded-[6px] overflow-hidden">
                            <div className={`flex justify-between items-center w-full ${openModuleIndex === moduleIndex ? 'bg-[#F5F4F6]' : ''}  py-4 px-5`}>
                                <button
                                    onClick={() => handleModuleToggle(moduleIndex)}
                                    className="w-full text-left text-[#1D1D1D] font-medium text-[20px]"
                                >
                                    {module.title}
                                </button>

                                {canEdit && openModuleIndex === moduleIndex && module.videos.length > 0 && (
                                    <button onClick={handleEditToggle} className="text-[rgba(29,29,29,0.50)] font-normal text-[14px] cursor-pointer ml-4">
                                        {editMode ? 'Cancel' : 'Edit'}
                                    </button>
                                )}
                            </div>

                            {/* Module Content */}
                            {openModuleIndex === moduleIndex && (
                                <>


                                    <div className=" px-6  bg-white text-gray-700 transition-all duration-500 ease-in-out">
                                        {canEdit && editMode && module.videos.length > 0 && (
                                            <div className="flex justify-between items-center py-2">
                                                <div className='flex items-center gap-3'>
                                                    <input
                                                        type="checkbox"
                                                        className=""
                                                        checked={modules[moduleIndex].videos.every((_, videoIndex) =>
                                                            selectedVideos.includes(`${moduleIndex}-${videoIndex}`)
                                                        )}
                                                        onChange={() => handleSelectAll(moduleIndex)}
                                                    />
                                                    <span className="text-[#1D1D1D] text-[13px] font-medium leading-5">{selectedVideos.length} Selected</span>
                                                </div>
                                                <div className="flex items-center gap-[14px]">
                                                    <button
                                                        onClick={() => handleSelectAll(moduleIndex)}
                                                        className=""
                                                    >
                                                        <img src={SelectIcon} alt='' />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSelected(moduleIndex)}
                                                        className=""
                                                    >
                                                        <img src={TrashIcon} alt='' />
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Videos List */}
                                        {/* <SortableContext items={module?.videos.map((_, videoIndex) => `section-${moduleIndex}-video-${videoIndex}`)}>

                                        </SortableContext> */}
                                        <ul className="">
                                            {module.videos.length > 0 ? module.videos.map((video, videoIndex) => (

                                                <SortableContext items={module.videos.map((_, videoIndex) => `section-${sectionIndex}-video-${videoIndex}`)}>
                                                    <SortableVideo
                                                        handleVideoSelect={() => handleVideoSelect(moduleIndex, videoIndex)}
                                                        selectedVideos={selectedVideos}
                                                        videoIndex={videoIndex}
                                                        moduleIndex={moduleIndex}
                                                        editMode={editMode}
                                                        key={`section-${moduleIndex}-video-${videoIndex}`}
                                                        id={`section-${moduleIndex}-video-${videoIndex}`}
                                                        video={video} />

                                                </SortableContext>


                                            )) :
                                                <li className="flex justify-between items-center py-2">
                                                    No course videos available
                                                </li>
                                            }
                                        </ul>


                                    </div>

                                </>
                            )}

                        </div>

                        {canEdit && openModuleIndex === moduleIndex && !editMode && (
                            <button className='text-[rgba(0,91,211,1)] w-fit font-medium text-[16px] leading-6'>
                                + Add course video
                            </button>

                        )}
                        {/* <CoursesVideoModel onAddVideos={(selectedVideos) => handleAddVideo(moduleIndex, selectedVideos)} /> */}
                    </div>
                ))}
            </DndContext>

            {/* Button to add a new module */}
            {canEdit && <button
                onClick={handleAddModule}
                className="text-[rgba(0,91,211,1)] w-fit font-medium text-[16px] leading-6"
            >
                + Add Module
            </button>
            }

        </div>
    );
};

export default CourseContent;
