//import { useState } from 'react';
import HeroSlider from './components/HeroSlider';
import Navbar from './components/Navbar';



function App() {
  

  return (
    <>

    <Navbar/>
    <Placeholder title="AnnouncementBar" className="w-screen h-70"/>
    <HeroSlider/>
    

    </>
  )
}

export default App


function Placeholder({ title, className }: { title: string, className?: string }) {
  return (
    <div className={`relative border-2 border-dashed border-gray-300 flex items-center justify-center ${className ?? ''}`}>
      <span className="absolute top-2 left-0 w-full text-center font-bold text-lg text-gray-400">
        {title}
      </span>
      <svg width="100%" height="100%" className="absolute top-0 left-0">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#bbb" strokeWidth="2" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#bbb" strokeWidth="2" />
      </svg>
    </div>
  );
}