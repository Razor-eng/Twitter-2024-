/* eslint-disable react/prop-types */
import { useContext } from 'react';
import Avatar from '../Avatar';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

const FollowBar = ({ user }) => {
  const { onFollow } = useContext(Context);
  const navigate = useNavigate();

  const setPath = () => {
    navigate(`/users/${user.data.id}`)
  }

  const follow = () => {
    onFollow(user);
  }

  return (
    <div
      className="flex items-center px-3 py-2  cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition duration-500 ease-out rounded-lg"
    >
      <Avatar
        userId={user?.data?.id}
        onClick={setPath}
      />
      <div
        className="truncate ml-3 leading-5"
        onClick={setPath}
      >
        <h4 className="font-semibold text-sm">
          {user?.data.name}
        </h4>
        <h5 className="text-neutral-500 text-sm">
          {user?.data.username}
        </h5>
      </div>
      <button className="ml-auto rounded-full text-sm px-2 py-1 font-semibold hover:text-gray-500" onClick={follow}>
        Follow
      </button>
    </div>
  )
};

export default FollowBar;
