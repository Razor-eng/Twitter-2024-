import Header from "../components/Header"
import NotificationsFeed from "../components/NotificationsFeed"

const Notification = () => {
    return (
        <>
            <Header label="Notifications" isExplore />
            <NotificationsFeed />
        </>
    )
}

export default Notification