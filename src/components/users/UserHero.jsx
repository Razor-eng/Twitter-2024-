/* eslint-disable react/prop-types */
import Avatar from "../Avatar";

const UserHero = ({ fetchedUser }) => {
    return (
        <div>
            <div className="dark:bg-neutral-700 bg-neutral-300 h-52 relative">
                {fetchedUser?.coverImage && (
                    <img src={fetchedUser?.coverImage} alt="Cover Image" style={{ objectFit: 'fill' }} className="h-full w-full" />
                )}
                <div className="absolute -bottom-16 left-4">
                    <Avatar userId={fetchedUser?.id} isLarge hasBorder />
                </div>
            </div>
        </div>
    );
}

export default UserHero;