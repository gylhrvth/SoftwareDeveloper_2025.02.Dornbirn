import './App.css'

type ProfileProps = {
  src: string;
  alt: string;
  name: string;
  description: string;
}

const scientists = [
  {
    src: "https://i.imgur.com/MK3eW3As.jpg",
    alt: "Katherine Johnson",
    name: "Katherine Johnson",
    description: "American mathematician and NASA scientist"
  },
  {
    src: "https://i.imgur.com/yXOvdOSs.jpg",
    alt: "Hedy Lamar",
    name: "Hedy Lamar",
    description: "Austrian-American actress and inventor"
  },
  {
    src: "https://i.imgur.com/1bX5QH6.jpg",
    alt: "Marie Curie",
    name: "Marie Curie",
    description: "Polish-born physicist and chemist"
  }
];

function Profile({ src, alt, name, description }: ProfileProps) {
  return (
    <div className="profile-card">
    <img src={src} alt={alt} className="profile-img" />
    <h2>{name}</h2>
    <p>{description}</p>
    </div>
  );
}

function Gallery(){
  return (
    <section>
      <h1>Amazing scientist</h1>
      <div className="profiles-row">
      {scientists.map((sci) => (
        <Profile
          key={sci.alt}
          src={sci.src}
          alt={sci.alt}
          name={sci.name}
          description={sci.description}
        />
      ))}
      </div>
    </section>
  );
}

export default function App() {
  return <Gallery />;
}





