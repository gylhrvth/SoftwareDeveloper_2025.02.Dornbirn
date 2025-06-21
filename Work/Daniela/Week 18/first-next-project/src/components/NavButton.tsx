import Link from 'next/link';
import React from 'react';

type NavButtonProps = {
  href: string;
  children: React.ReactNode;
};

export default function NavButton({ href, children }: NavButtonProps) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-white rounded-md border border-white bg-transparent 
                 shadow-[0_0_10px_rgba(255,255,255,0.2)] 
                 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] 
                 transition duration-300"
    >
      {children}
    </Link>
  );
}
