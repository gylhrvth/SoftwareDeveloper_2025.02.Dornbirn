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
      className="text-white border-2 border-white rounded hover:bg-white-50 p-2"
    >
      {children}
    </Link>
  );
}
