
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragIcon from "../assets/images/dragdrop.svg";
import SelectIcon from "../assets/images/selectAll.svg";
import TrashIcon from "../assets/images/trash.svg";

const ItemTypes = {
    VIDEO: "video",
};

const CourseContent = () => {

    const canEdit = true;

    const [modules, setModules] = useState([
        {
            title: "WordPress Basic & Domain Hosting explained",
            videos: [
                { title: "How to install WordPress (domain-hosting explained)", duration: "29:30" },
                { title: "How to install WordPress (domain-hosting explained)", duration: "29:30" },
            ],
        },
        {
            title: "Web Designing basic to advance ( learn from scratch )",
            videos: [
                { title: "How to install WordPress (domain-hosting explained)", duration: "29:30" },
                { title: "How to install WordPress (domain-hosting explained)", duration: "29:30" },
            ],
        },
    ]);

    const [openModuleIndex, setOpenModuleIndex] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [editedTitle, setEditedTitle] = useState("");

    const handleEditToggle = () => {
        setEditMode(!editMode);
        setSelectedVideos([]);
    };

    const handleVideoSelect = (moduleIndex, videoIndex) => {
        const key = `${moduleIndex}-${videoIndex}`;
        if (selectedVideos.includes(key)) {
            setSelectedVideos(selectedVideos.filter((id) => id !== key));
        } else {
            setSelectedVideos([...selectedVideos, key]);
        }
    };

    const handleSelectAll = (moduleIndex) => {
        const videoKeys = modules[moduleIndex].videos.map(
            (_, videoIndex) => `${moduleIndex}-${videoIndex}`
        );
        if (videoKeys.every((key) => selectedVideos.includes(key))) {
            setSelectedVideos(
                selectedVideos.filter((key) => !videoKeys.includes(key))
            );
        } else {
            setSelectedVideos([...selectedVideos, ...videoKeys]);
        }
    };

    const handleDeleteSelected = (moduleIndex) => {
        const newModules = [...modules];
        newModules[moduleIndex].videos = newModules[moduleIndex].videos.filter(
            (_, videoIndex) =>
                !selectedVideos.includes(`${moduleIndex}-${videoIndex}`)
        );
        setModules(newModules);
        setSelectedVideos([]);
        setEditMode(false);
    };

    const handleModuleToggle = (moduleIndex) => {
        if (openModuleIndex === moduleIndex) {
            setEditMode(false);
            setOpenModuleIndex(null);
        } else {
            setOpenModuleIndex(moduleIndex);
            setEditMode(false);
        }
    };

    const handleAddVideo = (moduleIndex, selectedVideos) => {
        const newModules = [...modules];
        selectedVideos.forEach((video) => {
            newModules[moduleIndex].videos.push({
                title: video.name,
                duration: video.duration,
            });
        });
        setModules(newModules);
    };

    const handleAddModule = () => {
        setModules([...modules, { title: "Course Module title", videos: [] }]);
    };

    const handleVideoMove = (source, destination) => {
        if (!destination) return;

        const sourceModule = modules[source.moduleIndex];
        const [movedVideo] = sourceModule.videos.splice(source.index, 1);
        modules[destination.moduleIndex].videos.splice(destination.index, 0, movedVideo);

        setModules([...modules]);
        setOpenModuleIndex(destination.moduleIndex); // Open the destination module
    };

    const VideoItem = ({ video, moduleIndex, index }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: ItemTypes.VIDEO,
            item: { moduleIndex, index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }));

        return (
            <li
                ref={drag}
                className={`flex justify-between items-center py-2 ${isDragging ? "opacity-50" : ""}`}
            >
                <div className="flex items-center gap-4">
                    {editMode && <img src={DragIcon} alt="drag" />}
                    {editMode && (
                        <input
                            type="checkbox"
                            checked={selectedVideos.includes(`${moduleIndex}-${index}`)}
                            onChange={() => handleVideoSelect(moduleIndex, index)}
                        />
                    )}
                    <span className="text-[#1D1D1D] text-[16px] font-normal leading-7">
                        {video.title}
                    </span>
                </div>
                <span className="text-[#1D1D1D] text-[14px] font-normal leading-7">
                    {video.duration}
                </span>
            </li>
        );
    };

    const Module = ({ module, moduleIndex }) => {
        const [, drop] = useDrop({
            accept: ItemTypes.VIDEO,
            drop: (item) => {
                handleVideoMove(item, { moduleIndex, index: 0 });
            },
        });

        return (
            <div ref={drop} className="module">
                <div className="border border-gray-300 rounded-[6px] overflow-hidden">
                    <div className={`flex justify-between items-center w-full ${openModuleIndex === moduleIndex ? "bg-[#F5F4F6]" : ""} py-4 px-5`}>
                        <button
                            onClick={() => handleModuleToggle(moduleIndex)}
                            className="w-full text-left text-[#1D1D1D] font-medium text-[20px]"
                        >
                            {module.title}
                        </button>
                        {canEdit && openModuleIndex === moduleIndex && module.videos.length > 0 && (
                            <button
                                onClick={handleEditToggle}
                                className="text-[rgba(29,29,29,0.50)] font-normal text-[14px] cursor-pointer ml-4"
                            >
                                {editMode ? "Cancel" : "Edit"}
                            </button>
                        )}
                    </div>
                    {openModuleIndex === moduleIndex && (
                        <div className="px-6 bg-white text-gray-700 transition-all duration-500 ease-in-out">
                            {canEdit && editMode && module.videos.length > 0 && (
                                <div className="flex justify-between items-center py-2">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={modules[moduleIndex].videos.every(
                                                (_, videoIndex) => selectedVideos.includes(`${moduleIndex}-${videoIndex}`)
                                            )}
                                            onChange={() => handleSelectAll(moduleIndex)}
                                        />
                                        <span className="text-[#1D1D1D] text-[13px] font-medium leading-5">
                                            {selectedVideos.length} Selected
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-[14px]">
                                        <button onClick={() => handleSelectAll(moduleIndex)}>
                                            <img src={SelectIcon} alt="" />
                                        </button>
                                        <button onClick={() => handleDeleteSelected(moduleIndex)}>
                                            <img src={TrashIcon} alt="" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            <ul>
                                {module.videos.map((video, videoIndex) => (
                                    <VideoItem
                                        key={`video-${moduleIndex}-${videoIndex}`}
                                        video={video}
                                        moduleIndex={moduleIndex}
                                        index={videoIndex}
                                    />
                                ))}
                            </ul>
                        </div>
                    )}

                </div>

            </div>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-6 flex flex-col gap-4">
                <h1 className="text-xl font-bold">Course Content</h1>
                {modules.map((module, moduleIndex) => (
                    <Module
                        key={`module-${moduleIndex}`}
                        module={module}
                        moduleIndex={moduleIndex}
                    />
                ))}
                {canEdit && (
                    <button
                        onClick={handleAddModule}
                        className="text-[rgba(0,91,211,1)] w-fit font-medium text-[16px] leading-6"
                    >
                        + Add Module
                    </button>
                )}
            </div>
        </DndProvider>
    );
};

export default CourseContent;