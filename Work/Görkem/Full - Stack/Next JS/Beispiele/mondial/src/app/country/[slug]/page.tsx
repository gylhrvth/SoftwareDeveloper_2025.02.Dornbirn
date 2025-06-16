import { getCountryByCode } from '@/lib/db';
import { Globe } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
    slug: string;
}

export default async function CountryDetailPage({ params }: { params: PageProps }) {
  const Code = (await params).slug;
  const country = await getCountryByCode(Code);

  if (!country) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <p className="text-red-600 text-lg mb-4">
          Land mit Code <strong>{Code}</strong> wurde nicht gefunden.
        </p>
        <Link
          href="/country"
          className="text-blue-600 hover:underline transition"
        >
          Zurück zur Länderübersicht
        </Link>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        <header className="flex items-center gap-3 mb-8">
          <Globe className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-extrabold">{country.Name}</h1>
        </header>

        <section className="space-y-6 text-gray-700 text-lg">
          <p>
            <span className="font-semibold">🌇 Hauptstadt:</span> {country.Capital || '—'}
          </p>
          <p>
            <span className="font-semibold">📍 Provinz:</span> {country.Province || '—'}
          </p>
          <p>
            <span className="font-semibold">👥 Bevölkerung:</span> {country.Population.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">🌍 Fläche:</span> {country.Area.toLocaleString()} km²
          </p>
          <p>
            <span className="font-semibold">🆔 Code:</span> {country.Code}
          </p>
        </section>

        <footer className="mt-10 text-center">
          <Link
            href="/country"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Zurück zur Länderübersicht
          </Link>
        </footer>
      </div>
    </main>
  );
}
