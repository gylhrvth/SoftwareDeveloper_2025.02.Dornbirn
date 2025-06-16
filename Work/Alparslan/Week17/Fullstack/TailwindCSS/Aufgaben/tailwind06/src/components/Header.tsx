export default function Header() {
  return (
    <header className="bg-[#181824]/80 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-[#30e3ca]">RetroTech Systems</div>
          <div className="hidden md:block">
            <div className="flex space-x-4">
              <a href="mailto:info@retrotechsystems.com" className="text-[#a259f7] hover:underline cursor-pointer">
                info@retrotechsystems.com
              </a>
              <a href="tel:+15551984" className="text-[#a259f7] hover:underline cursor-pointer">
                +1 (555) 1984
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}