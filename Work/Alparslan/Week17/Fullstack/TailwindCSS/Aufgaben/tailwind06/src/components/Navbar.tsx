export default function Navbar() {
  return (
    <nav className="bg-[#1f2937]/90 py-3 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <a href="#" className="text-[#a259f7] hover:underline cursor-pointer">Home</a>
            <a href="#" className="text-[#a259f7] hover:underline cursor-pointer">About</a>
            <a href="#" className="text-[#a259f7] hover:underline cursor-pointer">Machines</a>
            <a href="#" className="text-[#a259f7] hover:underline cursor-pointer">Gallery</a>
            <a href="#" className="text-[#a259f7] hover:underline cursor-pointer">Connect</a>
          </div>
          <div>
            <button className="bg-[#30e3ca] text-[#181824] px-4 py-2 rounded hover:bg-[#30e3ca]/80 transition-colors cursor-pointer">
              Boot Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}