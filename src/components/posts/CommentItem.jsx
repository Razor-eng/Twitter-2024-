/* eslint-disable react/prop-types */
import { formatDistanceToNowStrict } from "date-fns";
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar";

const CommentItem = ({ data = {} }) => {
    const navigate = useNavigate();

    const goToUser = () => {
        navigate(`/users/${data.userId}`)
    };

    const createdAt = (createdAt) => {
        return formatDistanceToNowStrict(new Date(createdAt));
    }

    return (
        <div
            className="
        border-b 
        dark:border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-100
        dark:hover:bg-neutral-900 
        transition
      ">
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={''} />
                <div>
                    <div className="flex flex-col md:flex-row items-start md:items-center md:gap-2">
                        <p
                            onClick={goToUser}
                            className=" 
                font-semibold 
                cursor-pointer 
                hover:underline
            ">
                            {data?.name}
                        </p>
                        <span
                            onClick={goToUser}
                            className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            ">
                            @{data?.username}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {createdAt(data?.createdAt)}
                        </span>
                    </div>
                    <div className="mt-1">
                        {data?.tweet}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentItem