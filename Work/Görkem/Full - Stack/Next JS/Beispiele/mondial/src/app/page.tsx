import Link from 'next/link';

export default function Home() {
  return (
   <main className="p-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-extrabold mb-4 text-center">Mondial Startseite</h1>
        <p className="text-gray-600 text-lg mb-6">Willkommen!</p>
        <Link href="/country" className="text-blue-500 underline text-lg hover:text-blue-700 transition">
          Zu den Ländern
        </Link>
      </div>
   </main>
  );
}
