
import './App.css';
import { cardData } from './cardData';
import type { CardProps } from './cardData';



export default function App() {
  return (
    <div>
      <h1>My Contacts</h1>
        <div className="card-container">
        {cardData.map((card) => (
          <Card key={card.id} 
                id={card.id}
                name={card.name} 
                image={card.image} 
                tel={card.tel} 
                email={card.email} 
                size={card.size} // Pass the size prop if available
          />
        ))}
      </div>
    </div>
  );
}

function Card(props: CardProps) {
  console.log(props);
  return (
    <div>
      <h2>{props.name}</h2>
      <img
        className="card-image"
        src={props.image}
        alt={props.name}
        width={props.size?.width || 200} // Default width if size is not provided
        height={props.size?.height || 200} // Default height if size is not provided
      />
      <p>Phone: {props.tel}</p>
      <p>Email: {props.email}</p>
    </div>
  );
}
