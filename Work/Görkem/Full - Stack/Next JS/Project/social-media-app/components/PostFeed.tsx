import React from 'react';
import PostInput from './PostInput';

export default function PostFeed() {
    return (
        <div className='flex-grow border border-black
        max-w-2xl
        '>
            <div className='py-4 px-3 text-lg sm:text-xl sticky top-0
            z-50 bg-white bg-opacity-80 background-blur-sm font-bold
            '>
                Home
            </div>
            <PostInput />
        </div>
    )
}