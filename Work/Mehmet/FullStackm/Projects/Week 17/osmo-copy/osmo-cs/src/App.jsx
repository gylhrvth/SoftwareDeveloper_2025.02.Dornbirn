import { Files, Palette } from "lucide-react";
import HeroBanner from "./components/HeroBanner";
import Header from './components/header';
import Footer from './components/footer';



function App() {
  return (
    <>
      <MenuBox />
      <Header/>
      <MainContent />
      <Placeholder />
      <Footer />
    </>
  );
}

function MainContent() {
  return (
    <>
      <h5>Unsere aktuellen Kataloge im Bereich Holz</h5>
      <HeroBanner />
      <h1>Holz trifft Farbe</h1>
      <div className="card">
        <h2>Mediathek</h2>
        <p>Hier finden Sie unsere Kataloge und Produktinformationen zum Download.</p>
      </div>
      <Placeholder title="Main Content" className="w-screen h-96" />
    </>
  );
}

function MenuBox() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <Placeholder title="De / De" className="w-full h-32" />
      <KonfigurationBox />
      <Placeholder
        title="OSMO Logo"
        className="w-full min-h-32 col-span-1 lg:col-span-3 lg:row-span-2"
      />
      <Placeholder
        title="Holz Farbe"
        className="w-full min-w-32 min-h-32 col-span-1 lg:col-span-9"
      />
    </div>
  );
}

function MenuTextWithIcon({ icon, text }) {
  return (
    <div className="flex justify-start items-center">
      {icon}
      {text}
    </div>
  );
}

function KonfigurationBox() {
  return (
    <div className="w-full col-span-1 lg:col-span-8 min-h-32 flex flex-col lg:flex-row justify-between">
      <MenuTextWithIcon icon={<Files color="darkgreen" size={32} />} text="Konfiguration" />
      <MenuTextWithIcon icon={<Palette color="darkgreen" size={32} />} text="Farbmusterbestellung" />
      <MenuTextWithIcon icon={<Files />} text="Verbrauchsrechner" />
      <MenuTextWithIcon icon={<Files />} text="Mediathek" />
    </div>
  );
}

function Placeholder({ title, className }) {
  return (
    <div
      className={`relative border-2 border-dashed border-gray-300 flex items-center justify-center ${
        className ?? ""
      }`}
    >
      <span className="absolute top-2 left-0 w-full text-center font-bold text-lg text-gray-400">
        {title}
      </span>
      <svg width="100%" height="100%" className="absolute top-0 left-0">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#bbb" strokeWidth="2" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#bbb" strokeWidth="2" />
      </svg>
    </div>
  );
}

export default App;