export default function Footer() {
  return (
    <footer className="bg-[#181824] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#30e3ca]">RetroTech Systems</h3>
            <p className="mb-4 text-[#e0e7ef]">Preserving computing history one chip at a time since 1982.</p>
            <div className="flex space-x-4">
              {/* Social icons */}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#30e3ca]">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#a259f7] hover:underline cursor-pointer">Vintage Repairs</a></li>
              <li><a href="#" className="text-[#a259f7] hover:underline cursor-pointer">Retro Gaming</a></li>
              <li><a href="#" className="text-[#a259f7] hover:underline cursor-pointer">Custom Builds</a></li>
              <li><a href="#" className="text-[#a259f7] hover:underline cursor-pointer">Data Recovery</a></li>
              <li><a href="#" className="text-[#a259f7] hover:underline cursor-pointer">Parts Shop</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#30e3ca]">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#a259f7] hover:underline cursor-pointer">Museum Hours</a></li>
              <li><a href="#" className="text-[#a259f7] hover:underline cursor-pointer">Collection</a></li>
              <li><a href="#" className="text-[#a259f7] hover:underline cursor-pointer">Events</a></li>
              <li><a href="#" className="text-[#a259f7] hover:underline cursor-pointer">Support Desk</a></li>
              <li><a href="#" className="text-[#a259f7] hover:underline cursor-pointer">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#30e3ca]">Visit Our Museum</h3>
            <address className="not-italic text-[#e0e7ef]">
              <p className="mb-2">1337 Byte Avenue</p>
              <p className="mb-2">Silicon Valley, CA 94088</p>
              <p className="mb-2">Email: info@retrotechsystems.com</p>
              <p>Phone: +1 (555) 1984</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-[#1f2937] mt-12 pt-8 text-center text-[#e0e7ef]/80">
          <p>© {new Date().getFullYear()} RetroTech Systems. All rights reserved. <span className="hidden md:inline">|</span><br className="md:hidden" /> Memory: 640K (ought to be enough for anybody)</p>
        </div>
      </div>
    </footer>
  );
}