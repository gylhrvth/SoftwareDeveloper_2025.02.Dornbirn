import Link from "next/link";
import { getAllCountries } from "@/lib/db";
import type { Country } from "@/lib/db";

export default async function Country() {
  const countries = await getAllCountries();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-10 text-cyan-400 drop-shadow-lg">
        Country Page
      </h1>

      <div className="w-full max-w-4xl">
        {/* Header row */}
        <div className="hidden md:flex text-gray-400 uppercase text-sm font-semibold border-b border-cyan-600 pb-2 mb-4 select-none">
          <div className="flex-1 text-center">Country</div>
          <div className="flex-1 text-center">Capital</div>
          <div className="flex-1 text-center">Population</div>
          <div className="flex-1 text-center">Area (km²)</div>
        </div>

        {/* Data rows */}
        {countries.map((country) => (
          <Link
            key={country.Code}
            href={`/country/${country.Code}`}
            className="group"
          >
            <div
              className="cursor-pointer flex flex-col md:flex-row items-center justify-between
                         bg-gray-800 bg-opacity-50 text-white rounded-md py-3 px-4 mb-3
                         hover:bg-cyan-900 hover:bg-opacity-70 transition-colors duration-300"
            >
              <div className="flex-1 text-center md:text-left font-semibold text-lg md:pl-4">
                {country.Name}
              </div>
              <div className="flex-1 text-center text-cyan-300 md:px-4">{country.Capital}</div>
              <div className="flex-1 text-center text-green-400 md:px-4">
                {country.Population.toLocaleString()}
              </div>
              <div className="flex-1 text-center text-amber-400 md:pr-4">
                {country.Area.toLocaleString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
