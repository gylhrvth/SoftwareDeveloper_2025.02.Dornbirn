import { PrismaClient } from "../../generated/prisma"

const prisma = new PrismaClient();

export default async function LanguagesPage() {
    const lang = await prisma.language.findMany({
        where: {
            Name: {
                contains: "English", // Example filter, you can change this
            }
        },
        include: {
            CountryRef: true, // Include related countries
        },
    });

    if (!lang || lang.length === 0) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="text-red-400 text-xl font-semibold">Error: no English-speaking countries found...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <h1 className="text-3xl font-bold mb-10 text-center text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-violet-500">
                    English-Speaking Countries
                </span>
            </h1>
            
            <div className="flex flex-wrap gap-6 justify-center max-w-7xl mx-auto">
                {lang.map((language, index) => (
                    <div 
                        key={index}
                        className="rounded-lg overflow-hidden w-full sm:w-64 flex flex-col bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 hover:shadow-[0_0_15px_rgba(79,209,197,0.3)] transition-all duration-300 border border-gray-700"
                    >
                        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                            <h2 className="font-semibold text-xl text-white truncate">{language.CountryRef.Name}</h2>
                            <span className="bg-gradient-to-r from-teal-900 to-violet-900 rounded-full px-3 py-1 text-sm font-medium text-teal-300 ml-2 flex-shrink-0">
                                {language.CountryRef.Code || 'N/A'}
                            </span>
                        </div>
                        
                        <div className="p-3 flex justify-end bg-black bg-opacity-20">
                            <button className="text-violet-400 hover:text-teal-300 text-sm font-medium transition-colors duration-300 cursor-pointer">
                                Explore
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}