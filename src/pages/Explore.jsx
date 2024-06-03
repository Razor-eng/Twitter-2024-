import Header from "../components/Header"
import PostFeed from "../components/posts/PostFeed"

const Explore = () => {
    return (
        <>
            <Header label="Explore" isExplore />
            <PostFeed />
        </>
    )
}

export default Explore