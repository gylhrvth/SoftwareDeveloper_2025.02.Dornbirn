import React from 'react';
import Image from 'next/image';
import { HomeIcon, HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, UserIcon, EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';

interface SidebarLinkProps {
    text: string,
    Icon: React.ForwardRefExoticComponent<
        Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>>
}

export default function Sidebar() {
    return (
        <nav className='h-screen hidden sm:flex flex-col sticky top-0 p-3 xl:ml-20'>
            <div className='relativ h-full'>
                <div className='py-3'>
                    <Image 
                        src="/assets/busybee-logo.png" 
                        width={48} 
                        height={48} 
                        alt="Bussybee logo" 
                    />
                </div>
                <ul>
                    <SidebarLink key="home" Icon={HomeIcon} text="Home" />
                    <SidebarLink key="explore" Icon={HashtagIcon} text="Explore" />
                    <SidebarLink key="notifications" Icon={BellIcon} text="Notifications" />
                    <SidebarLink key="messages" Icon={InboxIcon} text="Messages" />
                    <SidebarLink key="bookmarks" Icon={BookmarkIcon} text="Bookmarks" />
                    <SidebarLink key="profile" Icon={UserIcon} text="Profile" />
                    <SidebarLink key="more" Icon={EllipsisHorizontalCircleIcon} text="More" />
                    <button className='xl:block bg-[#F4AF01] w-[200px] h-[52px]
                    rounded-full text-white font-medium cursor-pointer shadow-md mt-2
                    '>
                        Bumble
                    </button>
                </ul>
                <div className='absolute bottom-0'>User Info</div>
            </div>
        </nav>
    )
}

function SidebarLink({ text, Icon }: SidebarLinkProps) {
    return (
        <li className='flex items-center text-xl mb-2 space-x-3 p-2.5'>
            <Icon className="h-7" />
            <span className="hidden xl:block">{text}</span>
        </li>
    )
}

