// src/app/country/[code]/page.tsx

import {
  getCountryByCode,
  getCitiesByCountryCode,
  getContinentByCountryCode,
} from "@/lib/db";
import type { Country } from "@/lib/db";

interface Props {
  params: { code: string };
}

export default async function CountryDetailPage({ params }: Props) {
  const country = await getCountryByCode(params.code);

  if (!country) {
    return (
      <div className="p-10 text-red-400 bg-gray-900 rounded-lg shadow-lg max-w-xl mx-auto mt-20">
        Country not found
      </div>
    );
  }

  const [cities, continent] = await Promise.all([
    getCitiesByCountryCode(params.code),
    getContinentByCountryCode(params.code),
  ]);

  return (
    <div className="p-8 bg-gray-900 text-gray-100 max-w-4xl mx-auto rounded-xl shadow-2xl mt-10 border border-gray-700">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-400 drop-shadow">
        {country.Name}{" "}
        <span className="text-gray-400">({country.Code})</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="mb-2">
            <span className="font-semibold text-blue-300">Capital:</span>{" "}
            {country.Capital}
          </p>
          <p className="mb-2">
            <span className="font-semibold text-blue-300">Province:</span>{" "}
            {country.Province}
          </p>
          <p className="mb-2">
            <span className="font-semibold text-blue-300">Continent:</span>{" "}
            {continent?.Name || "Unknown"}
          </p>
        </div>
        <div>
          <p className="mb-2">
            <span className="font-semibold text-blue-300">Area:</span>{" "}
            {country.Area.toLocaleString()} km²
          </p>
          <p className="mb-2">
            <span className="font-semibold text-blue-300">Population:</span>{" "}
            {country.Population.toLocaleString()}
          </p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-yellow-300">Top Cities</h2>
        <ul className="list-disc ml-6">
          {cities.length === 0 ? (
            <li className="text-gray-400">None</li>
          ) : (
            cities.map((city, i) => (
              <li key={i} className="hover:text-yellow-200">
                {city.Name}{" "}
                <span className="text-gray-400">
                  — {city.Population.toLocaleString()}
                </span>
              </li>
            ))
          )}
        </ul>
      </section>

      {/* Add more sections here like religions, rivers, economy, etc */}
    </div>
  );
}
