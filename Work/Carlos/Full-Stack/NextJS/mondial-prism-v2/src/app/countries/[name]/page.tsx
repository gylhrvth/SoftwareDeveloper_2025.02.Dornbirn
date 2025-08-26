import { country, PrismaClient } from '../../../generated/prisma/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()


export default async function CountryDetails({
  params,
}: {
  params: { name: string }
}) {
  const { name } = await params;
  const country = await prisma.country.findFirst({
    where:{
      Name: {
        equals: decodeURIComponent(name),
      },
    },
    select: {
      Name: true,
      Capital: true,
      Population: true,
      Area: true,
    },
  });
  
  if (!country) {
    return (
    <div>There is no country { name }</div>
    )
  }
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 py-10 px-4">
      <section className="w-full max-w-2xl bg-white/5 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-blue-400 mb-6 text-center">
          {country.Name}
        </h1>
        <dl className="divide-y divide-gray-700">
          <div className="flex justify-between py-3">
            <dt className="text-gray-300 font-medium">Capital</dt>
            <dd className="text-gray-100">{country.Capital || 'N/A'}</dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-gray-300 font-medium">Population</dt>
            <dd className="text-gray-100">
              {country.Population?.toLocaleString() || 'N/A'}
            </dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-gray-300 font-medium">Area</dt>
            <dd className="text-gray-100">
              {country.Area?.toLocaleString() || 'N/A'} km²
            </dd>
          </div>
        </dl>
        <div className="mt-8 flex justify-center">
          <Link
            href="/countries"
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
          >
            ← Back to Countries
          </Link>
        </div>
      </section>
    </main>
  )
}