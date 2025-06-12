


export default function App() {
return (
<div className="bg-bgcustom font-jetBrains w-screen h-screen flex flex-col">
<MenuBox />
<Placeholder title="Main Content" className="w-full flex-1" />
<Placeholder title="Footer" className="w-full h-16" />
</div>
)
}

function MenuBox() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
    <Placeholder title="De / De" className="w-full h-32" />
    <KonfigurationsBox className="w-full col-span-1 lg:col-span-8 min-h-32" />
    <Placeholder title="OSMO Logo" className="w-full min-h-32 col-span-1 lg:col-span-3 lg:row-span-2" />
    <HolzFarbeBox className="w-full min-w-32 min-h-32 col-span-1 lg:col-span-9" />
  </div>
  )
}

function HolzFarbeBox({ className }: { className?: string }) {
  return (
    <div className={`grid grid-cols-10 ${className ?? ''}`}>
    
      <Placeholder title="Farbe 1" className="col-span-2" />
      <Placeholder title="Farbe 2" className="col-span-2" />
      <Placeholder title="Farbe 3" className="col-span-2" />
      <Placeholder title="Farbe 4" className="col-span-2" />
      <Placeholder title="Farbe 5" className="col-span-2" />
      <Placeholder title="Farbe 6" className="col-span-2" />
      <Placeholder title="Farbe 7" className="col-span-2" />
      <Placeholder title="Farbe 8" className="col-span-2" />
      <Placeholder title="Farbe 9" className="col-span-2" />
      <Placeholder title="Farbe 10" className="col-span-2" />
    </div>
  )
}   

function KonfigurationsBox({ className }: { className?: string }) {
  return (
    <div className={`grid grid-cols-4 ${className ?? ''}`}>
      <Placeholder title="Konfiguratoren"/>
      <Placeholder title="Col2"/>
      <Placeholder title="Col3"/>
      <Placeholder title="Col4"/>
    </div>
  )
}

function Placeholder({ title, className }: { title: string, className?: string}) {
  return (
    <div className={`relative border-2 border-dashed border-gray-300 flex items-center justify-center ${className ?? ''}`}>
      <span className="absolute w-full text-center font-bold text-lg text-gray-400">"
        {title}</span>
        <svg width="100%" height="100%" className="absolute top-0 left-0">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#bbb" strokeWidth="2" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#bbb" strokeWidth="2" />
      </svg>
    </div>
  )

} 

