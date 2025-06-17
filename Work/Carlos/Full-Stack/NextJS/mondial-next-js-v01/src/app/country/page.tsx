// app/country/page.tsx
import { getAllCountries } from '@/lib/db';
import { type Country } from '@/lib/db';
import SearchBar from './components/SearchBar';
import CountryCard from './components/CountryCard';

export default async function CountryPage({ 
  searchParams 
}: { 
  searchParams: { q?: string } 
}) {
  // Get search query from URL
  const searchQuery = searchParams.q || '';
  
  // Fetch all countries
  const countries: Country[] = await getAllCountries();
  
  // Filter countries based on search query
  const filteredCountries = searchQuery 
    ? countries.filter(country => 
        country.Name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : countries;
  
  // Sort filtered countries
  const sortedCountries = [...filteredCountries].sort((a, b) => 
    a.Name.localeCompare(b.Name)
  );

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      <h1 className="text-4xl font-bold text-center p-8 text-white">Countries</h1>
      
      {/* Search Bar */}
      <SearchBar />
      
      {/* Search Results Information */}
      <div className="container mx-auto px-4 mb-6">
        {searchQuery && (
          <p className="text-center text-gray-300">
            Found {sortedCountries.length} countries matching "{searchQuery}"
          </p>
        )}
        
        {searchQuery && sortedCountries.length === 0 && (
          <div className="text-center my-12">
            <p className="text-xl text-gray-400">No countries found matching "{searchQuery}"</p>
            <p className="mt-2 text-gray-500">Try a different search term</p>
          </div>
        )}
      </div>
      
      {/* Country Cards */}
      <div className="flex gap-8 flex-wrap justify-center px-4 pb-8">
        {sortedCountries.map((country, index) => (
          <CountryCard key={index} country={country} />
        ))}
      </div>
    </div>
  );
}