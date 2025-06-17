import type { Country } from '@/lib/db';
import getAlpha2 from '@/lib/countryFlagMapping';

type CountryRowProps = {
  country: Country;
};

export default function CountryRow({ country }: CountryRowProps) {
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
      <td className="px-4 py-2 text-2xl text-white">
        <span className={`fi fi-${ getAlpha2(country.Code) }`}></span>
      </td>
      <td className="px-4 py-2 text-left">{country.Name}</td>
      <td className="px-4 py-2 text-left">{country.Capital || <span className="text-gray-400">-</span>}</td>
      <td className="px-4 py-2 pl-6 text-right tabular-nums">{country.Area?.toLocaleString() || <span className="text-gray-400">-</span>}</td>
      <td className="px-4 py-2 pl-6 text-right tabular-nums">{country.Population?.toLocaleString() || <span className="text-gray-400">-</span>}</td>
      <td className="px-4 py-2 pl-6 flex gap-3 justify-center">
        <button disabled className="px-3 py-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 rounded transition">Edit</button>
        <button disabled className="px-3 py-1 bg-red-200 hover:bg-red-300 text-red-900 rounded transition">Delete</button>
      </td>
    </tr>
  );
}
