import React, { useState, useEffect } from 'react';
import logoOsmo from "../assets/images/logo-osmo-neu.png"

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="wrapper osmo">
      <a href="#top" className="backtotop" title="nach oben scrollen" />
      {/* HEADER START */}
      <header
        className={`
          fixed top-0 left-0 right-0 bg-white z-50
          transition-all duration-300 ease-in-out shadow-md
          ${scrolled ? 'h-20' : 'h-36'}
        `} // Here we can set the height scrolled down : base 
      >
      
        <nav className="navbar navbar-expand-xl container mx-auto flex items-center h-full px-6">
          <button
            className="navbar-toggler border-0 xl:hidden"
            type="button"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <ul id="append_paste" className="mr-auto hidden xl:flex">
            {/* Platzhalter Suche */}
          </ul>

          <div
            className="navbar-collapse offcanvas-collapse flex-grow xl:flex xl:items-center"
            id="navbarsExampleDefault"
          >
            <div className="row flex flex-wrap w-full">
              <ul className="navbar-top flex flex-row col items-center space-x-4 flex-grow">
                <li className="mr-auto">
                  {/* LANGNAV START */}
                  <div className="sprachwahl dropdown relative">
                    <button
                      className="dropdown-toggle bg-transparent font-semibold"
                      type="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      DE / <strong>DE</strong>
                    </button>
                  </div>
                  {/* LANGNAV END */}
                </li>

                {/* TOPNAV START */}
                <li>
                  <a
                    href="/konfiguratoren"
                    title="Konfiguratoren"
                    className="flex items-center hover:text-gray-700"
                  >
                    <i className="fas fa-sliders-h konfiguratoren mr-1"></i>
                    <span>Konfiguratoren</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/service/farbmusterbestellung"
                    title="Farbmusterbestellung"
                    className="flex items-center hover:text-gray-700"
                  >
                    <i className="fas fa-palette mr-1"></i>
                    <span>Farbmusterbestellung</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/service/verbrauchsrechner"
                    title="Verbrauchsrechner"
                    className="flex items-center hover:text-gray-700"
                  >
                    <i className="fas fa-calculator mr-1"></i>
                    <span>Verbrauchsrechner</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/mediathek"
                    title="Mediathek"
                    className="flex items-center hover:text-gray-700"
                  >
                    <i className="fas fa-copy mr-1"></i>
                    <span>Mediathek</span>
                  </a>
                </li>
                {/* TOPNAV END */}
              </ul>

              <div className="w-full" />

              {/* MAINNAV START */}
              <div className="navbar-wrapper">
                <ul className="navbar-nav flex space-x-6">
                  <li className="nav-item dropdown">
                    <a
                      href="/holz"
                      title="Holz"
                      className="nav-link dropdown-toggle uppercase font-semibold hover:text-gray-700"
                    >
                      Holz
                    </a>
                  </li>
                </ul>
              </div>
              {/* MAINNAV END */}
            </div>
          </div>

          <a
            className="flex items-center justify-center ml-6"
            href="/"
            aria-label="Home"
          >
            <img
              src={logoOsmo}
              className={`transition-all duration-300 ease-in-out ${
                scrolled ? 'h-8' : 'h-12'
              }`}
              alt="Logo Osmo"
            />
            <img
              src="/fileadmin/template/website/img/logo-osmo-scrolled-neu.png"
              className={`hidden transition-all duration-300 ease-in-out ${
                scrolled ? 'block h-8' : 'h-12'
              }`}
              alt="Logo Osmo Scrolled"
            />
          </a>
        </nav>
      </header>
      {/* HEADER END */}
    </div>
  );
}

export default Header;
