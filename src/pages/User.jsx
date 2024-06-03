/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Context } from "../context/Context"
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import UserHero from "../components/users/UserHero";
import UserBio from "../components/users/UserBio";
import LoadingModal from "../components/modal/LoadingModal";
import PostFeed from "../components/posts/PostFeed";

const User = () => {
    const { userLoading, currentUser, getFetchedUser, fetchedUser } = useContext(Context);
    const location = useLocation();
    const [user, setUser] = useState(location.pathname.split('/').pop());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setUser(location.pathname.split('/').pop())
        setLoading(true);
        getFetchedUser(user);
        setLoading(false);
    }, [location, user])

    if (userLoading || loading) {
        return <LoadingModal />
    }

    return (
        <>
            {currentUser?.id !== user && <Header showBackArrow label={fetchedUser.data?.name} />}
            <UserHero fetchedUser={fetchedUser?.data} />
            <UserBio fetchedUser={fetchedUser} currentUser={currentUser} />
            <PostFeed isProfile fetchedUser={fetchedUser?.data} />
        </>
    )
}

export default User