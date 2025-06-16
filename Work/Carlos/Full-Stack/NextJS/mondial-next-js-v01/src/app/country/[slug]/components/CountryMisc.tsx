import { Religion } from '@/lib/db';
import { Language } from '@/lib/db';



type CountryMiscProps = {
  country: {
    Name: string;
    Code: string;
  };
  languages?: Language[];
  religions?: Religion[];
};

export default function CountryMisc({ country, languages = [], religions = [] }: CountryMiscProps) {
  // Format languages into a readable string
  const languagesText = languages.length > 0
    ? languages
        .map(lang => `${lang.name} (${lang.percentage}%)`)
        .join(', ')
    : 'No language data available';

    // Format religions into a readable string
    const religionsText = religions.length > 0
    ? religions
        .map(religion => `${religion.name} (${religion.percentage}%)`)
        .join(', ')
    : 'No religion data available';

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-emerald-300 border-b border-emerald-700 pb-2">Misc</h2>
      <p className="text-gray-300">
        <strong>Languages spoken:</strong> {languagesText}
        <br /><br />
        <strong>Religion:</strong> {religionsText}
      </p>
    </div>
  );
}