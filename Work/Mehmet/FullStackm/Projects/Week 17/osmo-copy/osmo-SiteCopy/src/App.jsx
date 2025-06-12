import { useState } from "react";
import './index.css';

export default function App() {
  return (
    <div className="wrapper osmo min-h-screen bg-bg text-text">
      <a href="#top" className="backtotop" title="nach oben scrollen"></a>

      <header>
        <nav className="fixed top-0 w-full bg-primary text-white shadow-md z-50">
          <div className="container mx-auto flex items-center justify-between p-4">
            <button
              className="border-0 p-2 focus:outline-none"
              type="button"
              onClick={() => alert('Hamburger Menü toggle')}
            >
              <i className="fas fa-bars"></i>
            </button>

            <ul id="append_paste" className="mr-auto"></ul>

            <div className="navbar-collapse flex items-center">
              <ul className="navbar-top flex items-center space-x-4">
                <li>
                  <LanguageDropdown />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}



function LanguageDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-primary hover:bg-hover focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open ? "true" : "false"}
        type="button"
      >
        DE / <strong>DE</strong>
        <svg
          className="ml-2 -mr-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <li>
            <a
              href="/"
              target="_blank"
              className="block px-4 py-2 text-sm text-blue-600 font-semibold"
              rel="noreferrer"
            >
              Deutschland - DE
            </a>
          </li>
          <li>
            <a
              href="/en/"
              target="_blank"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
              rel="noreferrer"
            >
              Germany - EN
            </a>
          </li>
          {/* Weitere Länder hier */}
        </ul>
      )}
    </div>
  );
}

