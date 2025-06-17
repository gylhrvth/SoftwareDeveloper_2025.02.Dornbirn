import { PrismaClient } from "../../generated/prisma";
import { redirect } from "next/navigation";

const prisma = new PrismaClient()  

export default async function Home({ searchParams }: { searchParams?: { search?: string } }) {
  const searchCriteria = searchParams?.search;

  const countries = await prisma.country.findMany(
    searchCriteria
      ? {
          where: {
            Name: {
              contains: searchCriteria,
            },
            mode: "insensitive",
          },
          orderBy: {
            Population: "asc",
          },
        }
      : {
          orderBy: {
            Population: "asc",
          },
        }
  );

  return (
    <div className="min-h-screen bg-green-900 text-gray-100 flex flex-col items-center py-8">
      <h1 className="text-4xl text-center font-bold mb-8">
        Country List
      </h1>
      <form
        className="mb-6 w-full max-w-xl"
        method="GET"
      >
        <input
          type="text"
          name="search"
          placeholder="Search countries..."
          className="w-full px-4 py-2 rounded border border-green-700 bg-green-950 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          defaultValue={searchCriteria || ""}
        />
      </form>
      <ul className="w-full max-w-xl space-y-2">
        {countries.map((country) => (
          <li
            key={country.Code}
            className="bg-green-800 rounded px-4 py-2 shadow text-gray-100"
          >
            {country.Name} ({country.Capital})
          </li>
        ))}
      </ul>
    </div>
  );
}
