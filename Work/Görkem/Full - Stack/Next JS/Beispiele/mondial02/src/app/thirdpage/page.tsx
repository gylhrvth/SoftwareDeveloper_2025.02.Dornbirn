import { getAllCountries } from '@/lib/db';
import type { Country } from '@/lib/db';
import CountryTable from './components/CountryTable';

export default async function ThirdPage() {
  const countries: Country[] = await getAllCountries();

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 py-10 text-gray-100">
      <div className="w-full max-w-5xl bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-lg">Ländertabelle</h1>
        <div className="overflow-x-auto">
          <CountryTable countries={countries} />
        </div>
      </div>
    </main>
  );
}
