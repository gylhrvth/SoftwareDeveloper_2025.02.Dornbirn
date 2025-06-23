import { PrismaClient } from '../../../src/generated/prisma/client'
import Link from 'next/link'
// Initialize Prisma Client
const prisma = new PrismaClient()

async function getCountries() {
  const countries = await prisma.country.findMany({
    select: {
      Name: true,
      Code: true
    },
  })
  return countries
}

export default async function Home() {
  const countries = await getCountries()
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-violet-500">
          Countries from Mondial Database
        </h1>
        <h3 className="text-2xl md:text-2xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-violet-500">
            (With Prisma ORM)
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {countries.map((country) => (
            <div 
              key={country.Code}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-teal-500 shadow-lg hover:shadow-teal-500/20 transition-all duration-300 group"
            >
                <div className="p-5">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors duration-300">
                        {country.Name}
                        </h2>
                        <span className="bg-gradient-to-r from-teal-900 to-violet-900 rounded-full px-3 py-1 text-sm font-medium text-teal-300 ml-2 flex-shrink-0">
                        {country.Code || 'N/A'}
                        </span>
                    </div>
                    <div className="mt-3 flex justify-start">
                        <Link href={`/countries/${encodeURIComponent(country.Name)}`} className="text-violet-400 hover:text-teal-300 text-sm font-medium transition-colors duration-300 flex items-center gap-2 cursor-pointer">
                        Details
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        </Link>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}