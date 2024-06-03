/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";

import Button from "../Button";
import { Context } from "../../context/Context";

const UserBio = ({ fetchedUser, currentUser }) => {

    const { openEditModal, onFollow, hasFollowed } = useContext(Context);

    const [isFollowing, setIsFollowing] = useState(hasFollowed(fetchedUser?.data));

    const createdAt = () => {
        return format(new Date(fetchedUser?.createdAt), 'MMMM yyyy');
    };

    const follow = () => {
        onFollow(fetchedUser);
    }

    useEffect(() => {
        setIsFollowing(hasFollowed(fetchedUser?.data) || false);
    }, [fetchedUser, hasFollowed, isFollowing])

    return (
        <div className="border-b dark:border-neutral-800 pb-4">
            <div className="flex justify-end p-2">
                {currentUser?.id === fetchedUser?.data?.id ? (
                    <Button secondary label="Edit" onClick={openEditModal} />
                ) : (
                    <Button
                        onClick={follow}
                        label={isFollowing ? 'Unfollow' : 'Follow'}
                        secondary={isFollowing}
                    />
                )}
            </div>
            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <p className="text-2xl font-semibold">
                        {fetchedUser?.data?.name}
                    </p>
                    <p className="text-md text-neutral-500">
                        @{fetchedUser?.data?.username}
                    </p>
                </div>
                <div className="flex flex-col mt-4">
                    <p>
                        {fetchedUser?.data?.bio}
                    </p>
                    {fetchedUser?.data?.createdAt &&
                        <div
                            className="
              flex 
              flex-row 
              items-center 
              gap-2 
              mt-4 
              text-neutral-500
          ">
                            <BiCalendar size={24} />
                            <p>
                                Joined {createdAt(fetchedUser?.data?.createdAt)}
                            </p>
                        </div>
                    }
                </div>
                <div className="flex flex-row items-center mt-4 gap-6">
                    <div className="flex flex-row items-center gap-1">
                        <p>{fetchedUser?.data?.followingIds?.length || 0}</p>
                        <p className="text-neutral-500">Following</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <p>{fetchedUser?.data?.followersCount || 0}</p>
                        <p className="text-neutral-500">Followers</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserBio;