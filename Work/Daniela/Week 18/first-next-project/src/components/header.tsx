// src/components/Header.tsx
import Link from 'next/link';
import NavButton from './NavButton';

export default function Header() {
  return (
    <header className="header w-full h-35 absolute top-0  ">
      <div className="w-full mx-auto px-4 py-4 flex-row justify-around items-center ">

        <h2 className="text-xl font-bold flex justify-start ml-[10%] mt-10">
          <Link href="/">About-Page</Link>
        </h2>
        <nav className="space-x-4 flex justify-end mr-15 pt-2">
          <NavButton href="/">Home</NavButton>
          <NavButton href="/mondial">Mondial</NavButton>
          <NavButton href="/slug/slug">Slug-Side</NavButton>
        </nav>
      </div>
    </header>
  );
}


