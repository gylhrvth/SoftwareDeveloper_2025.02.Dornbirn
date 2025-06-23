import Image from "next/image";
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex-col  w-[100%] min-h-screen">

      <Header />

      <Main />

      <Footer />
    </div>
  );
}


function Placeholder({ title, className }: { title: string, className?: string }) {
  return (
    <div className={`relative border-2 border-dashed border-black flex items-center justify-center ${className ?? ''}`}>
      <span className="absolute top-2 left-0 w-full text-center font-bold text-lg text-black">
        {title}
      </span>
      <svg width="100%" height="100%" className="absolute top-0 left-0">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#bbb" strokeWidth="2" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#bbb" strokeWidth="2" />
      </svg>
    </div>
  );
}


type MainProps = {
  children?: React.ReactNode;
  className?: string;
};

function Main({ children, className }: MainProps) {
  return (
     <main className= "relative h-screen overflow-hidden bg-transparent">
      
      {/* Hintergrundbild */}
      {/*<img
        src="/img/smoke_2.avif"
        alt="Hero"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60 pointer-events-none mix-blend-lighten"
      /> */}

      {/* Inhalt über dem Bild */}
      <div className="relative z-10 w-[80%] mx-auto flex flex-col items-center pt-32 text-white">
        <h1 className="text-5xl font-bold mb-4">Main</h1>
        <p className="text-2xl mb-6 text-center">
          Here is some text. I don't know what I should write, so I'm just writing sh*t, just to see something on the screen.
        </p>

        {/* Hier kannst du dynamisch Inhalte reinschieben */}
        {children}
      </div>
    </main>
  );
}
