import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaHashtag, FaUser } from 'react-icons/fa';

import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarTweetButton from './SidebarTweetButton';
import Button from '../Button';
import { useContext } from 'react';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const { openLoginModal, currentUser, logout } = useContext(Context)

  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/',
    },
    {
      icon: FaHashtag,
      label: 'Explore',
      href: '/explore'
    },
    {
      icon: BsBellFill,
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      alert: currentUser?.hasNotification
    },
    {
      icon: FaUser,
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ]

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px] hidden md:flex flex-col">
          <SidebarLogo />
          {items.map((item, id) => id < 2 && (
            <SidebarItem
              key={id}
              alert={item.alert}
              auth={item.auth}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
          {
            currentUser && (
              items.map((item, id) => id > 1 && (
                <SidebarItem
                  key={id}
                  alert={item.alert}
                  auth={item.auth}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                />
              ))
            )
          }
          {currentUser && (
            <>
              <SidebarItem onClick={logout} icon={BiLogOut} label="Logout" />
              <SidebarTweetButton />
            </>
          )}
          {!currentUser &&
            <Button label="Login" fullWidth onClick={openLoginModal} />
          }
        </div>
        <div className="md:hidden flex items-center w-full justify-between absolute bottom-0 left-0 px-4 bg-zinc-200 dark:bg-zinc-800">
          {items.map((item, id) => id < 2 && (
            <SidebarItem
              key={id}
              alert={item.alert}
              auth={item.auth}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          ))}
          {
            currentUser && (
              items.map((item, id) => id > 1 && (
                <SidebarItem
                  key={id}
                  alert={item.alert}
                  auth={item.auth}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                />
              ))
            )
          }
          {currentUser && (
            <SidebarItem onClick={logout} icon={BiLogOut} label="Logout" />
          )}
          {!currentUser &&
            <Button label="Login" fullWidth onClick={openLoginModal} />
          }
        </div>
      </div>
    </div>
  )
};

export default Sidebar;
