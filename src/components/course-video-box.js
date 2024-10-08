import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import shopifyImage from '../../assets/shopify.png';
import uploadIcon from '../../assets/upload.svg';
import PropTypes from 'prop-types';

const assets = [
    {
        type: "video",
        name: "Introduction to React",
        size: null,
        duration: "30 mins",
        src: shopifyImage,
        icon: uploadIcon,
    },
    {
        type: "video",
        name: "CSS Flexbox Tutorial",
        size: null,
        duration: "45 mins",
        src: shopifyImage,
        icon: uploadIcon,
    },
    {
        type: "screen-recording",
        name: "How to use Redux",
        size: null,
        duration: "20 mins",
        src: shopifyImage,
        icon: uploadIcon,
    },
    {
        type: "video",
        name: "Introduction to React",
        size: null,
        duration: "30 mins",
        src: shopifyImage,
        icon: uploadIcon,
    },
    {
        type: "video",
        name: "CSS Flexbox Tutorial",
        size: null,
        duration: "45 mins",
        src: shopifyImage,
        icon: uploadIcon,
    },
    {
        type: "screen-recording",
        name: "How to use Redux",
        size: null,
        duration: "20 mins",
        src: shopifyImage,
        icon: uploadIcon,
    },
];

function CoursesVideoModel({ onAddVideos }) {
    const [selectedAssets, setSelectedAssets] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectAsset = (index) => {
        setSelectedAssets((prevSelectedAssets) => {
            if (prevSelectedAssets.includes(index)) {
                return prevSelectedAssets.filter((i) => i !== index);
            } else {
                return [...prevSelectedAssets, index];
            }
        });
    };

    const handleAddAssets = () => {
        const selectedVideos = selectedAssets.map(i => assets[i]);
        onAddVideos(selectedVideos); // Pass selected videos to parent component
        setIsOpen(false); // Close modal
    };

    const handleCancel = () => {
        setIsOpen(false); // Close modal
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button onClick={() => setIsOpen(true)} className='text-[rgba(0,91,211,1)] w-fit font-medium text-[16px] leading-6'>
                    + Add course video
                </button>
            </DialogTrigger>

            <DialogContent className="w-[80%] max-w-[914px] h-[95vh] flex flex-col gap-6">
                <div className="flex flex-col gap-[10px]">
                    <div className="text-[#1d1d1d] text-[24px] font-semibold leading-normal">
                        Select Course Video
                    </div>
                    <div className="text-[#1d1d1d] text-[16px] font-normal leading-normal">
                        Select course videos for Responsive web design
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-5 py-4 w-full h-full overflow-y-auto bg-[#ECEFF7] p-5">
                    {assets.map((asset, index) => (
                        <button
                            key={index}
                            className={`relative hover:ring-2 hover:ring-[#00AFF0] py-[18px] col-span-1 bg-white rounded-[15px] p-3 flex flex-col cursor-pointer transition duration-300 ease-in-out transform`}
                            onClick={() => handleSelectAsset(index)} // Handle card click for selection
                        >
                            {/* Check if any asset is selected, by checking the length of the selectedAssets array */}
                            {selectedAssets.length > 0 && (
                                <input
                                    type="checkbox"
                                    className="absolute top-4 left-[10px]"
                                    checked={selectedAssets.includes(index)}
                                    onChange={() => handleSelectAsset(index)}
                                />
                            )}
                            <img src={asset.src} alt={asset.name} className="rounded-md w-full object-cover" />
                            <p className="text-[16px] mt-3 text-[#1d1d1d] font-semibold">
                                {asset.name}
                            </p>
                            <div className="flex justify-between w-full">
                                <img src={asset.icon} alt="" />
                                <div className="text-[#55565B] font-medium text-[12px]">{asset.duration}</div>
                            </div>
                        </button>
                    ))}
                    {assets.length === 0 && <p>No course videos available</p>}

                </div>
                <div className="flex justify-end gap-[10px]">
                    <button
                        onClick={handleAddAssets}
                        className="py-[6px] px-4 text-white bg-[#00AFF0] rounded-[8px]"
                    >
                        Add
                    </button>
                    <button
                        onClick={handleCancel}
                        className="py-[6px] px-4 text-[#1d1d1d] bg-[#ECEFF7] rounded-[8px]"
                    >
                        Cancel
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CoursesVideoModel;

CoursesVideoModel.propTypes = {
    onAddVideos: PropTypes.func.isRequired,
};
