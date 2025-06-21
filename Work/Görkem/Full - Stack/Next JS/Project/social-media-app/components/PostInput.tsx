import React from 'react';
import Image from 'next/image';

export default function PostInput() {
    return (
        <div className='flex space-x-5 p-3'>
            <Image 
                src="/assets/busybee-logo.png" 
                width={44} 
                height={44} 
                alt="Bussybee logo" 
            />
            <div className='w-full'>
                <textarea className='resize-none outline-none w-full
                min-h-[50px] text-lg'
                placeholder='Whats happening?'
                />
            </div>
        </div>
    )
}