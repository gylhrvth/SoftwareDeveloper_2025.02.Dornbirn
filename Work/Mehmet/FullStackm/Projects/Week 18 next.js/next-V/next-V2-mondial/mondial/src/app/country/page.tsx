// app/page.tsx

import Link from "next/link";
import { getAllCountries } from "@/lib/db";
import type { Country } from "@/lib/db";

export default async function Country() {
  const countries: Country[] = await getAllCountries();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      {/* Page heading */}
      <h1 className="text-4xl font-extrabold text-center mt-10 mb-6 text-cyan-400 drop-shadow-lg">
        Country Page
      </h1>

      {/* Sticky column headers */}
      <div className="sticky top-0 z-10 bg-gray-900 bg-opacity-95 backdrop-blur-md text-gray-400 uppercase text-sm font-semibold border-y border-cyan-600 py-3 hidden md:flex max-w-7xl mx-auto px-4">
        <div className="flex-1 text-left pl-4">Country</div>
        <div className="flex-1 text-center">Capital</div>
        <div className="flex-1 text-center">Population</div>
        <div className="flex-1 text-right pr-4">Area (km²)</div>
      </div>

      {/* Country list */}
      <div className="max-w-7xl mx-auto space-y-3 mt-4">
        {countries.map((country) => (
          <Link
            key={country.Code}
            href={`/country/${country.Code}`}
            className="group block"
          >
            <div
              className="cursor-pointer flex flex-col md:flex-row items-center justify-between
                         bg-gray-800 bg-opacity-50 text-white rounded-md py-3 px-4
                         hover:bg-cyan-900 hover:bg-opacity-70 transition-colors duration-300"
            >
              <div className="flex-1 text-left font-semibold text-lg md:pl-4">
                {country.Name}
              </div>
              <div className="flex-1 text-center text-cyan-300 md:px-4">
                {country.Capital}
              </div>
              <div className="flex-1 text-center text-green-400 md:px-4">
                {country.Population.toLocaleString()}
              </div>
              <div className="flex-1 text-right text-amber-400 md:pr-4">
                {country.Area.toLocaleString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
