// app/country/[slug]/page.tsx
import { getAllCountries, getCountryLanguages, getCountryReligions } from '@/lib/db';
import { type Country } from '@/lib/db';
import { notFound } from 'next/navigation';
import CountryHeader from './components/CountryHeader';
import CountryKeyFacts from './components/CountryKeyFacts';
import CountryMisc from './components/CountryMisc';
import BackButton from './components/BackButton';
import EditButton from './components/EditButton';

export default async function CountryDetails({ params }: { params: { slug: string } }) {
  // Decode the URL parameter
  const slug = (await params).slug;
  const countryName = decodeURIComponent(slug);

  // Fetch country data
  const countries: Country[] = await getAllCountries();
  const country = countries.find(c => c.Name === countryName);

  if (!country) {
    return notFound();
  }

  // Fetch languages for this country
  const languages = await getCountryLanguages(country.Code);  // <-- Add this line
// Fetch religions for this country
  const religions = await getCountryReligions(country.Code);  // <-- Add this line
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center">
        {/* Header */}
        <CountryHeader country={country} />
        
        {/* Country Card */}
        <div className="max-w-2xl mx-auto bg-neutral-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Key Facts */}
              <CountryKeyFacts country={country} />
              
              {/* Misc */}
               <CountryMisc country={country} languages={languages} religions={religions}/>  {/* <-- Pass languages here */}
            </div>
          </div>
        </div>
        {/* Back Button */}
        <div className ="flex justify-center mt-8 gap-8">
        <BackButton href="/country" label="← Back to Countries" />
        <EditButton country={country} />
        </div>
      </div>
    </div>
  );
}