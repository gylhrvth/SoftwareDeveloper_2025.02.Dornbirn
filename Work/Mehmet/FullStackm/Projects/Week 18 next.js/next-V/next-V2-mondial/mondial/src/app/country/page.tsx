import { getAllCountries } from '@/lib/db';
import { type Country } from '@/lib/db';

export default async function Country() {
  const countries: Country[] = await getAllCountries();
  //console.log(countries);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8">Country Page</h1>
      <div className="flex gap-4 flex-wrap">
        {countries.map((country: any, index: number) => (
            <div
            key={index}
            className="w-72 border border-gray-300 p-4 rounded shadow-sm bg-white transition-transform duration-200 hover:scale-105 hover:shadow-lg  text-black"
            >
            <h3 className="text-lg font-semibold mb-2">{country.Name}</h3>
            <h4 className=' mb-2'>Captal: <span className='text-red-700'> {country.Capital} </span></h4>
            <p className="text-sm text-green-600">Population: {country.Population}</p>
            <p className="text-sm text-amber-900">Area: {country.Area} km²</p>
            </div>
        ))}
      </div>
      <p>This is the country page content.</p>
    </div>
  );
}