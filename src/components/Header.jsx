/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaHashtag } from "react-icons/fa";
import ModeButton from "./ModeButton";

const Header = ({ showBackArrow, label, isExplore }) => {
  const router = useNavigate();

  const handleBack = useCallback(() => {
    // router.back();
  }, [router]);

  return (
    <div className="border-b dark:border-neutral-800 p-5 flex items-center justify-between">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            size={20}
            className="
              cursor-pointer 
              hover:opacity-70 
              transition
          "/>
        )}
        <h1 className={`text-xl font-semibold ${isExplore && "flex items-center gap-2"}`}>
          {isExplore && <FaHashtag />}
          {label}
        </h1>
      </div>
      <ModeButton />
    </div>
  );
}

export default Header;
