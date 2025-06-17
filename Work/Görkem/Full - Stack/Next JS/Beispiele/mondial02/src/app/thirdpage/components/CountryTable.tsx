import type { Country } from '@/lib/db';
import CountryRow from './CountryRow';

type CountryTableProps = {
    countries: Country[];
    };

export default function CountryTable({ countries }: CountryTableProps) {
  return (
    <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden text-gray-300">
      <thead className="bg-gray-800 border-b border-gray-700">
        <tr>
          <th scope="col" className="px-4 py-2 text-left">Flagge</th>
          <th scope="col" className="px-4 py-2 text-left">Name</th>
          <th scope="col" className="px-4 py-2 text-left">Hauptstadt</th>
          <th scope="col" className="px-4 py-2 text-left">Fläche</th>
          <th scope="col" className="px-4 py-2 text-left">Bevölkerung</th>
          <th scope="col" className="px-4 py-2 text-center">Aktionen</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => (
          <CountryRow key={country.Code} country={country} />
        ))}
      </tbody>
    </table>
  );
}