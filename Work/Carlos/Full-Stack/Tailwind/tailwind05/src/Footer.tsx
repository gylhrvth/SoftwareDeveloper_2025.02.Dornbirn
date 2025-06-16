import { FaPhone, FaFax, FaEnvelope, FaYoutube, FaXing, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-800 pt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 pb-8">
          {/* Left: Logo & Address */}
          <div className="lg:w-2/5 flex flex-col gap-4">
            <div>
              {/* Use logo-osmo.png from public folder as fallback */}
              <img
                src="/logo-osmo.png"
                alt="Osmo Holz und Farbe"
                className="h-24 mb-2"
              />
            </div>
            <address className="not-italic text-sm leading-relaxed">
              <strong>Osmo Holz und Color GmbH &amp; Co. KG</strong>
              <br />
              Affhüppen Esch 12, D-48231 Warendorf
              <br />
              Postfach 110161, D-48203&nbsp;Warendorf
            </address>
            <div className="flex flex-col gap-1 text-sm">
              <a
                href="tel:+492581922100"
                className="flex items-center gap-3 hover:underline text-3xl"
              >
                <FaPhone className="text-green-600 text-4xl" />
                +49&nbsp;(0)2581/ <span className="whitespace-nowrap">922-100</span>
              </a>
              <span className="flex items-center gap-2">
                <FaFax className="text-green-600" /> +49 (0)2581/ 922-200
              </span>
              <a href="/osmo/kontakt" className="flex items-center gap-2 hover:underline">
                <FaEnvelope className="text-green-600" /> Schreiben Sie uns!
              </a>
            </div>
            <div className="flex gap-4 mt-4 text-4xl">
              <a href="https://www.youtube.com/user/osmotv" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://www.xing.com/pages/osmoholzundcolorgmbh-co-kg" target="_blank" rel="noopener noreferrer" aria-label="Xing"><FaXing /></a>
              <a href="https://de.linkedin.com/company/osmo-holz-und-color-gmbh-&-co-kg" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://www.facebook.com/Osmo.de/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://www.instagram.com/osmoholzundcolor/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
          {/* Right: Sitemap */}
          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <FooterColumn
              sections={[
                {
                  title: "Osmo Holz",
                  links: [
                    { href: "", label: "Holz für Innen" },
                    { href: "", label: "Holz für Aussen" },
                  ],
                },
                {
                  title: "Osmo Farbe",
                  links: [
                    { href: "", label: "Farbe für Innen" },
                    { href: "", label: "Farbe für Aussen" },
                    { href: "", label: "Zubehör & Werkzeuge" },
                    { href: "", label: "Für die Industrie" },
                  ],
                },
                {
                  title: "Neue Werkstoffe",
                  links: [
                    { href: "", label: "BPC" },
                    { href: "", label: "Aluminium" },
                  ],
                },
              ]}
            />
            <FooterColumn
              sections={[
                {
                  title: "Technische Infos",
                  links: [
                    { href: "", label: "Montageanleitungen" },
                    { href: "", label: "Produktinformationen" },
                    { href: "", label: "Sicherheitsdatenblätter" },
                    { href: "", label: "Anwendungsvideos" },
                    { href: "", label: "Bestellformulare Tore" },
                  ],
                },
                {
                  title: "Tools",
                  links: [
                    { href: "", label: "Verbrauchsrechner" },
                    { href: "", label: "Farbmusterbestellung" },
                  ],
                },
                {
                  title: "Service",
                  links: [
                    { href: "", label: "Ausschreibungstexte" },
                    { href: "", label: "FAQs" },
                    { href: "", label: "Händlersuche" },
                    { href: "", label: "Kataloge" },
                  ],
                },
              ]}
            />
            <FooterColumn
              sections={[
                {
                  title: "Ideengeber",
                  links: [
                    { href: "", label: "Für Selbermacher" },
                    { href: "", label: "Pflegetipps" },
                    { href: "", label: "Profi-Tipps" },
                  ],
                },
                {
                  title: "Osmo",
                  links: [
                    { href: "", label: "Unternehmen" },
                    { href: "", label: "Nachhaltigkeit" },
                    { href: "", label: "News" },
                    { href: "", label: "Karriere" },
                    { href: "", label: "Ausbildung" },
                    { href: "", label: "Kontaktformular" },
                  ],
                },
              ]}
            />
          </div>
        </div>

        </div>
                {/* Footer navigation */}
        <div className="flex flex-col md:flex-row justify-around items-center py-8 px-4 text-l bg-neutral-500 text-gray-200 gap-2">
          <div>© {new Date().getFullYear()} Osmo Holz und Color GmbH &amp; Co. KG</div>
          <div className="flex gap-4">
            <a href="" className="hover:underline">Meldekanal</a>
            <a href="" className="hover:underline">Datenschutz</a>
            <a href="" className="hover:underline">AGB</a>
            <a href="" className="hover:underline">Impressum</a>
            <a href="" className="hover:underline">Cookie-Einstellungen</a>
          </div>
      </div>
      
    </footer>
  );
}

function FooterColumn({ sections }: { sections: { title: string; links: { href: string; label: string }[] }[] }) {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section, idx) => (
        <div key={idx}>
          <div className="uppercase font-bold text-base mb-2">{section.title}</div>
          <ul className="space-y-1">
            {section.links.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="hover:underline">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Footer;