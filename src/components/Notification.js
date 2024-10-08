import React from "react";
import CrossIcon from '../assets/images/cross.svg'

const notifications = [
    {
        id: 1,
        title: "Action update inventory",
        message: "Course sync is successfully completed",
        timestamp: "May 18, 2024 at 11:20:56 PM",
    },
    {
        id: 2,
        title: "Action update inventory",
        message: "Course sync is successfully completed",
        timestamp: "May 18, 2024 at 11:20:56 PM",
    },
    {
        id: 3,
        title: "Action update inventory",
        message: "Course sync is successfully completed",
        timestamp: "May 18, 2024 at 11:20:56 PM",
    },
    {
        id: 4,
        title: "Action update inventory",
        message: "Course sync is successfully completed",
        timestamp: "May 18, 2024 at 11:20:56 PM",
    },
];



const Notification = () => {
    return (
        <main className="shadow p-6 max-w-[950px] bg-white rounded-[16px] mx-auto mt-6 space-y-4">
            {notifications?.map((item, index) => <section key={index}
                className="flex items-start "
            >
                <section className="flex-1">
                    <h1 className="font-semibold text-[15px]">{item?.title}</h1>
                    <p className=" text-[15px] text-[#55565B]">{item?.message}</p>
                    <p className=" text-sm text-[#55565B] mt-4">{item?.timestamp}</p>
                </section>
                <img src={CrossIcon} />

            </section>)}

        </main>
    );
};

export default Notification;
