// src/app/country/page.tsx

import Link from "next/link";
import { getAllCountries } from "@/lib/db";
import type { Country } from "@/lib/db";

export default async function Country() {
  const countries = await getAllCountries();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8">Country Page</h1>
      <div className="flex gap-4 flex-wrap justify-center">
        {countries.map((country) => (
          <Link key={country.Code} href={`/country/${country.Code}`}>
            <div className="w-72 border border-gray-300 p-4 rounded shadow-sm bg-white transition-transform duration-200 hover:scale-105 hover:shadow-lg text-black cursor-pointer">
              <h3 className="text-lg font-semibold mb-2">{country.Name}</h3>
              <h4 className="mb-2">
                Capital: <span className="text-red-700">{country.Capital}</span>
              </h4>
              <p className="text-sm text-green-600">
                Population: {country.Population.toLocaleString()}
              </p>
              <p className="text-sm text-amber-900">
                Area: {country.Area.toLocaleString()} km²
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}