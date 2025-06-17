// app/country/[slug]/edit/page.tsx
import { FaTrashAlt } from "react-icons/fa";  // Import trash icon
import { getAllCountries, getCountryLanguages, getCountryReligions } from '@/lib/db';
import { notFound } from 'next/navigation';
import { 
  addLanguage, 
  addReligion, 
  removeLanguage, 
  removeReligion,
  updateLanguage,
  updateReligion 
} from './actions';

import BackButton from '../components/BackButton';
import EditableItem from './EditableItem';

export default async function EditCountry({ params }: { params: { slug: string } }) {
  
  const actualParams = await params; // Ensure params are resolved
  const slug = actualParams.slug;
  const countryName = decodeURIComponent(slug);

  const countries = await getAllCountries();
  const country = countries.find(c => c.Name === countryName);
  
  if (!country) return notFound();
  
  // Fetch existing languages and religions
  const languages = await getCountryLanguages(country.Code);
  const religions = await getCountryReligions(country.Code);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Edit {country.Name}</h1>
        
        {/* Languages Section */}
        <div className="max-w-2xl mx-auto">
          {/* Current Languages with Delete Buttons */}
      <div className="bg-neutral-800 rounded-lg shadow-xl overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-emerald-300 border-b border-emerald-700 pb-2 mb-4">
            Current Languages
          </h2>
          
          {languages.length > 0 ? (
            <ul className="space-y-3">
              {languages.map((lang, index) => (
                <EditableItem
                  key={index}
                  name={lang.name}
                  percentage={lang.percentage}
                  countryCode={country.Code}
                  countryName={country.Name}
                  onDelete={removeLanguage}
                  onUpdate={updateLanguage}
                  itemType="language"
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">No languages recorded</p>
          )}
        </div>
          </div>
          
          {/* Add New Language Form */}
          <div className="bg-neutral-800 rounded-lg shadow-xl overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-emerald-300 border-b border-emerald-700 pb-2 mb-4">
                Add New Language
              </h2>
              
              <form action={addLanguage} className="space-y-4">
                <input type="hidden" name="countryCode" value={country.Code} />
                <input type="hidden" name="countryName" value={country.Name} />
                
                <div>
                  <label htmlFor="languageName" className="block text-gray-300 mb-2">Language Name</label>
                  <input 
                    type="text" 
                    id="languageName" 
                    name="languageName" 
                    required
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="languagePercentage" className="block text-gray-300 mb-2">Percentage (%)</label>
                  <input 
                    type="number" 
                    id="languagePercentage" 
                    name="languagePercentage" 
                    min="0.1" 
                    max="100" 
                    step="0.1" 
                    required
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-2 bg-emerald-600 text-white font-medium rounded hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Add Language
                </button>
              </form>
            </div>
          </div>
          
          {/* Religions Section */}
          {/* Current Religions with Delete Buttons */}
                <div className="bg-neutral-800 rounded-lg shadow-xl overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-emerald-300 border-b border-emerald-700 pb-2 mb-4">
            Current Religions
          </h2>
          
          {religions.length > 0 ? (
            <ul className="space-y-3">
              {religions.map((religion, index) => (
                <EditableItem
                  key={index}
                  name={religion.name}
                  percentage={religion.percentage}
                  countryCode={country.Code}
                  countryName={country.Name}
                  onDelete={removeReligion}
                  onUpdate={updateReligion}
                  itemType="religion"
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 italic">No religions recorded</p>
          )}
        </div>
      </div>
          
          {/* Add New Religion Form */}
          <div className="bg-neutral-800 rounded-lg shadow-xl overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-emerald-300 border-b border-emerald-700 pb-2 mb-4">
                Add New Religion
              </h2>
              
              <form action={addReligion} className="space-y-4">
                <input type="hidden" name="countryCode" value={country.Code} />
                <input type="hidden" name="countryName" value={country.Name} />
                
                <div>
                  <label htmlFor="religionName" className="block text-gray-300 mb-2">Religion Name</label>
                  <input 
                    type="text" 
                    id="religionName" 
                    name="religionName" 
                    required
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="religionPercentage" className="block text-gray-300 mb-2">Percentage (%)</label>
                  <input 
                    type="number" 
                    id="religionPercentage" 
                    name="religionPercentage" 
                    min="0.1" 
                    max="100" 
                    step="0.1" 
                    required
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-2 bg-emerald-600 text-white font-medium rounded hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Add Religion
                </button>
              </form>
            </div>
          </div>
          
          {/* Back Button */}
          <div className="flex justify-center">
            <BackButton href={`/country/${country.Name}`} label="← Back to Country Details" />
          </div>
        </div>
      </div>
    </div>
  );
}