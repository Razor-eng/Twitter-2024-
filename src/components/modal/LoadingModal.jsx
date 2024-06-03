import { useContext, useEffect, useState } from "react"
import { BsTwitter } from "react-icons/bs"
import { Context } from "../../context/Context"

const LoadingModal = () => {
    const { userLoading } = useContext(Context);
    const [loadVal, setLoadVal] = useState(0);

    useEffect(() => {
        setLoadVal(0);
        if (userLoading) {
            setTimeout(() => {
                setLoadVal(25);
            }, 500);
            setTimeout(() => {
                setLoadVal(50);
            }, 1000);
        }
        if (!userLoading) {
            setLoadVal(75);
            setTimeout(() => {
                setLoadVal(100);
            }, 1000);
            setTimeout(() => {
                setLoadVal(0);
            }, 1300);
        }
    }, [userLoading])

    return (
        <>
            <div
                className="
            justify-center 
            items-center
            flex 
            overflow-x-hidden 
            overflow-y-auto 
            fixed 
            inset-0 
            z-50 
            outline-none 
            focus:outline-none
            bg-transparent
          "
            >
                <div className={`absolute top-0 w-screen ${loadVal === 0 ? 'hidden' : 'block'}`}>
                    <div className="flex w-full h-2 bg-gray-200 overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div className="flex flex-col justify-center overflow-hidden bg-[#1DA1F2] opacity-60 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500" style={{ width: `${loadVal}%` }}></div>
                    </div>
                </div>
                <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
                    {/*content*/}
                    <div className="
              h-full
              lg:h-auto
              border-0 
              rounded-lg 
              relative 
              flex 
              items-center justify-center
              w-full 
              outline-none 
              focus:outline-none
              animate-pulse
              duration-75
              "
                    >
                        <div
                            className="
        rounded-full
        p-4 
        flex 
        items-center 
        justify-center 
        text-6xl
        md:text-8xl
    ">
                            <BsTwitter className="text-[#1DA1F2] dark:text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoadingModal