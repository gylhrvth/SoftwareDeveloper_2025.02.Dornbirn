import React from 'react';
import logoOsmo from "../assets/images/logo-osmo-neu.png";

function Footer() {
return (
    <footer className="bg-gray-100 text-gray-800 text-xs">

        {/* FOOTERSITEMAP */}
        <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col lg:flex-row lg:items-start">
                {/* Address & Contact */}
                <div className="lg:w-5/12 w-full mb-6 lg:mb-0 space-y-3">
                    <address className="not-italic space-y-1">
                        {/* Logo above address */}
                        <img src={logoOsmo} alt="Osmo Holz und Farbe" className="h-8 block mb-2" />
                        <p>
                            <strong className="block text-sm">Osmo Holz und Color GmbH &amp; Co. KG</strong>
                            Affhüppen Esch 12, D‑48231 Warendorf<br />
                            Postfach 110161, D‑48203 Warendorf
                        </p>
                    </address>
                    <div className="flex flex-col space-y-1">
                        <a href="tel:+492581922100" className="flex items-center hover:text-blue-600">
                            <i className="fas fa-phone fa-flip-horizontal mr-2"></i>
                            +49 (0)2581/922‑100
                        </a>
                        <a className="flex items-center hover:text-blue-600">
                            <i className="fas fa-fax mr-2"></i>
                            +49 (0)2581/922‑200
                        </a>
                        <a href="/osmo/kontakt" className="flex items-center hover:text-blue-600">
                            <i className="fas fa-envelope mr-2"></i>
                            Schreiben Sie uns!
                        </a>
                    </div>
                    <div className="flex space-x-3 mt-4 text-base">
                        <a href="https://www.youtube.com/user/osmotv" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
                            <i className="fab fa-youtube"></i>
                        </a>
                        <a href="https://www.xing.com/pages/osmoholzundcolorgmbh-co-kg" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
                            <i className="fab fa-xing"></i>
                        </a>
                        <a href="https://de.linkedin.com/company/osmo-holz-und-color-gmbh-&-co-kg" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://www.facebook.com/Osmo.de/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.instagram.com/osmoholzundcolor/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

                {/* Sitemap columns */}
                <div className="lg:w-7/12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Column 1 */}
                    <div>
                        <h3 className="uppercase font-semibold mb-1 text-base"><a href="/holz">Osmo Holz</a></h3>
                        <ul className="space-y-1 mb-4">
                            <li><a href="/holz/holz-innen" className="hover:text-blue-600">Holz für Innen</a></li>
                            <li><a href="/holz/holz-fuer-den-aussenbereich" className="hover:text-blue-600">Holz für Aussen</a></li>
                        </ul>
                        <h3 className="uppercase font-semibold mb-1 text-base"><a href="/farbe">Osmo Farbe</a></h3>
                        <ul className="space-y-1 mb-4">
                            <li><a href="/farbe/farbe-fuer-den-innenbereich" className="hover:text-blue-600">Farbe für Innen</a></li>
                            <li><a href="/farbe/farbe-fuer-den-aussenbereich" className="hover:text-blue-600">Farbe für Aussen</a></li>
                            <li><a href="/farbe/zubehoer" className="hover:text-blue-600">Zubehör &amp; Werkzeuge</a></li>
                            <li><a href="/farbe/industrielle-holzbeschichtungen" className="hover:text-blue-600">Für die Industrie</a></li>
                        </ul>
                        <h3 className="uppercase font-semibold mb-1 text-base"><a href="#">Neue Werkstoffe</a></h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:text-blue-600">BPC</a></li>
                            <li><a href="#" className="hover:text-blue-600">Aluminium</a></li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="uppercase font-semibold mb-1 text-base"><a href="/mediathek">Technische Infos</a></h3>
                        <ul className="space-y-1 mb-4">
                            <li><a href="/mediathek/montageanleitungen" className="hover:text-blue-600">Montageanleitungen</a></li>
                            <li><a href="/mediathek/produktinformationen" className="hover:text-blue-600">Produktinformationen</a></li>
                            <li><a href="/mediathek/sicherheitsdatenblaetter" className="hover:text-blue-600">Sicherheitsdatenblätter</a></li>
                            <li><a href="/mediathek/videos" className="hover:text-blue-600">Anwendungsvideos</a></li>
                            <li><a href="/mediathek/bestellformulare" className="hover:text-blue-600">Bestellformulare Tore</a></li>
                        </ul>
                        <h3 className="uppercase font-semibold mb-1 text-base"><a href="/service">Tools</a></h3>
                        <ul className="space-y-1 mb-4">
                            <li><a href="/service/verbrauchsrechner" className="hover:text-blue-600">Verbrauchsrechner</a></li>
                            <li><a href="/service/farbmusterbestellung" className="hover:text-blue-600">Farbmusterbestellung</a></li>
                        </ul>
                        <h3 className="uppercase font-semibold mb-1 text-base"><a href="/service">Service</a></h3>
                        <ul className="space-y-1">
                            <li><a href="#" className="hover:text-blue-600">Ausschreibungstexte</a></li>
                            <li><a href="/service/faqs" className="hover:text-blue-600">FAQs</a></li>
                            <li><a href="/haendlersuche" className="hover:text-blue-600">Händlersuche</a></li>
                            <li><a href="/service/kataloge" className="hover:text-blue-600">Kataloge</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="uppercase font-semibold mb-1 text-base"><a href="/ideengeber">Ideengeber</a></h3>
                        <ul className="space-y-1 mb-4">
                            <li><a href="#" className="hover:text-blue-600">Für Selbermacher</a></li>
                            <li><a href="/ideengeber/pflegetipps" className="hover:text-blue-600">Pflegetipps</a></li>
                            <li><a href="/ideengeber/profi-tipps" className="hover:text-blue-600">Profi-Tipps</a></li>
                        </ul>
                        <h3 className="uppercase font-semibold mb-1 text-base"><a href="/osmo">Osmo</a></h3>
                        <ul className="space-y-1">
                            <li><a href="/osmo/unternehmen" className="hover:text-blue-600">Unternehmen</a></li>
                            <li><a href="/osmo/zertifikate-nachhaltigkeit" className="hover:text-blue-600">Nachhaltigkeit</a></li>
                            <li><a href="/osmo/news" className="hover:text-blue-600">News</a></li>
                            <li><a href="/osmo/karriere" className="hover:text-blue-600">Karriere</a></li>
                            <li><a href="/osmo/ausbildung" className="hover:text-blue-600">Ausbildung</a></li>
                            <li><a href="/osmo/kontakt" className="hover:text-blue-600">Kontaktformular</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* FOOTERNAVIGATION */}
        <div className="bg-gray-200 py-3 text-xxs">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
                <div className="md:mr-auto mb-2 md:mb-0">© 2025 Osmo Holz und Color GmbH & Co. KG</div>
                <div className="flex space-x-3 text-xs">
                    <a
                        href="https://prod.osapiens.cloud/…/complaint/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        Meldekanal
                    </a>
                    <a href="/datenschutz" className="hover:underline">Datenschutz</a>
                    <a href="/agb" className="hover:underline">AGB</a>
                    <a href="/impressum" className="hover:underline">Impressum</a>
                    <button onClick={() => window.Cookiebot?.renew?.()} className="hover:underline">
                        Cookie‑Einstellungen
                    </button>
                </div>
            </div>
        </div>
    </footer>
);
}

export default Footer;
