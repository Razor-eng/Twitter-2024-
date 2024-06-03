/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const Avatar = ({ userId, isLarge, hasBorder, post }) => {
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchImage = async () => {
    await getDocs(collection(db, 'users')).then(users => {
      users.docs.map(data => {
        if (data?.data()?.id === userId) {
          setPhotoUrl(data.data().profileImage);
        }
      })
    })
  }

  useEffect(() => {
    setLoading(true);
    fetchImage();
    setLoading(false);
  }, [fetchImage, userId]);

  const getUser = () => {
    navigate(`/users/${userId}`)
  }

  return (
    <div
      className={`
        ${hasBorder ? 'border-2' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        ${post === "md" && "lg:hidden"}
        ${post === "lg" && "hidden lg:inline"}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      <img
        style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }}
        alt="Avatar"
        onClick={getUser}
        src={photoUrl || '/images/placeholder.png'}
        className={`${loading ? 'animate-pulse duration-50' : ''}`}
      />
    </div>
  );
}

export default Avatar;