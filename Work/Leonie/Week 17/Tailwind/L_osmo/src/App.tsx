//import { useState } from 'react'
import './App.css'

export default function App() {

  return (
    <>
        <header className="p-4">
            <div>
                <nav className="container mx-auto bg-gray-100 p-4 flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <p>DE / DE</p>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                        <p>Konfigurator</p>
                        <p>Farbmusterbestellung</p>
                        <p>Verbrauchsrechner</p>
                        <p>Mediathek</p>
                    </div>
                </nav>
                <nav className="flex items-center justify-between bg-blue-800 p-4">
                    <div className="text-white font-bold">Logo</div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-white hover:text-blue-200">Home</a>
                        <a href="#" className="text-white hover:text-blue-200">Menu</a>
                        <a href="#" className="text-white hover:text-blue-200">News</a>
                    </div>
                </nav>
            </div>
        </header>
        <main>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Willkommen bei L_osmo</h1>
                <p className="mb-4">Hier finden Sie alle Informationen zu unseren Produkten und Dienstleistungen.</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Jetzt starten</button>
            </div>
            <div className="container mx-auto p-4">
                <h2 className="text-xl font-bold mb-4">Neuigkeiten</h2>
                <ul className="list-disc pl-5">
                    <li>Neues Produkt im Angebot</li>
                    <li>Aktuelle Angebote und Rabatte</li>
                    <li>Veranstaltungen und Messen</li>
                </ul>
            </div>
        </main>
        <footer className="bg-gray-200 p-4">
            <div className="container mx-auto text-center">
                <p>&copy; 2025 L_osmo. Alle Rechte vorbehalten.</p>
                <p>Impressum | Datenschutz</p>
            </div>
        </footer>
    </>
  )
}
