import { FaGlobeEurope, FaSlidersH, FaPalette, FaCalculator, FaRegFolderOpen } from 'react-icons/fa';

export const TopNavbar = () => (
  <div className="fixed top-0 w-full z-50 bg-gray-100 border-b border-gray-200">
    <div
      className="max-w-7xl mx-auto flex items-center justify-between text-gray-500 pl-8"
      style={{
        fontSize: 'var(--navbar-font-size)',
        paddingTop: 'var(--navbar-padding-y)',
        paddingBottom: 'var(--navbar-padding-y)',
        paddingLeft: 'var(--navbar-padding-x)',
        paddingRight: 'var(--navbar-padding-x)',
      }}
    >
      <div className="flex items-center gap-2">
        <FaGlobeEurope className="text-green-600" />
        <span>DE / DE</span>
      </div>
      <div className="flex items-center gap-8">
        <span className="flex items-center gap-1 pl-2"><FaSlidersH className="text-green-600" /> Konfiguratoren</span>
        <span className="flex items-center gap-1 pl-2"><FaPalette className="text-green-600" /> Farbmusterbestellung</span>
        <span className="flex items-center gap-1 pl-2"><FaCalculator className="text-green-600" /> Verbrauchsrechner</span>
        <span className="flex items-center gap-1 pl-2"><FaRegFolderOpen className="text-green-600" /> Mediathek</span>
      </div>
    </div>
  </div>
);