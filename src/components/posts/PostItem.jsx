/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';

import Avatar from '../Avatar';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';

const PostItem = ({ data = {} }) => {
  const navigate = useNavigate();
  const { hasLiked, onLike } = useContext(Context);
  const [liked, setLiked] = useState(hasLiked(data));

  const goToUser = (ev) => {
    ev.stopPropagation();
    // router.push(`/users/${data.user.id}`)
  };

  const goToPost = () => {
    navigate(`/posts/${data.postId}`);
  };

  const LikeIcon = liked ? AiFillHeart : AiOutlineHeart;

  const createdAt = (createdAt) => {
    return formatDistanceToNowStrict(new Date(createdAt));
  }

  return (
    <div
      onClick={goToPost}
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
        <Avatar userId={data?.postData?.userId} post='lg' />
        <div>
          <div className='flex gap-2'>
            <Avatar userId={data?.postData?.userId} post='md' />
            <div className="flex md:flex-row flex-col md:items-center items-start md:gap-2 gap-0">
              <p
                onClick={goToUser}
                className="
                font-semibold 
                cursor-pointer 
                hover:underline
              ">
                {data?.postData?.name}
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
                @{data?.postData?.username}
              </span>
              {data?.postData?.createdAt &&
                <span className="text-neutral-500 text-xs font-[400]">
                  {createdAt(data?.postData?.createdAt)} ago
                </span>
              }
            </div>
          </div>
          <div className="mt-1">
            {data?.postData?.tweet}
            {data?.image
              &&
              <div className='mt-1 mb-2'>
                <img
                  src={data?.image}
                  width={900}
                  height={900}
                  className='lg:w-[30vw] w-[100vw] text-center lg:h-[30vh] h-auto object-fit rounded-lg'
                  alt='post Img'
                />
              </div>
            }
          </div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
            ">
              <AiOutlineMessage size={20} />
              <p>
                {data?.postData?.comments?.length || 0}
              </p>
            </div>
            <div
              onClick={() => { onLike(data); setLiked(!liked) }}
              className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            ">
              <LikeIcon color={hasLiked(data) && liked ? 'red' : ''} size={20} />
              <p>
                {data?.postData?.likedIds?.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem;
