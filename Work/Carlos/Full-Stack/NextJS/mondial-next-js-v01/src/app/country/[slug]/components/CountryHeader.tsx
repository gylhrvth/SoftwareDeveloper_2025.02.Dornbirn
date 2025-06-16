// app/country/[slug]/CountryHeader.tsx
import CountryFlag from '../components/CountryFlag';
import { type Country } from '@/lib/db';

type CountryHeaderProps = {
  country: Country;
};

export default function CountryHeader({ country }: CountryHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="flex items-center justify-center text-5xl font-bold text-white mb-2">
        <CountryFlag 
          countryCode={country.Code} 
          countryName={country.Name} 
        />
        <span>{country.Name}</span>
      </h1>
      <p className="text-emerald-400 text-xl">[{country.Code}]</p>
    </div>
  );
}