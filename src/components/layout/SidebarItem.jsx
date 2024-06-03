/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { BsDot } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';

const SidebarItem = ({ label, icon: Icon, href, auth, onClick, alert }) => {
  const navigate = useNavigate();
  const { openLoginModal } = useContext(Context);

  const currentUser = true;
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      openLoginModal();
    } else if (href) {
      navigate(href);
    }
  };

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer 
        lg:hidden
      ">
        <Icon size={28} />
        {alert && <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />}
      </div>
      <div className="
        relative
        hidden 
        lg:flex 
        gap-4 
        p-4 
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        w-full
        cursor-pointer
        items-center
      ">
        <Icon size={24} />
        <p className="hidden lg:block text-xl">
          {label}
        </p>
        {alert && <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />}
      </div>
    </div>
  );
}

export default SidebarItem;