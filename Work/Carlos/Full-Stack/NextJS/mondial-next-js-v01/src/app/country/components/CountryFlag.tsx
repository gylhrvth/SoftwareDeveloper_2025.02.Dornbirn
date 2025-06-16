// app/country/CountryFlag.tsx
import { countryCodeMap } from '../utils/countryCodeMap';

type CountryFlagProps = {
  countryCode: string;
  countryName: string;
};

export default function CountryFlag({ countryCode, countryName }: CountryFlagProps) {
  if (!countryCode) return null;
  
  return (
    <>
      {countryCodeMap[countryCode] ? (
        <img
          src={`https://flagcdn.com/32x24/${countryCodeMap[countryCode]}.png`}
          width="32"
          height="24"
          alt={`${countryName} flag`}
          className="mr-2"
        />
      ) : (
        <span className="w-8 h-6 mr-2 bg-gray-700 text-white text-xs font-bold rounded flex items-center justify-center">
          🏳️
        </span>
      )}
    </>
  );
}