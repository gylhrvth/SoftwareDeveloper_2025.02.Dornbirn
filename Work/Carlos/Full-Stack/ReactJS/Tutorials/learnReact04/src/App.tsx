
import './App.css'

export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return ( 
    <div className="mainContainer">
    <img
      className="avatar"
      src={avatar}
      alt={description}
      />
      <p>{description}</p>
      <br />
      <TodoList />
    </div>
  );
}

const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'darkbrown',
    color: 'pink'
  }
};

function TodoList() {
  return (
    <div>
    <h3>{person.name}'s To Do List for <span className="today-date">{formatDate(today)}</span></h3>
    
    <ul style={person.theme}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
    </div>
  )
  
}


const today = new Date();

function formatDate(date: Date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}
