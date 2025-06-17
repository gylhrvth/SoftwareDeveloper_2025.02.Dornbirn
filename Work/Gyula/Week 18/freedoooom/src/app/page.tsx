import Link from "next/link";
import { PrismaClient } from "../../generated/prisma";


const prisma = new PrismaClient()

export default async function Home() {
  const countries = await prisma.country.findMany();
  //console.log(countries);

  return (
    <div>
      <h1>Hello World!</h1>
      <div className="flex flex-wrap">
        {countries.map((country) => (
          <Link key={country.Code} href={`/country/${country.Code}`}>
            <div className="p-2 m-2 border rounded w-72">
              {country.Name}
            </div>
          </Link> 
        ))}
      </div>
    </div>
  );
}
