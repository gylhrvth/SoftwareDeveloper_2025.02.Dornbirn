interface Car {
  name: string;
  description: string;
  image: string;
}

const carData: Record<string, Car> = {
  "bmw-x5": {
    name: "BMW X5",
    description: "A luxury SUV with powerful performance.",
    image: "https://i.imgur.com/38rq3FA.jpeg",
  },
  "audi-a4": {
    name: "Audi A4",
    description: "A compact executive car with great handling.",
    image: "https://i.imgur.com/JldP043.jpeg",
  },
  "tesla-model3": {
    name: "Tesla Model 3",
    description: "An electric car with autopilot features.",
    image: "https://i.imgur.com/SCbyhvr.jpeg",
  },
};

interface Props {
  params: {
    slug: string;
  };
}

export default function CarDetail({ params }: Props) {
  const car = carData[params.slug];

  if (!car) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h1>Car not found</h1>
        <p>Sorry, the car you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 20,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: 16 }}>{car.name}</h1>
      <img
        src={car.image}
        alt={car.name}
        width={600}
        height={400}
        style={{ objectFit: "cover", borderRadius: 12 }}
      />
      <p style={{ marginTop: 16, fontSize: "18px", color: "#333" }}>
        {car.description}
      </p>
      <BTCLP/>

    </div>
  );
}


function BTCLP() { //Back to car list page 
  return (
    <div className="mt-9 flex justify-center">
      <a href="/cars" className="no-underline">
        <button
          className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold text-lg px-7 py-3 rounded-lg cursor-pointer shadow-md transition-all duration-200 hover:from-orange-400 hover:to-orange-400 active:scale-95"
        >
          ⬅ Back to Car List Page
        </button>
      </a>
    </div>
  );
}
