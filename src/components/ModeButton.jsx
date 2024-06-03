import { MdLightMode } from 'react-icons/md'
import { LuMoonStar } from 'react-icons/lu'
import { useTheme } from 'next-themes'

const ModeButton = () => {
    const { systemTheme, theme, setTheme } = useTheme();

    const currentTheme = theme === "system" ? systemTheme : theme;
    return (
        <>
            {currentTheme === "dark" ?
                <MdLightMode
                    className='text-xl cursor-pointer hover:text-gray-300 flex items-center justify-center hover:text-opacity-90'
                    onClick={() => setTheme("light")}
                />
                :
                <LuMoonStar
                    className='text-xl cursor-pointer hover:text-gray-700 flex items-center justify-center hover:text-opacity-90'
                    onClick={() => setTheme("dark")}
                />
            }
        </>
    )
}

export default ModeButton