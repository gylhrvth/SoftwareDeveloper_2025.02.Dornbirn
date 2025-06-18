import { getAllCountries, getCountryCities, getCountryLanguages, getCountryReligions } from "@/lib/db";
import type { Country, Language, Religion, City } from "@/lib/db";
import Link from "next/link";

interface Props {
  params: {
    code: string;
  };
}

// ✅ Helper: Get country by code
async function getCountryByCode(code: string): Promise<Country | undefined> {
  const countries = await getAllCountries();
  return countries.find((c) => c.Code === code);
}

export default async function CountryDetails({ params }: Props) {
  const countryCode = params.code.toUpperCase();

  const country = await getCountryByCode(countryCode);
  if (!country) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-900 p-6">
        <h1 className="text-3xl font-bold mb-4">Country Not Found</h1>
        <Link href="/country" className="text-cyan-400 underline">
          Back to countries list
        </Link>
      </main>
    );
  }

  // ✅ Load extra info: languages, religions, cities
  const languages: Language[] = await getCountryLanguages(countryCode);
  const religions: Religion[] = await getCountryReligions(countryCode);
  const cities: City[] = await getCountryCities(countryCode);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-10 text-cyan-400 drop-shadow-lg">
        {country.Name} Details
      </h1>

      <div className="w-full max-w-5xl bg-gray-800 bg-opacity-60 rounded-lg p-6 text-white flex flex-col md:flex-row gap-8">
        {/* Left: Basic Info */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4 border-b border-cyan-400 pb-2">
            Basic Information
          </h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li><strong>Capital:</strong> {country.Capital}</li>
            <li><strong>Province:</strong> {country.Province}</li>
            <li><strong>Area:</strong> {country.Area.toLocaleString()} km²</li>
            <li><strong>Population:</strong> {country.Population.toLocaleString()}</li>
          </ul>
        </div>

        {/* Right: Languages & Religions */}
        <div className="md:w-1/2 flex flex-col gap-10">
          {/* Languages */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-cyan-400 pb-2">
              Languages Spoken
            </h2>
            <p className="mb-3 text-cyan-300 italic text-sm">
              Percentage represents share of speakers within the country.
            </p>
            {languages.length > 0 ? (
              <ul className="list-disc list-inside text-lg text-cyan-300 space-y-1">
                {languages.map((lang) => (
                  <li key={lang.name}>
                    {lang.name} — {lang.percentage.toFixed(1)}%
                  </li>
                ))}
              </ul>
            ) : (
              <p>No language data available.</p>
            )}
          </div>

          {/* Religions */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-amber-400 pb-2">
              Religions Practiced
            </h2>
            <p className="mb-3 text-amber-400 italic text-sm">
              Percentage indicates population practicing each religion.
            </p>
            {religions.length > 0 ? (
              <ul className="list-disc list-inside text-lg text-amber-400 space-y-1">
                {religions.map((rel) => (
                  <li key={rel.name}>
                    {rel.name} — {rel.percentage.toFixed(1)}%
                  </li>
                ))}
              </ul>
            ) : (
              <p>No religion data available.</p>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Major Cities Section */}
      <div className="w-full max-w-5xl bg-gray-800 bg-opacity-60 rounded-lg p-6 mt-10 text-white">
  <h2 className="text-2xl font-semibold mb-6 border-b border-green-400 pb-2">
    Major Cities
  </h2>
  {cities.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cities.map((city) => (
        <div key={city.Name} className="bg-gray-900 rounded-xl p-4 shadow-lg hover:shadow-green-400/40 transition">
          <h3 className="text-xl font-bold text-green-300">{city.Name}</h3>
          <p className="text-sm text-gray-300">
            Population: {city.Population !== null ? city.Population.toLocaleString() : "N/A"}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p>No city data available.</p>
  )}
</div>

{/*more modern City Section styling

<div className="w-full max-w-5xl bg-gray-800 bg-opacity-60 rounded-lg p-6 mt-10 text-white">
  <h2 className="text-2xl font-semibold mb-6 border-b border-green-400 pb-2">
    Major Cities
  </h2>
  {cities.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="text-green-400 text-sm uppercase">City</th>
            <th className="text-green-400 text-sm uppercase">Population</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.Name} className="bg-gray-900 hover:bg-gray-700/50 transition">
              <td className="py-2 px-4 font-medium">{city.Name}</td>
              <td className="py-2 px-4">
                {city.Population !== null ? city.Population.toLocaleString() : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No city data available.</p>
  )}
</div>

*/}


      {/* Back link */}
      <div className="mt-8 flex justify-center">
    <Link
  href="/country"
  className="fixed bottom-6 right-6 inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-700 text-white font-semibold shadow-md hover:bg-cyan-500 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 z-50"
  >
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
  Back to countries list
</Link>
      </div>
    </main>
  );
}
