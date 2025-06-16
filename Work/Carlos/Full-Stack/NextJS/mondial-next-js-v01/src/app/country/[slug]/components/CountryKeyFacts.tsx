// app/country/[slug]/CountryKeyFacts.tsx
import { type Country } from '@/lib/db';

type KeyFactItemProps = {
  label: string;
  value: string | number | null | undefined;
};

// Define KeyFactItem first so it's available to use later
function KeyFactItem({ label, value }: KeyFactItemProps) {
  return (
    <div className="flex items-center">
      <span className="text-gray-400 w-24">{label}:</span>
      <span className="text-white font-medium">{value || 'N/A'}</span>
    </div>
  );
}

type CountryKeyFactsProps = {
  country: Country;
};

export default function CountryKeyFacts({ country }: CountryKeyFactsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-emerald-300 border-b border-emerald-700 pb-2">Key Facts</h2>
      
      <div className="space-y-3">
        <KeyFactItem label="Capital" value={country.Capital} />
        <KeyFactItem label="Population" value={country.Population?.toLocaleString()} />
        <KeyFactItem label="Area" value={`${country.Area?.toLocaleString() || 'N/A'} km²`} />
        
        {country.Province && (
          <KeyFactItem label="Province" value={country.Province} />
        )}
      </div>
    </div>
  );
}