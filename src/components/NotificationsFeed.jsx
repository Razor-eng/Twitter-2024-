/* eslint-disable react/prop-types */
import { BsTwitter } from "react-icons/bs";

const NotificationsFeed = ({ fetchedNotifications = [] }) => {
    if (fetchedNotifications?.length === 0) {
        return (
            <div className="text-neutral-600 text-center p-6 text-xl">
                No notifications
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            {fetchedNotifications.map((notification, id) => (
                <div key={id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] dark:border-neutral-800">
                    <BsTwitter className="text-[#1DA1F2] dark:text-white" size={32} />
                    <p>
                        {notification.body}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default NotificationsFeed