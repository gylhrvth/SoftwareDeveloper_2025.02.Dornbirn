
function Header() {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-600 h-14 md:col-span-4 flex items-center justify-center font-bold rounded shadow text-white">
      Header
    </div>
  );
}

function Navigation() {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 md:col-span-4 h-14 flex items-center rounded shadow text-white">
      <div className="grid grid-cols-6 w-full h-full">
        <NavItem>Nav 1</NavItem>
        <NavItem>Nav 2</NavItem>
        <NavItem>Nav 3</NavItem>
        <NavItem>Nav 4</NavItem>
        <NavItem>Nav 5</NavItem>
        <NavItem>Nav 6</NavItem>
      </div>
    </div>
  );
}

function NavItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center font-bold cursor-pointer hover:bg-blue-600 transition-colors h-full">
      {children}
    </div>
  );
}

function SidebarItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex-1 flex items-center justify-center cursor-pointer  hover:bg-blue-600 transition-colors ${className}`}>
      {children}
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-gradient-to-b from-blue-700 to-blue-500 md:col-span-1 h-200 flex flex-col rounded shadow text-white font-bold">
      <SidebarItem className="border-b border-blue-400">Field 1</SidebarItem>
      <SidebarItem className="border-b border-blue-400">Field 2</SidebarItem>
      <SidebarItem className="border-b border-blue-400">Field 3</SidebarItem>
      <SidebarItem className="border-b border-blue-400">Field 4</SidebarItem>
      <SidebarItem className="border-b border-blue-400">Field 5</SidebarItem>
      <SidebarItem>Field 6</SidebarItem>
    </div>
  );
}


function MainContent() {
  return (
    <div className="bg-gradient-to-br from-white via-gray-100 to-gray-200 md:col-span-3 h-200 flex items-center justify-center font-bold rounded shadow border text-gray-700">
      Main Content
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-700 col-span-1 md:col-span-4 h-16 flex items-center justify-center font-bold rounded shadow text-white">
      Footer
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-8 font-serif">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Header />
        <Navigation />
        <Sidebar />
        <MainContent />
        <Footer />
      </div>
    </div>
  );
}