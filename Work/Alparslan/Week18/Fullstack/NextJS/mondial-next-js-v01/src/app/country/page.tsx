import { getAllCountries } from '@/lib/db';
import { type Country } from '@/lib/db';
import Link from 'next/link';

export default async function Country() {
  const countries: Country[] = await getAllCountries();
  //console.log(countries);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">Country Page</h1>
      <div className="flex gap-4 flex-wrap">
        {countries.map((country: any, index: number) => (
            <Link key={index} href={`/country/${country.Name}`}>
                <div
                className="w-72 border border-gray-300 p-4 rounded shadow-sm bg-neutral-700 transition-transform duration-200 hover:scale-105 hover:shadow-lg"
                >
                <h3 className="text-lg font-semibold mb-2 text-emerald-300">{country.Name}</h3>
                <p className="text-sm">Population: {country.Population}</p>
                <p className="text-sm">Area: {country.Area} km²</p>
                </div>
            </Link>
        ))}
      </div>
      <p>This is the country page content.</p>
    </div>
  );
}