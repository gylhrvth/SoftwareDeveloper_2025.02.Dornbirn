// app/country/components/BackButton.tsx
import Link from 'next/link';

type BackButtonProps = {
  href: string;
  label: string;
};

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <div className="text-center mt-8">
      <Link 
        href={href} 
        className="inline-block px-6 py-3 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-500 transition-colors"
      >
        {label}
      </Link>
    </div>
  );
}