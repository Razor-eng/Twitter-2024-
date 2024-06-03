import { BsTwitter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SidebarLogo = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/')}
      className="
        rounded-full 
        h-14
        w-14
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer
    ">
      <BsTwitter size={28} className="text-[#1DA1F2] dark:text-white" />
    </div>
  );
};

export default SidebarLogo;
