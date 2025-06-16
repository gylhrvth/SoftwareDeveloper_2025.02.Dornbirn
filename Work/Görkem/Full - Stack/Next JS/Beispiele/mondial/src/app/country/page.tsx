import { getAllCountries } from '@/lib/db';
import { type Country } from '@/lib/db';
import { Globe } from 'lucide-react';

export default async function CountriesPage() {
  const countries: Country[] = await getAllCountries();

  return (
    <main className="p-6">
    <h1 className="text-3xl font-semibold mb-2 text-center">🌐 Länderübersicht</h1>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Es wurden {countries.length} Länder aus der Datenbank geladen.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries.map((country, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-blue-600" />
              {country.Name}
            </h3>
            <p className="text-sm text-gray-600">🌇 Hauptstadt: {country.Capital || '—'}</p>
            <p className="text-sm text-gray-600">👥 Bevölkerung: {country.Population.toLocaleString()}</p>
            <p className="text-sm text-gray-600">🌍 Fläche: {country.Area.toLocaleString()} km²</p>
          </div>
        ))}
      </div>
    </main>
  );
}
