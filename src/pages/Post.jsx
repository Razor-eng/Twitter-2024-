/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom"
import Form from "../components/Form"
import Header from "../components/Header"
import CommentFeed from "../components/posts/CommentFeed"
import PostItem from "../components/posts/PostItem"
import { useContext, useEffect, useState } from "react"
import { Context } from "../context/Context"
import LoadingModal from "../components/modal/LoadingModal"

const Post = () => {
    const { userLoading, fetchedPost, fetchedPostComments, setPostId } = useContext(Context);
    const location = useLocation();
    const [post, setPost] = useState(location.pathname.split('/').pop());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setPostId(post)
        setLoading(false);
    }, [location.pathname])

    if (userLoading || loading) {
        return <LoadingModal />
    }

    return (
        <>
            <Header showBackArrow label="Tweet" />
            <Form postId={location.pathname.split('/').pop()} isComment placeholder="Tweet your reply" />
            <PostItem data={fetchedPost} />
            <CommentFeed comments={fetchedPostComments} />
        </>
    )
}

export default Post