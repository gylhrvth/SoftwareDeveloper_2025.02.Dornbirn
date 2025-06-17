import React from 'react';
import Link from 'next/link'; // Assuming Next.js, adjust if using React Router

interface EditButtonProps {
  country: {
    Name: string;
  };
}

const EditButton: React.FC<EditButtonProps> = ({ country }) => {
  return (
    <div className="text-center mt-8">
    <Link 
      href={`/country/${country.Name}/edit`} 
      className="inline-block px-6 py-3 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors"
    >
      Edit Country
    </Link>
    </div>
  );
};

export default EditButton;