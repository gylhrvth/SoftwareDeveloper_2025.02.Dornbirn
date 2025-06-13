

export default function App() {
  return (
    <div className="bg-bgcustom font-jetBrains min-h-screen flex flex-col font-serif">
      <MenuBox />
      <MainContent className="w-full flex-1" />
      <Placeholder title="Footer" className="w-full h-16" />
    </div>
  )
}

function MenuBox() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <KonfigurationsBox className="w-full col-span-1 lg:col-span-9 min-h-32" />
      <Placeholder title="OSMO Logo" className="w-full min-h-32 col-span-1 lg:col-span-3 lg:row-span-2" />
      <HolzFarbeBox className="w-full min-w-32 min-h-32 col-span-1 lg:col-span-9" />
    </div>
  )
}

function KonfigurationsBox({ className }: { className?: string }) {
  return (
    <div className={`grid grid-cols-6 ${className ?? ''}`}>
      <Placeholder title="De / De" className="col-span-2" />
      <Placeholder title="Konfiguratoren"/>
      <Placeholder title="Farbmusterbestellung"/>
      <Placeholder title="Verbrauchsrechner"/>
      <Placeholder title="Mediathek"/>
    </div>
  )
}

function HolzFarbeBox({ className }: { className?: string }) {
  return (
    <div className={`grid grid-cols-9 ${className ?? ''}`}>
      <Placeholder title="Holz" className="col-span-1" />
      <Placeholder title="Farbe" className="col-span-1" />
      <Placeholder title="Neue Werkstoffe" className="col-span-1" />
      <Placeholder title="Referenzen" className="col-span-1" />
      <Placeholder title="Ideengeber" className="col-span-1" />
      <Placeholder title="Service" className="col-span-1" />
      <Placeholder title="Händlersuche" className="col-span-1" />
      <Placeholder title="Osmo" className="col-span-1" />
      <Placeholder title="Suchen" className="col-span-1" />
    </div>
  )
}

function Placeholder({ title, className }: { title: string, className?: string}) {
  return (
    <div className={`relative border-2 border-dashed border-gray-300 flex items-center justify-center ${className ?? ''}`}>
      <span className="w-full text-center font-bold text-lg text-gray-400">
        {title}
      </span>
    </div>
  )
}

function MainContent({className }: { className?: string }) {
  return (
    <div className={`border-2 border-dashed border-gray-300 flex flex-col h-full ${className ?? ''}`}>
      <KatalogBox className="w-full flex-1 bg-green" />
      <ImageBox className="w-full flex-1" />
      <Produkte className="w-full flex-1" />
      <Highlights className="w-full flex-1" />
      <CardMenu className="w-full flex-1" />
      <Lifecyle  title="Lifecycle" className="w-full flex-1" />
    </div>
  )
}

function Lifecyle({ title, className }: { title: string, className?: string}) {
  return (
    <div className={`relative border-2 border-dashed border-gray-300 flex items-center justify-center ${className ?? ''}`}>
      <span className="w-full text-center font-bold text-lg text-gray-400">
        {title}
      </span>
    </div>
  )
}

function KatalogBox({ className }: { className?: string }) {
  return (
    <div className={`border-2 border-dashed border-gray-300 flex items-center justify-center ${className ?? ''}`}>
      <h2 className="w-full text-center font-bold text-lg text-gray-400">Unsere Aktuellen Kataloge im Bereich Holz:</h2>
    </div>
  )
}

function ImageBox({ className }: { className?: string }) {
  return (
    <div className={`border-2 border-dashed border-gray-300 flex items-center justify-center ${className ?? ''}`}>
      <span className="w-full text-center font-bold text-lg text-gray-400">
        Image Placeholder
      </span>
    </div>
  )
}

function Produkte({ className }: { className?: string }) {
  return (
    <div className={`border-2 border-dashed border-gray-300 flex items-center ${className ?? ''}`}>
      <ProdukteSection name="Holz" className="w-full" />
      <ProdukteSection name="Farbe" className="w-full" />
    </div>
  )
}

function ProdukteSection({name, className}: {name:string; className?: string}) {
  return (
    <div className={`border-2 border-dashed border-gray-300 flex items-center justify-center ${className ?? ''}`}>
      <span className="w-full text-center font-bold text-lg text-gray-400">
        {name ? name : 'Produkte Section'}
      </span>
    </div>
  )
}

function Highlights ({ className }: { className?: string }) {
  return (
    <div className={`border-2 border-dashed border-gray-300 flex items-center justify-center ${className ?? ''}`}>
      <span className="w-full text-center font-bold text-lg text-gray-400">
        Produkthighlights
      </span>
    </div>
  )
}

function CardMenu({ className }: { className?: string }) {
  return (
    <div className={`border-2 border-dashed border-gray-300 flex items-center justify-center ${className ?? ''}`}>
      <span className="w-full text-center font-bold text-lg text-gray-400">
        Card Menu
      </span>
    </div>
  )


}