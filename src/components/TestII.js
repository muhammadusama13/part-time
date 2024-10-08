// import { useState } from "react";
// import { v4 as uuidv4 } from 'uuid';
// import DragIcon from "../assets/images/dragdrop.svg";
// import SelectIcon from "../assets/images/selectAll.svg";
// import TrashIcon from "../assets/images/trash.svg";

// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// const CourseContent = () => {
//     // const { user } = useSelector((state) => state.user);
//     // const userRole = user?.publicMetadata?.privileges || "student";

//     // console.log(userRole);
//     const canEdit = true
//     const [modules, setModules] = useState([
//         {
//             title: "WordPress Basic & Domain Hosting explained",
//             videos: [
//                 {
//                     id: uuidv4(),
//                     title: "Ho to install WordPress (domain-hosting explained)",
//                     duration: "29:30",
//                 },
//                 {
//                     id: uuidv4(),
//                     title: "How to install WordPress (domain-hosting explained)",
//                     duration: "29:30",
//                 },
//                 {
//                     id: uuidv4(),
//                     title: "How to install WordPress (domain-hosting explained)",
//                     duration: "29:30",
//                 },
//                 {
//                     id: uuidv4(),
//                     title: "How to install WordPress (domain-hosting explained)",
//                     duration: "29:30",
//                 },
//             ],
//         },
//         {
//             title: "Web Designing basic to advance ( learn from scratch )",
//             videos: [

//                 {
//                     id: uuidv4(),
//                     title: "How to install WordPress (domain-hosting explained)",
//                     duration: "29:30",
//                 },
//                 {
//                     id: uuidv4(),
//                     title: "ow to install WordPress (domain-hosting explained)",
//                     duration: "29:30",
//                 },
//                 {
//                     id: uuidv4(),
//                     title: "How to install WordPress (domain-hosting explained)",
//                     duration: "29:30",
//                 },
//                 {
//                     id: uuidv4(),
//                     title: "How to install WordPress (domain-hosting explained)",
//                     duration: "29:30",
//                 },
//             ],
//         },
//         {
//             title: "Web Designing basic to advance ( learn from scratch )",
//             videos: [
//                 {
//                     id: uuidv4(),
//                     title: "How to install WordPress (domain-hosting explained)",
//                     duration: "29:30",
//                 },
//                 {
//                     id: uuidv4(),
//                     title: "How to install WordPress (domain-hosting explained)",
//                     duration: "29:30",
//                 },
//                 {
//                     id: uuidv4(),
//                     title: "How to install WordPress (domain-hosting explained)",
//                     duration: "29:30",
//                 },
//                 {
//                     id: uuidv4(),
//                     title: "How to install WordPress (domain-hosting explained)",
//                     duration: "29:30",
//                 },
//             ],
//         },
//     ]);
//     const [openModuleIndex, setOpenModuleIndex] = useState(0);
//     const [editMode, setEditMode] = useState(false);
//     const [selectedVideos, setSelectedVideos] = useState([]);

//     const handleEditToggle = () => {
//         setEditMode(!editMode);
//         setSelectedVideos([]);
//     };

//     const handleVideoSelect = (moduleIndex, videoIndex) => {
//         const key = `${moduleIndex}-${videoIndex}`;
//         if (selectedVideos.includes(key)) {
//             setSelectedVideos(selectedVideos.filter((id) => id !== key));
//         } else {
//             setSelectedVideos([...selectedVideos, key]);
//         }
//     };

//     const handleSelectAll = (moduleIndex) => {
//         const videoKeys = modules[moduleIndex].videos.map(
//             (_, videoIndex) => `${moduleIndex}-${videoIndex}`
//         );
//         if (videoKeys.every((key) => selectedVideos.includes(key))) {
//             setSelectedVideos(
//                 selectedVideos.filter((key) => !videoKeys.includes(key))
//             );
//         } else {
//             setSelectedVideos([...selectedVideos, ...videoKeys]);
//         }
//     };

//     const handleDeleteSelected = (moduleIndex) => {
//         const newModules = [...modules];
//         newModules[moduleIndex].videos = newModules[moduleIndex].videos.filter(
//             (_, videoIndex) =>
//                 !selectedVideos.includes(`${moduleIndex}-${videoIndex}`)
//         );
//         setModules(newModules);
//         setSelectedVideos([]);
//         setEditMode(false);
//     };

//     const handleModuleToggle = (moduleIndex) => {
//         if (openModuleIndex === moduleIndex) {
//             setEditMode(false);
//             setOpenModuleIndex(null);
//         } else {
//             setOpenModuleIndex(moduleIndex);
//             setEditMode(false);
//         }
//     };

//     const handleAddVideo = (moduleIndex, selectedVideos) => {
//         const newModules = [...modules];
//         selectedVideos.forEach((video) => {
//             newModules[moduleIndex].videos.push({
//                 title: video.name,
//                 duration: video.duration,
//             });
//         });
//         setModules(newModules);
//     };

//     const handleAddModule = () => {
//         setModules([...modules, { title: "New Module", videos: [] }]);
//     };
//     const onDragEnd = (result) => {
//         const { source, destination } = result;

//         if (!destination) return;

//         const sourceModuleIndex = parseInt(source.droppableId.split("-")[1]);
//         const destinationModuleIndex = parseInt(
//             destination.droppableId.split("-")[1]
//         );

//         if (sourceModuleIndex === destinationModuleIndex) {
//             const updatedVideos = [...modules[sourceModuleIndex].videos];
//             const [movedVideo] = updatedVideos.splice(source.index, 1);
//             updatedVideos.splice(destination.index, 0, movedVideo);

//             const newModules = [...modules];
//             newModules[sourceModuleIndex].videos = updatedVideos;
//             setModules(newModules);
//         } else {
//             const sourceVideos = [...modules[sourceModuleIndex].videos];
//             const destinationVideos = [...modules[destinationModuleIndex].videos];

//             const [movedVideo] = sourceVideos.splice(source.index, 1);
//             destinationVideos.splice(destination.index, 0, movedVideo);

//             const newModules = [...modules];
//             newModules[sourceModuleIndex].videos = sourceVideos;
//             newModules[destinationModuleIndex].videos = destinationVideos;
//             setModules(newModules);

//             setOpenModuleIndex(destinationModuleIndex); // Open the destination module
//         }
//     };

//     console.log(modules);
//     return (
//         <div className="p-6 flex flex-col gap-4">
//             <h1 className="text-xl font-bold">Course Content</h1>
//             <DragDropContext onDragEnd={onDragEnd}>
//                 {modules.map((module, moduleIndex) => (
//                     <Droppable droppableId={`module-${moduleIndex}`} key={moduleIndex}>
//                         {(provided) => (
//                             <div
//                                 ref={provided.innerRef}
//                                 {...provided.droppableProps}
//                                 className="flex flex-col gap-4"
//                             >
//                                 <div className="border border-gray-300 rounded-[6px] overflow-hidden">
//                                     <div
//                                         className={`flex justify-between items-center w-full ${openModuleIndex === moduleIndex ? "bg-[#F5F4F6]" : ""
//                                             }  py-4 px-5`}
//                                     >
//                                         <button
//                                             onClick={() => handleModuleToggle(moduleIndex)}
//                                             className="w-full text-left text-[#1D1D1D] font-medium text-[20px]"
//                                         >
//                                             {module.title}
//                                         </button>

//                                         {canEdit &&
//                                             openModuleIndex === moduleIndex &&
//                                             module.videos.length > 0 && (
//                                                 <button
//                                                     onClick={handleEditToggle}
//                                                     className="text-[rgba(29,29,29,0.50)] font-normal text-[14px] cursor-pointer ml-4"
//                                                 >
//                                                     {editMode ? "Cancel" : "Edit"}
//                                                 </button>
//                                             )}
//                                     </div>

//                                     {openModuleIndex === moduleIndex && (
//                                         <div className=" px-6 bg-white text-gray-700 transition-all duration-500 ease-in-out">
//                                             {canEdit && editMode && module.videos.length > 0 && (
//                                                 <div className="flex justify-between items-center py-2">
//                                                     <div className="flex items-center gap-3">
//                                                         <input
//                                                             type="checkbox"
//                                                             checked={modules[moduleIndex].videos.every(
//                                                                 (_, videoIndex) =>
//                                                                     selectedVideos.includes(
//                                                                         `${moduleIndex}-${videoIndex}`
//                                                                     )
//                                                             )}
//                                                             onChange={() => handleSelectAll(moduleIndex)}
//                                                         />
//                                                         <span className="text-[#1D1D1D] text-[13px] font-medium leading-5">
//                                                             {selectedVideos.length} Selected
//                                                         </span>
//                                                     </div>
//                                                     <div className="flex items-center gap-[14px]">
//                                                         <button
//                                                             onClick={() => handleSelectAll(moduleIndex)}
//                                                         >
//                                                             <img src={SelectIcon} alt="" />
//                                                         </button>
//                                                         <button
//                                                             onClick={() => handleDeleteSelected(moduleIndex)}
//                                                         >
//                                                             <img src={TrashIcon} alt="" />
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             )}

//                                             <ul>
//                                                 {module.videos.length > 0 ? (
//                                                     module.videos.map((video, videoIndex) => (
//                                                         <Draggable
//                                                             key={videoIndex}
//                                                             draggableId={`video-${moduleIndex}-${videoIndex}`}
//                                                             index={videoIndex}
//                                                             isDragDisabled={!editMode}
//                                                         >
//                                                             {(provided) => (
//                                                                 <li
//                                                                     ref={provided.innerRef}
//                                                                     {...provided.draggableProps}
//                                                                     className="flex justify-between items-center py-2"
//                                                                 >
//                                                                     <div className="flex items-center gap-4">
//                                                                         {editMode && (
//                                                                             <img
//                                                                                 src={DragIcon}
//                                                                                 {...provided.dragHandleProps}
//                                                                                 alt="drag"
//                                                                             />
//                                                                         )}
//                                                                         {editMode && (
//                                                                             <input
//                                                                                 type="checkbox"
//                                                                                 className="mr-2"
//                                                                                 checked={selectedVideos.includes(
//                                                                                     `${moduleIndex}-${videoIndex}`
//                                                                                 )}
//                                                                                 onChange={() =>
//                                                                                     handleVideoSelect(
//                                                                                         moduleIndex,
//                                                                                         videoIndex
//                                                                                     )
//                                                                                 }
//                                                                             />
//                                                                         )}
//                                                                         <span className="text-[#1D1D1D] text-[16px] font-normal leading-7 ">
//                                                                             {video.title}
//                                                                         </span>
//                                                                     </div>
//                                                                     <span className="text-[#1D1D1D] text-[14px] font-normal leading-7">
//                                                                         {video.duration}
//                                                                     </span>
//                                                                 </li>
//                                                             )}
//                                                         </Draggable>
//                                                     ))
//                                                 ) : (
//                                                     <li className="flex justify-between items-center py-2">
//                                                         No course videos available
//                                                     </li>
//                                                 )}
//                                                 {provided.placeholder}
//                                             </ul>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </Droppable>
//                 ))}
//             </DragDropContext>
//             {/* Button to add a new module */}
//             {canEdit && (
//                 <button
//                     onClick={handleAddModule}
//                     className="text-[rgba(0,91,211,1)] w-fit font-medium text-[16px] leading-6"
//                 >
//                     + Add Module
//                 </button>
//             )}
//         </div>
//     );
// };

// export default CourseContent;





import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import DragIcon from "../assets/images/dragdrop.svg";
import SelectIcon from "../assets/images/selectAll.svg";
import TrashIcon from "../assets/images/trash.svg";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CourseContent = () => {
    const canEdit = true;
    const [modules, setModules] = useState([
        {
            title: "WordPress Basic & Domain Hosting explained",
            videos: [
                { id: uuidv4(), title: "How to install WordPress (domain-hosting explained)", duration: "29:30" },
                { id: uuidv4(), title: "How to install WordPress (domain-hosting explained)", duration: "29:30" },
                { id: uuidv4(), title: "How to install WordPress (domain-hosting explained)", duration: "29:30" },
                { id: uuidv4(), title: "How to install WordPress (domain-hosting explained)", duration: "29:30" },
            ],
        },
        {
            title: "Web Designing basic to advance ( learn from scratch )",
            videos: [
                {
                    id: uuidv4(),
                    title: "How to install WordPress (domain-hosting explained)",
                    duration: "29:30",
                },
                {
                    id: uuidv4(),
                    title: "How to install WordPress (domain-hosting explained)",
                    duration: "29:30",
                },
                {
                    id: uuidv4(),
                    title: "How to install WordPress (domain-hosting explained)",
                    duration: "29:30",
                },
                {
                    id: uuidv4(),
                    title: "How to install WordPress (domain-hosting explained)",
                    duration: "29:30",
                },
            ],
        },
    ]);

    const [openModuleIndex, setOpenModuleIndex] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [selectedVideos, setSelectedVideos] = useState([]);

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
        const videoKeys = modules[moduleIndex].videos.map((_, videoIndex) => `${moduleIndex}-${videoIndex}`);
        if (videoKeys.every((key) => selectedVideos.includes(key))) {
            setSelectedVideos(selectedVideos.filter((key) => !videoKeys.includes(key)));
        } else {
            setSelectedVideos([...selectedVideos, ...videoKeys]);
        }
    };

    const handleDeleteSelected = (moduleIndex) => {
        const newModules = [...modules];
        newModules[moduleIndex].videos = newModules[moduleIndex].videos.filter((_, videoIndex) =>
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
                id: uuidv4(),
                title: video.name,
                duration: video.duration,
            });
        });
        setModules(newModules);
    };

    const handleAddModule = () => {
        setModules([...modules, { title: "New Module", videos: [] }]);
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        const sourceModuleIndex = parseInt(source.droppableId.split("-")[1]);
        const destinationModuleIndex = parseInt(destination.droppableId.split("-")[1]);

        if (sourceModuleIndex === destinationModuleIndex) {
            const updatedVideos = [...modules[sourceModuleIndex].videos];
            const [movedVideo] = updatedVideos.splice(source.index, 1);
            updatedVideos.splice(destination.index, 0, movedVideo);

            const newModules = [...modules];
            newModules[sourceModuleIndex].videos = updatedVideos;
            setModules(newModules);
        } else {
            const sourceVideos = [...modules[sourceModuleIndex].videos];
            const destinationVideos = [...modules[destinationModuleIndex].videos];

            const [movedVideo] = sourceVideos.splice(source.index, 1);
            destinationVideos.splice(destination.index, 0, movedVideo);

            const newModules = [...modules];
            newModules[sourceModuleIndex].videos = sourceVideos;
            newModules[destinationModuleIndex].videos = destinationVideos;
            setModules(newModules);

            setOpenModuleIndex(destinationModuleIndex); // Open the destination module
        }
    };

    return (
        <div className="p-6 flex flex-col gap-4">
            <h1 className="text-xl font-bold">Course Content</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                {modules.map((module, moduleIndex) => (
                    <Droppable droppableId={`droppable-${moduleIndex}`} key={moduleIndex}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="flex flex-col gap-4"
                            >
                                <div className="border border-gray-300 rounded-[6px] overflow-hidden">
                                    <div
                                        className={`flex justify-between items-center w-full ${openModuleIndex === moduleIndex ? "bg-[#F5F4F6]" : ""} py-4 px-5`}
                                    >
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
                                                            <img src={SelectIcon} alt="Select All" />
                                                        </button>
                                                        <button onClick={() => handleDeleteSelected(moduleIndex)}>
                                                            <img src={TrashIcon} alt="Delete" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            <ul>
                                                {module.videos.length > 0 ? (
                                                    module.videos.map((video, videoIndex) => (

                                                        <Draggable
                                                            key={video.id} // Unique key for React list rendering
                                                            draggableId={video.id} // Unique ID for Draggable
                                                            index={videoIndex}
                                                            isDragDisabled={!editMode}
                                                        >
                                                            {(provided) => (
                                                                <li
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    className="flex justify-between items-center py-2"
                                                                >
                                                                    <div className="flex items-center gap-4">
                                                                        <p className="text-red-400">{video?.id}</p>
                                                                        {editMode && (
                                                                            <img
                                                                                src={DragIcon}
                                                                                {...provided.dragHandleProps}
                                                                                alt="drag"
                                                                            />
                                                                        )}
                                                                        {editMode && (
                                                                            <input
                                                                                type="checkbox"
                                                                                className="mr-2"
                                                                                checked={selectedVideos.includes(`${moduleIndex}-${videoIndex}`)}
                                                                                onChange={() => handleVideoSelect(moduleIndex, videoIndex)}
                                                                            />
                                                                        )}
                                                                        <span className="text-[#1D1D1D] text-[16px] font-normal leading-7 ">
                                                                            {video.title}
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-[#1D1D1D] text-[14px] font-normal leading-7">
                                                                        {video.duration}
                                                                    </span>
                                                                    {provided.placeholder}
                                                                </li>
                                                            )}
                                                        </Draggable>
                                                    ))
                                                ) : (
                                                    <li className="flex justify-between items-center py-2">
                                                        No course videos available
                                                    </li>
                                                )}
                                                {provided.placeholder}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
            {canEdit && (
                <button
                    onClick={handleAddModule}
                    className="text-[rgba(0,91,211,1)] w-fit font-medium text-[16px] leading-6"
                >
                    + Add Module
                </button>
            )}
        </div>
    );
};

export default CourseContent;
