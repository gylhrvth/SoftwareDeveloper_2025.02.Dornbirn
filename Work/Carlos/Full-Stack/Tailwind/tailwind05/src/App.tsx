import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./MainContent";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}