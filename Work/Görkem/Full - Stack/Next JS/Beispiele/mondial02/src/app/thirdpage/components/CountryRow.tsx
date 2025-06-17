import type { Country } from '@/lib/db';

type CountryRowProps = {
  country: Country;
};

export default function CountryRow({ country }: CountryRowProps) {
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
      <td className="px-4 py-2 text-2xl text-white">
        <span className={`fi fi-${country.Alpha2}`}></span>
      </td>
      <td className="px-4 py-2">{country.Name}</td>
      <td className="px-4 py-2">{country.Capital || <span className="text-gray-400">-</span>}</td>
      <td className="px-4 py-2">{country.Area?.toLocaleString() || <span className="text-gray-400">-</span>}</td>
      <td className="px-4 py-2">{country.Population?.toLocaleString() || <span className="text-gray-400">-</span>}</td>
      <td className="px-4 py-2 flex gap-2 justify-center">
        <button disabled className="px-3 py-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 rounded transition">Edit</button>
        <button disabled className="px-3 py-1 bg-red-200 hover:bg-red-300 text-red-900 rounded transition">Delete</button>
      </td>
    </tr>
  );
}
