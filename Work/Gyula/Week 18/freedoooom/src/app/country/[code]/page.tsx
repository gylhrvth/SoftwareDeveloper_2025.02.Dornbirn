import Link from "next/dist/client/link";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export default async function CountryDetails({ params }: { params: { code: string } }) {
  const { code } = await params;

  const country = await prisma.country.findUnique({
    where: { Code: code },
  });
  const cities = await prisma.city.findMany({
    where: { Country: code },
    orderBy: { Population: 'desc' },
  });


  if (!country) {
    return (
      <div>
        <h1>Country Not Found</h1>
      </div>
    );
  }

  return (
    <div>
    <h1 className="text-4xl font-bold text-center tracking-wider">{country.Name}</h1>
    <div className="max-w-xl mx-auto mt-8">
    <h2 className="font-bold">Cities:</h2>
      <ul className="mt-4 space-y-2">
        {cities.map((city) => (
          <li
            key={city.Name}
            className="px-4 py-2 bg-gray-100 rounded shadow flex justify-between items-center"
          >
            <span className="font-medium">{city.Name}</span>
            <span className="text-sm text-gray-500">{city.Population ? city.Population.toLocaleString() : 'n.n. '} people</span>
          </li>
        ))}
      </ul>
      <footer className="mt-8 border-t pt-4 text-center">
        <Link href="/">
          <span className="text-blue-600 hover:underline">Home</span>
        </Link>
      </footer>
    </div>
    </div>
  );
}
// This is a placeholder component for country details.