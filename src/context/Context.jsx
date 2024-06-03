/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { collection, doc, getDocs, updateDoc, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const [edit, setEdit] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserUid, setCurrentUserUid] = useState();
    const [userLoading, setUserLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [user, loading] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [fetchedPost, setFetchedPost] = useState([]);
    const [fetchedPostComments, setFetchedPostComments] = useState([]);
    const [postId, setPostId] = useState();
    const [fetchedUser, setFetchedUser] = useState([]);

    const openLoginModal = () => {
        setLogin(true);
    }
    const closeLoginModal = () => {
        setLogin(false);
    }
    const openRegisterModal = () => {
        setRegister(true);
    }
    const closeRegisterModal = () => {
        setRegister(false);
    }
    const openEditModal = () => {
        setEdit(true);
    }
    const closeEditModal = () => {
        setEdit(false);
    }
    const toggle = () => {
        setLogin(!login);
        setRegister(!register);
    }

    const getUser = async () => {
        setUsers([]);
        setUserLoading(true);
        setCurrentUser(null);
        (await getDocs(collection(db, 'users'))).docs.forEach(doc => {
            setUsers(prev => [...prev, { data: doc.data(), uid: doc.id }]);
            if (doc.data().id === user?.uid) {
                setCurrentUser(doc.data());
                setCurrentUserUid(doc.id);
            }
        });
        setUserLoading(false)
        closeLoginModal();
    }

    const logout = async () => {
        setUserLoading(true);
        try {
            await signOut(auth).then(() => {
                setCurrentUser(null);
            }).then(() => {
                toast.success('Signed Out!')
            })
        } catch (error) {
            toast.error(error.message);
        }
        setUserLoading(false);
    }

    const getPosts = async () => {
        setPosts([]);
        setUserPosts([]);
        (await getDocs(collection(db, 'posts'))).docs.sort((a, b) => a?.data()?.createdAt - b?.data()?.createdAt).map((doc) => {
            setPosts(prev => [...prev, { postId: doc.id, postData: doc?.data() }]);
            if (currentUser) {
                if (doc.data().userId === currentUser?.id) {
                    setUserPosts(prev => [...prev, { postId: doc.id, postData: doc.data() }]);
                }
            }
        })
    }

    const onFollow = async (user) => {

        if (currentUser) {
            let followersCount = user?.data?.followersCount || 0;
            let followingIds = currentUser?.followingIds || [];

            followingIds = followingIds.filter(id => {
                return id !== (user.data?.id)
            })

            if (hasFollowed(user.data)) {
                followingIds = followingIds.filter(id => {
                    return id !== user.data?.id
                });
                followersCount -= 1;
                toast.success('You unfollwed ' + (user.data?.name))
            } else {
                followingIds.push(user.data?.id)
                followersCount += 1;
                toast.success('You started following ' + (user.data?.name))
            }

            await updateDoc(doc(db, 'users', currentUserUid), {
                followingIds: followingIds,
            }).then(async () => {
                await updateDoc(doc(db, 'users', (user?.uid)), {
                    followersCount: followersCount
                })
            }).then(() => {
                getUser();
                getFetchedUser(user.data.id);
            })
        } else {
            setLogin(true);
        }
    }

    const hasFollowed = (user) => {
        let isFollowing = false;
        if (currentUser?.followingIds?.includes(user.id)) {
            isFollowing = true;
        }
        return isFollowing;
    }
    const onLike = async (post) => {
        let likes = post.postData?.likedIds || [];

        if (hasLiked(post)) {
            likes = likes.filter(id => {
                return id !== currentUser?.id
            });
            toast.success('You unliked a post')
        } else {
            likes.push(currentUser?.id)
            toast.success('You liked a post')
        }
        await updateDoc(doc(db, 'posts', post.postId), {
            likedIds: likes
        }).then(() => {
            getPosts();
        })
    }
    const hasLiked = (post) => {
        let isLiked = false;
        if (post.postData?.likedIds?.includes(currentUser?.id)) {
            isLiked = true;
        }
        return isLiked;
    }

    const fetchComments = async (postId) => {
        setFetchedPostComments([]);
        (await getDocs(collection(db, 'comments'))).docs.sort((a, b) => { return b.data().createdAt - a.data().createdAt }).map((doc => {
            if (doc.data().postId === postId) {
                setFetchedPostComments(prev => [...prev, doc.data()]);
            }
        }))
        setUserLoading(false);
    }
    const getFetchedPost = (postId) => {
        setUserLoading(true);
        setFetchedPost([]);
        posts.map((post) => {
            if (post.postId === postId) {
                setFetchedPost(post);
                fetchComments(postId);
            }
        });
    }

    const getFetchedUser = async (userId) => {
        setFetchedUser([]);
        setUserLoading(true);
        (await getDocs(collection(db, 'users'))).docs.map(doc => {
            if (doc.data().id === userId) {
                setFetchedUser({ data: doc.data(), uid: doc.id })
                setUserLoading(false);
            }
        });
    }

    useEffect(() => {
        if (postId) {
            getFetchedPost(postId);
        }
    }, [postId, posts])

    useEffect(() => {
        getUser();
    }, [loading, user])

    useEffect(() => {
        getPosts();
    }, [currentUser])

    const contextValue = {
        toggle, getUser, logout,
        login, openLoginModal, closeLoginModal,
        register, openRegisterModal, closeRegisterModal,
        currentUser, userLoading, hasLiked, onLike, onFollow,
        getPosts, posts, userPosts, hasFollowed,
        getFetchedPost, fetchedPost, fetchedPostComments, setPostId,
        getFetchedUser, fetchedUser, users, currentUserUid,
        edit, openEditModal, closeEditModal
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider