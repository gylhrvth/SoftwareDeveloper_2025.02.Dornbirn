// src/App.tsx
import Header from './components/Header';
import Navbar from './components/Navbar';
import Introduction from './components/Introduction';
import ImageSlider from './components/ImageSlider';
import CardGrid from './components/CardGrid';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-[#e0e7ef] bg-gradient-to-br from-[#181824] via-[#1f2937] to-[#3a1c71]">
      <Header />
      <Navbar />
      <main className="flex-grow">
        <Introduction />
        <ImageSlider />
        <CardGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;