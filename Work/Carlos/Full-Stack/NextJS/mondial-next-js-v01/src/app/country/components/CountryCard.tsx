// app/country/CountryCard.tsx
import Link from 'next/link';
import CountryFlag from './CountryFlag';
import { type Country } from '@/lib/db';

type CountryCardProps = {
  country: Country;
};

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/country/${country.Name}`}>
      <div className="w-72 border border-gray-300 p-4 rounded shadow-sm bg-neutral-700 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-emerald-300 truncate pr-2 flex items-center">
            <CountryFlag countryCode={country.Code} countryName={country.Name} />
            {country.Name}
          </h3>
          <span className="text-sm font-semibold text-blue-300 whitespace-nowrap">[{country.Code}]</span>
        </div>
        {/* Additional country details can go here */}
        {/* <p className="text-sm">Population: {country.Population}</p> */}
        {/* <p className="text-sm">Area: {country.Area} km²</p> */}
        {/* <p className="text-sm">Capital: {country.Capital}</p> */}
      </div>
    </Link>
  );
}