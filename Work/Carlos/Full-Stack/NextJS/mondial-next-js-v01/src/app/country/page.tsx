// app/country/page.tsx
import { getAllCountries } from '@/lib/db';
import { type Country } from '@/lib/db';
import CountryCard from './components/CountryCard';

export default async function CountryPage() {
  // Fetch and sort countries
  const countries: Country[] = await getAllCountries();
  const sortedCountries = [...countries].sort((a, b) => 
    a.Name.localeCompare(b.Name)
  );

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
      <header>
        <h1 className="text-4xl font-bold text-center p-8 text-white">Countries</h1>
      </header>
      
      <main>
        <div className="flex gap-8 flex-wrap justify-center px-4 pb-8">
          {sortedCountries.map((country, index) => (
            <CountryCard key={index} country={country} />
          ))}
        </div>
      </main>
      
      <footer className="text-center text-gray-400 p-4">
        <p>This is the country page content.</p>
      </footer>
    </div>
  );
}