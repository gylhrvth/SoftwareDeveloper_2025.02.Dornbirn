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

function CatalogLinks() {
  return (
    <div className="w-full">
      <p className="text-center">
        <strong>
          <a
            href=""
            className="text-green-800 underline hover:text-green-600"
          >
            NEU: Kanadische Hölzer für Fassaden
          </a>
          &nbsp;|&nbsp;
          <a
            href=""
            className="text-green-800 underline hover:text-green-600"
          >
            Thermoholz Fichte für Fassade und Terrassendielen
          </a>
          &nbsp;|&nbsp;
        </strong>
        <br />
        <strong>
          <a
            href=""
            className="text-green-800 underline hover:text-green-600"
          >
            Terrassen
          </a>{" "}
          |{" "}
          <a
            href=""
            className="text-green-800 underline hover:text-green-600"
          >
            Sichtblenden
          </a>{" "}
          |{" "}
          <a
            href=""
            className="text-green-800 underline hover:text-green-600"
          >
            Fassaden
          </a>{" "}
          |{" "}
          <a
            href=""
            className="text-green-800 underline hover:text-green-600"
          >
            Innenholz
          </a>{" "}
          |{" "}
          <a
            href=""
            className="text-green-800 underline hover:text-green-600"
          >
            Fussboden
          </a>{" "}
          |{" "}
          <a
            href=""
            className="text-green-800 underline hover:text-green-600"
          >
            Leisten
          </a>{" "}
          |{" "}
          <a
            href=""
            className="text-green-800 underline hover:text-green-600"
          >
            Leimholz
          </a>
        </strong>
      </p>
      <div className="flex flex-wrap mt-4">{/* You can add more content here if needed */}</div>
    </div>
  );
}

function MainImage() {
  const [index, setIndex] = useState(0);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Handler for line navigation
  const goTo = (i: number) => setIndex(i);

  return (
    <div className="mt-12 w-[80vw] mx-auto overflow-hidden relative" style={{ height: 450 }}>
      {/* Carousel */}
      <div
        className="flex transition-transform duration-700"
        style={{
          width: `${sliderImages.length * 100}%`,
          transform: `translateX(-${index * (100 / sliderImages.length)}%)`,
        }}
      >
        {sliderImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            className="w-full h-auto rounded-lg shadow-lg flex-shrink-0"
            style={{ width: `${100 / sliderImages.length}%`, objectFit: "cover" }}
          />
        ))}
      </div>

      {/* Caption overlay */}
      <span className="absolute left-0 top-1/2 -translate-y-1/4 bg-white/80 px-8 py-6 shadow-lg flex flex-col items-start max-w-xl z-10">
        <span className="text-2xl md:text-3xl uppercase font-bold text-left mb-4">
          <b className="text-[#009540]">Ausbildung bei Osmo?</b>
          <br />
          Trefft uns auf der <b>BOM 2025</b> in Warendorf!
        </span>
        <span className="inline-block bg-green-700 text-white px-6 py-3 rounded shadow hover:bg-green-800 transition cursor-pointer">
          Entdeckt am 01. &amp; 02. Juli coole Berufe auf der Berufsorientierungsmesse
        </span>
      </span>

      {/* Lines as navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 w-full">
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
    <section className="py-8 md:py-16 bg-white">
      <h1 className="uppercase text-center text-3xl md:text-4xl font-bold mb-6">
        <span>Holz trifft Farbe</span>
      </h1>
      <div className="container mx-auto text-center mb-8 px-4">
        <p>
          <span className="uppercase block font-semibold mb-2">
            Für eine Verbindung, die auf dauer hält und schützt.
          </span>
          Auf Holz und Farbe von Osmo können Sie sich verlassen. Dank tiefgreifender Fachkompetenz in beiden Bereichen wissen wir, worauf es bei Holzprodukten und -anstrichen ankommt. Profitieren Sie von unserer Erfahrung.
        </p>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Holz */}
          <div className="flex-1 text-center bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center">
            <a href="/" className="flex flex-col items-center mb-4">
              <img src="/fileadmin/template/website/img/icons/icon-holz.svg" alt="Holz" className="w-16 h-16 mb-2" />
              <span className="uppercase text-xl font-bold">Holz</span>
            </a>
            <div className="mb-4">
              <p>
                <span className="uppercase font-semibold">Holz, das hält.</span>
                <br />
                In 100 Jahren wächst ein Baum zu einer soliden Qualität heran. In über 100 Jahren Firmengeschichte sammelte Osmo Erfahrungen zur fachgerechten Verarbeitung des wertvollen Rohstoffes Holz.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <a href="/holz/holz-innen" className="btn btn-default uppercase holz_innen w-full">
                Für den Innenbereich
              </a>
              <a href="/holz/holz-fuer-den-aussenbereich" className="btn btn-default uppercase holz_aussen w-full">
                Für den Aussenbereich
              </a>
            </div>
            <picture className="mt-6 block">
              <source srcSet="/fileadmin/_processed_/9/c/csm_square-osmo-kompetenzen-holz_15aeacebec.jpg" media="(min-width: 1200px)" />
              <source srcSet="/fileadmin/_processed_/9/c/csm_square-osmo-kompetenzen-holz_57a080604e.jpg" media="(min-width: 992px)" />
              <source srcSet="/fileadmin/_processed_/9/c/csm_square-osmo-kompetenzen-holz_3f3fb6e6b4.jpg" media="(min-width: 768px)" />
              <source srcSet="/fileadmin/_processed_/9/c/csm_square-osmo-kompetenzen-holz_022be11ed7.jpg" media="(max-width: 767px)" />
              <source srcSet="/fileadmin/_processed_/9/c/csm_square-osmo-kompetenzen-holz_5615478ed4.jpg" media="(max-width: 567px)" />
              <source srcSet="/fileadmin/_processed_/9/c/csm_square-osmo-kompetenzen-holz_1604872199.jpg" media="(max-width: 480px)" />
              <img
                src="/fileadmin/_processed_/9/c/csm_square-osmo-kompetenzen-holz_15aeacebec.jpg"
                alt="Osmo Holzprodukte - Qualität für innen und außen"
                className="img-fluid rounded-lg shadow mt-2"
                loading="lazy"
              />
            </picture>
          </div>
          {/* Farbe */}
          <div className="flex-1 text-center bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center">
            <a href="/" className="flex flex-col items-center mb-4">
              <img src="/fileadmin/template/website/img/icons/icon-farbe.svg" alt="Farbe" className="w-16 h-16 mb-2" />
              <span className="uppercase text-xl font-bold">Farbe</span>
            </a>
            <div className="mb-4">
              <p>
                <span className="uppercase font-semibold">Farbe, die schützt.</span>
                <br />
                Nur ein atmungsaktiver Anstrich erhält auf Dauer die natürliche Schönheit und Festigkeit von Holz. Osmo gehört zu den Wegbereitern moderner Holzanstriche auf der Basis von Ölen und Wachsen.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <a href="/farbe/farbe-fuer-den-innenbereich" className="btn btn-default uppercase farbe_innen w-full">
                Für den Innenbereich
              </a>
              <a href="/farbe/farbe-fuer-den-aussenbereich" className="btn btn-default uppercase farbe_aussen w-full">
                Für den Aussenbereich
              </a>
            </div>
            <picture className="mt-6 block">
              <source srcSet="/fileadmin/_processed_/2/9/csm_square-osmo-kompetenzen-farbe_63841632c0.jpg" media="(min-width: 1200px)" />
              <source srcSet="/fileadmin/_processed_/2/9/csm_square-osmo-kompetenzen-farbe_c22474a2f7.jpg" media="(min-width: 992px)" />
              <source srcSet="/fileadmin/_processed_/2/9/csm_square-osmo-kompetenzen-farbe_20690398ea.jpg" media="(min-width: 768px)" />
              <source srcSet="/fileadmin/_processed_/2/9/csm_square-osmo-kompetenzen-farbe_7318d53a12.jpg" media="(max-width: 767px)" />
              <source srcSet="/fileadmin/_processed_/2/9/csm_square-osmo-kompetenzen-farbe_2e91b31e75.jpg" media="(max-width: 567px)" />
              <source srcSet="/fileadmin/_processed_/2/9/csm_square-osmo-kompetenzen-farbe_06659dad79.jpg" media="(max-width: 480px)" />
              <img
                src="/fileadmin/media/img/startseite/kompetenzen/square-osmo-kompetenzen-farbe.jpg"
                alt="Osmo Farbe - Anstriche für innen und außen"
                className="img-fluid rounded-lg shadow mt-2"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MainContent() {
  return (
    <main className="flex-1 bg-gradient-to-br from-white via-gray-100 to-gray-200 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center py-16">
        <MainHeading />
        <MainDescription />
     
      </div>
         <MainImage />
    </main>
  );
}