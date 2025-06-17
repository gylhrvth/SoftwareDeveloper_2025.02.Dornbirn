import Link from "next/link";
import { PrismaClient } from "../../generated/prisma";


const prisma = new PrismaClient()

export default async function Home() {
  const countries = await prisma.country.findMany();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8">Countries around the world!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-w-5xl mx-auto">
        {countries.map((country) => (
          <Link key={country.Code} href={`/country/${country.Code}`}>
        <div className="p-2 m-2 border rounded transition-colors duration-200 hover:bg-gray-200 hover:border-gray-400 cursor-pointer">
          {country.Name}
        </div>
          </Link>
        ))}
      </div>
      
    </div>
  );
}
