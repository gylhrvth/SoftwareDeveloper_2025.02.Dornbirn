import { useState, useEffect } from "react";

const sliderImages = [
  "https://www.osmo.de/fileadmin/media/img/service/konfiguratoren/slider-osmo-startseite-fassadenkonfigurator-neu2-1600x645.jpg",
  "https://www.osmo.de/fileadmin/media/img/produkte/farbe/aussen/vergrauungslasur/slider-osmo-vergrauungslasur-de-1600x645.jpg",
  "https://www.osmo.de/fileadmin/media/img/produkte/farbe/aussen/garten-und-fassadenlasur/slider-osmo-produkt-garten-fassadenfarbe-braun-1600x645.jpg",
  "https://www.osmo.de/fileadmin/media/img/ideengeber/pflegetipps/aussen/freiluftsaison-terrasse-reinigen/slider-osmo-pflegetipps-freiluftsaison-terrasse-vonoben-1600x645.jpg",
  "https://www.osmo.de/fileadmin/media/img/osmo/news/exklusive-hingucker-fuer-garten-oase/slider-osmo-news-sichtblende-garten-oase-kreise-1600x645.jpg",
];

function MainHeading() {
  return (
    <h6 className="text-xl md:text-2xl text-gray-700 mb-6">
      Unsere aktuellen Kataloge im Bereich Holz:
    </h6>
  );
}

function MainDescription() {
  return (
    <CatalogLinks />
  );
}

function CatalogLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-green-600 underline hover:text-green-800"
    >
      {children}
    </a>
  );
}

// Usage in CatalogLinks:
function CatalogLinks() {
  return (
    <div className="w-full">
      <p className="text-center">
        <strong>
          <CatalogLink href="">NEU: Kanadische Hölzer für Fassaden</CatalogLink>{" | "}
          <CatalogLink href="">Thermoholz Fichte für Fassade und Terrassendielen</CatalogLink>{" | "}
        </strong>
        <br />
        <strong>
          <CatalogLink href="">Terrassen</CatalogLink> |{" "}
          <CatalogLink href="">Sichtblenden</CatalogLink> |{" "}
          <CatalogLink href="">Fassaden</CatalogLink> |{" "}
          <CatalogLink href="">Innenholz</CatalogLink> |{" "}
          <CatalogLink href="">Fussboden</CatalogLink> |{" "}
          <CatalogLink href="">Leisten</CatalogLink> |{" "}
          <CatalogLink href="">Leimholz</CatalogLink>
        </strong>
      </p>
      <div className="flex flex-wrap mt-4">{/* ... */}</div>
    </div>
  );
}

function MainImage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => setIndex(i);
  const goPrev = () => setIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  const goNext = () => setIndex((prev) => (prev + 1) % sliderImages.length);

  return (
    <div className="mt-12 w-full mx-auto overflow-hidden relative" style={{ height: 650 }}>
      {/* Carousel */}
      <div className="relative w-full h-full">
        {sliderImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            className={`
              absolute top-0 left-0 w-full h-full object-cover shadow-lg transition-opacity duration-700
              ${index === i ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
            style={{ transitionProperty: "opacity" }}
          />
        ))}

        {/* Left button */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-6xl w-12 h-12 flex items-center justify-center transition text-white cursor-pointer"
          aria-label="Vorheriges Bild"
        >
          &lt;
        </button>
        {/* Right button */}
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-6xl w-12 h-12 flex items-center justify-center transition text-white cursor-pointer"
          aria-label="Nächstes Bild"
        >
          &gt;
        </button>

        {/* Caption overlay - always contained and responsive */}
        <span className="absolute left-0 right-0 bottom-0 mb-8 mx-8 bg-white/80 px-8 py-6 shadow-lg flex flex-col items-start max-w-xl w-full z-20">
          <span className="text-2xl md:text-3xl uppercase font-bold text-left mb-4">
            <b className="text-[#009540]">Ausbildung bei Osmo?</b>
            <br />
            Trefft uns auf der <b>BOM 2025</b> in Warendorf!
          </span>
          <span className="inline-block bg-green-700 text-white px-6 py-3 rounded shadow hover:bg-green-800 transition cursor-pointer">
            Entdeckt am 01. &amp; 02. Juli coole Berufe auf der Berufsorientierungsmesse
          </span>
        </span>
      </div>

      {/* Lines as navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 w-full">
        <div className="flex gap-2">
          {sliderImages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`owl-dot w-10 h-2 bg-white border border-gray-400 transition-all duration-200 cursor-pointer ${
                index === i ? "opacity-100" : "opacity-30"
              }`}
            >
              <span className="sr-only">{i + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function KompetenzenSection() {
  return (
    <section className="py-24 md:py-40 bg-white">
      <h1 className="uppercase text-center text-3xl md:text-6xl mb-6 text-neutral-500">
        <span>Holz trifft Farbe</span>
      </h1>
      <div className="container mx-auto max-w-4xl text-center mb-8 px-4">
        <p>
          <span className="uppercase block font-light mb-2 text-neutral-500">
            Für eine Verbindung, die auf dauer hält und schützt.
            Auf Holz und Farbe von Osmo können Sie sich verlassen. Dank tiefgreifender Fachkompetenz in beiden Bereichen wissen wir, worauf es bei Holzprodukten und -anstrichen ankommt. Profitieren Sie von unserer Erfahrung.
          </span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-12 justify-center items-center mx-16 lg:mx-32">
      <div className="flex flex-col md:flex-row gap-12">
          {/* Holz */}
          <div className="flex-1 aspect-square relative text-center bg-gray-50 text-white rounded-lg shadow p-10 flex flex-col items-center justify-center overflow-hidden max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
            {/* Background image */}
            <img
              src="/holz.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            {/* Content above the image */}
            <div className="relative z-10 flex flex-col items-center w-full">
              <a href="/" className="flex flex-row items-center mb-4 gap-6">
                <img src="https://www.osmo.de/fileadmin/template/website/img/icons/icon-holz.svg" alt="Holz" className="w-10 h-16" />
                <span className="uppercase text-4xl xl:text-7xl underline decoration-dotted">Holz</span>
              </a>
              <div className="xl:p-8 mb-4 overflow-y-auto max-h-24 md:overflow-visible md:max-h-none">
                <p>
                  <span className="uppercase font-light">Holz, das hält. </span>
                  In 100 Jahren wächst ein Baum zu einer soliden Qualität heran. In über 100 Jahren Firmengeschichte sammelte Osmo Erfahrungen zur fachgerechten Verarbeitung des wertvollen Rohstoffes Holz.
                </p>
              </div>
              <div className="flex xl:flex-row flex-col gap-2 w-full xl:p-8">
                <a href="" className="btn btn-default uppercase holz_innen w-full bg-green-50 text-neutral-500 font-extralight p-2">
                  Für den Innenbereich
                </a>
                <a href="" className="btn btn-default uppercase holz_innen w-full bg-green-50 text-neutral-500 font-extralight p-2">
                  Für den Aussenbereich
                </a>
              </div>
            </div>
          </div>
          {/* Farbe */}
          <div className="flex-1 aspect-square relative text-center bg-gray-50 text-white rounded-lg shadow p-10 flex flex-col items-center justify-center overflow-hidden max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
            {/* Background image */}
            <img
              src="/farbe.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            {/* Content above the image */}
            <div className="relative z-10 flex flex-col items-center w-full">
              <a href="/" className="flex flex-row items-center mb-4 gap-6">
                <img
                  src="https://www.osmo.de/fileadmin/template/website/img/icons/icon-farbe.svg"
                  alt="Farbe"
                  className="w-10 h-16"
                />
               <span className="uppercase text-4xl xl:text-7xl underline decoration-dotted">Farbe</span>
              </a>
              <div className="mb-4 overflow-y-auto max-h-24 md:overflow-visible md:max-h-none">
                <p className="xl:p-8">
                  <span className="uppercase font-light">Farbe, die schützt. </span>
                  Nur ein atmungsaktiver Anstrich erhält auf Dauer die natürliche Schönheit und Festigkeit von Holz. Osmo gehört zu den Wegbereitern moderner Holzanstriche auf der Basis von Ölen und Wachsen.
                </p>
              </div>
              <div className="flex xl:flex-row flex-col gap-2 w-full xl:p-8">
                <a href="" className="btn btn-default uppercase holz_innen w-full bg-yellow-50 text-neutral-500 font-extralight p-2">
                  Für den Innenbereich
                </a>
                <a href="" className="btn btn-default uppercase holz_innen w-full bg-green-100 text-neutral-500 font-extralight p-2">
                  Für den Aussenbereich
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MainContent() {
  return (
    <main className="flex-1 bg-gradient-to-br flex flex-col items-center justify-center p-1">
      <div className="max-w-4xl w-full text-center py-16">
        <MainHeading />
        <MainDescription />
      </div>
      <MainImage />
      
      <KompetenzenSection />
      
    </main>
  );
}