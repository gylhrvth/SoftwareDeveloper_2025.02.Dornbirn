import Link from "next/link";

const cars = [
  {
    slug: "bmw-x5",
    name: "BMW X5",
    image: "https://i.imgur.com/38rq3FA.jpeg",
  },
  {
    slug: "audi-a4",
    name: "Audi A4",
    image: "https://i.imgur.com/JldP043.jpeg",
  },
  {
    slug: "tesla-model3",
    name: "Tesla Model 3",
    image: "https://i.imgur.com/SCbyhvr.jpeg",
  },
];

export default function CarsPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fa",
        padding: "40px 0",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "32px", color: "#222" }}>
        Car List
      </h1>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {cars.map((car) => (
          <li
            key={car.slug}
            style={{
              marginBottom: "28px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              overflow: "hidden",
              transition: "transform 0.15s",
            }}
          >
            <Link
              href={`/cars/${car.slug}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                textDecoration: "none",
                padding: "18px 22px",
                color: "#222",
                transition: "background 0.2s",
              }}
            >
              <img
                src={car.image}
                alt={car.name}
                width={120}
                height={80}
                style={{
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                }}
              />
              <span
                style={{
                  fontSize: "1.25rem",
                  color: "#0070f3",
                  fontWeight: 600,
                }}
              >
                {car.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <BTM/>
    </div>
    
  );
}

function BTM() {
  return (
    <div className="mt-9 flex justify-center">
      <a href="/" className="no-underline">
        <button
          className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold text-lg px-7 py-3 rounded-lg cursor-pointer shadow-md transition-all duration-200 hover:from-orange-400 hover:to-orange-400 active:scale-95"
        >
          ⬅ Back to Main Page
        </button>
      </a>
    </div>
  );
}
