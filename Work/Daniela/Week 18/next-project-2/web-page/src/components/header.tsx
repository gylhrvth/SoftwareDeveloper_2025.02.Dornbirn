// src/components/Header.tsx
'use client';
import Link from 'next/link';
import NavButton from '@/components/NavButton';
import { useState, useEffect } from "react";



export default function Header() {
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        headerBackground w-full fixed top-0 right-0 z-50
        transition-all duration-300 ease-in-out pb-2.5
        ${isShrunk ? "h-20 pb-1" : "h-30 pb-6"}
      `}
    >
      <div
        className={`
          w-full mx-auto px-4 flex flex-row justify-around items-center
          transition-all duration-300 ease-in-out
          ${isShrunk ? "py-2" : "py-4"}
        `}
      >
        <img
          src="public/Logo.png" // Pfad anpassen
          alt="Logo"
          className={isShrunk ? "h-6" : "h-10"}
        />
        <nav className="space-x-4 flex justify-center pt-2">
          <NavButton href="/">New</NavButton>
          <NavButton href="/mondial">Discover</NavButton>
          <NavButton href="/slug/slug">Categories</NavButton>
          <NavButton href="/">Sale</NavButton>
          <NavButton href="/">About Us</NavButton>
        </nav>
      </div>
    </header>
  );
}

