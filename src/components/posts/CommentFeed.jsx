/* eslint-disable react/prop-types */
import CommentItem from "./CommentItem";

const CommentFeed = ({ comments }) => {
    return (
        <>
            {comments?.map((comment, id) => (
                <CommentItem key={id} data={comment} />
            ))}
        </>
    );
};

export default CommentFeed