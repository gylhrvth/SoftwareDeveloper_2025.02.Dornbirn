import React, { useState, useRef } from "react";
import { FaBars, FaSearch, FaSlidersH, FaPalette, FaCalculator, FaCopy } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
function TopBar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-neutral-100 h-20 py-2 flex items-center justify-around px-4 text-l text-neutral-400 flex-1">
      {/* Language Dropdown */}
      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-1 px-2 py-1 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={open}
          >
            <BiWorld className="text-green-600 text-xl" />
            DE / <strong>DE</strong>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
          </button>
          {/* Dropdown */}
          <div className={`absolute bg-white left-0 mt-2 w-45 border rounded shadow-lg transition z-10
            ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <ul className="py-1 text-gray-700">
              <li><span className="block px-4 py-2 cursor-pointer hover:bg-gray-100">Deutschland - DE</span></li>
              <li><span className="block px-4 py-2 cursor-pointer hover:bg-gray-100">Germany - EN</span></li>
              <li><span className="block px-4 py-2 cursor-pointer hover:bg-gray-100">France - FR</span></li>
              <li><span className="block px-4 py-2 cursor-pointer hover:bg-gray-100">España - ES</span></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Quick Links */}
      <div className="hidden md:flex items-center gap-6 font-light">
        <a href="" className="flex items-center gap-1 hover:underline">
          <FaSlidersH className="text-green-600" /> Konfiguratoren
        </a>
        <a href="" className="flex items-center gap-1 hover:underline">
          <FaPalette className="text-green-600" /> Farbmusterbestellung
        </a>
        <a href="" className="flex items-center gap-1 hover:underline">
          <FaCalculator className="text-green-600" /> Verbrauchsrechner
        </a>
        <a href="" className="flex items-center gap-1 hover:underline">
          <FaCopy className="text-green-600" /> Mediathek
        </a>
      </div>
    </div>
  );
}

function MainNav() {
  return (
    <nav className="h-24 flex items-center justify-center px-4 shadow-lg text-gray-500 flex-3 font-light">
      {/* Mobile Hamburger */}
      <button className="block xl:hidden mr-4 text-2xl">
        <FaBars />
      </button>
      {/* Main Nav - centered */}
      <ul className="hidden xl:flex items-center gap-4 justify-center flex-1">
        {/* Search icon as first nav item */}
        <li>
          <button className="mr-2 text-xl cursor-pointer hover:text-green-800">
            <FaSearch />
          </button>
        </li>
        <NavItem>Holz</NavItem>
        <NavItem>Farbe</NavItem>
        <NavItem>Neue Werkstoffe</NavItem>
        <NavItem>Referenzen</NavItem>
        <NavItem>Ideengeber</NavItem>
        <NavItem>Service</NavItem>
        <NavItem>Händlersuche</NavItem>
        <NavItem>Osmo</NavItem>
      </ul>
      {/* Search (right for mobile) */}
      <button className="xl:hidden ml-auto text-xl">
        <FaSearch />
      </button>
    </nav>
  );
}

function NavItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="px-3 py-2 rounded hover:text-green-800 cursor-pointer transition-colors uppercase">
      {children}
    </li>
  );
}

function Logo() {
  return (
    <div className="flex flex-col items-center justify-center px-6 h-[11rem] md:h-[12rem] min-w-[200px] shadow-lg">
      <a href="/" className="flex items-center h-full">
        <img src="/logo-osmo.png" alt="Logo Osmo" className="h-18" />
      </a>
    </div>
  );
}

export default function Header() {
  return (
    <header className="w-full">
      <div className="flex">
        <div className="flex flex-col flex-1">
          <TopBar />
          <MainNav />
        </div>
          <Logo />
      </div>
    </header>
  );
}