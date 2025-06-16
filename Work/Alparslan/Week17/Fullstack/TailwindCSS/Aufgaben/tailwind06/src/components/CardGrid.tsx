// src/components/CardGrid.tsx
interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
}

function Card({ title, description, imageSrc }: CardProps) {
  return (
    <div className="bg-[#181824]/80 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#1f2937]/30">
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-[#30e3ca]">{title}</h3>
        <p className="text-[#e0e7ef]">{description}</p>
        <button className="cursor-pointer mt-4 text-[#a259f7] hover:underline font-medium">
          Learn more →
        </button>
      </div>
    </div>
  );
}

export default function CardGrid() {
  const cards: CardProps[] = [
    {
      title: "Vintage Computer Repair",
      description: "Expert restoration of classic computers from Commodore, Apple, Atari, IBM, and more. We fix what others consider obsolete.",
      imageSrc: "https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Retro Gaming Lounge",
      description: "Visit our arcade and gaming lounge featuring fully restored cabinets and consoles from the 70s through 90s.",
      imageSrc: "https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Custom Builds",
      description: "Modern hardware in retro cases, or authentic vintage builds with period-correct components. You dream it, we build it.",
      imageSrc: "https://images.unsplash.com/photo-1623184169148-d872f5f1f034?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Parts & Accessories",
      description: "Hard-to-find components, adapters, and accessories for your vintage computing needs. We stock what others don't.",
      imageSrc: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Retro Programming",
      description: "Classes and services for coding on vintage platforms. Learn BASIC, Assembly, or have us create custom software for old hardware.",
      imageSrc: "https://images.unsplash.com/photo-1473646590311-c48e1bc77b44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Digital Archaeology",
      description: "Data recovery from obsolete media formats. Floppy disks, ZIP drives, tape backups - we can extract your lost files.",
      imageSrc: "https://images.unsplash.com/photo-1622551557315-0452c93eac8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#181824] via-[#1f2937] to-[#3a1c71]/70">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#30e3ca]">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}