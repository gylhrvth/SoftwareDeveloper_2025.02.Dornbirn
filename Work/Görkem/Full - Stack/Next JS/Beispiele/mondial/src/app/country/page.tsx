import Link from 'next/link';
import { getAllCountries } from '@/lib/db';
import { type Country } from '@/lib/db';
import CountryFlag from './CountryFlag';

export default async function CountriesPage() {
  const countries: Country[] = await getAllCountries();

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">Länderübersicht</h1>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Es wurden {countries.length} Länder aus der Datenbank geladen.
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <li key={country.Code.toLowerCase()}>
            <Link
              href={`/country/${country.Code}`}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:bg-blue-100 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <CountryFlag code={country.Code} />
                <span className="text-base font-medium text-gray-800 whitespace-nowrap">
                  {country.Name}
                </span>
              </div>
              <span className="text-sm font-mono text-gray-500">{country.Code}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}






