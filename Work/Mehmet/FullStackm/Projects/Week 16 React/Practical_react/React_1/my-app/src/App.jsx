import './App.css'; // Importiere CSS-Stile

function MyButton() {
  return (
    <button className="buttonr" onClick={() => alert('Button clicked!')}>
      I'm a button
    </button>
  );
}

const Hallo = () => { return( 
  <h1 className='test'>hallo welt</h1>);
}

function PropTest(props) {
  return (
    <div>
      <h2>Props Test, nr { props.num}</h2>
      <p>This is a simple component to test props.</p>
    </div>
  );
}

function Proping() {
  return (
    <div className='propings'>
      <PropTest num={5} />
      <PropTest num={10} />
      <PropTest num={15} />
    </div>
  );
}  

export function App() {
  return (
<>
    <div className="app">
      <h1>Welcome to my app</h1>
      <MyButton />
     <Hallo />
    </div>
    <div className="footer">
      <p>Made with ❤️ by Mehmet</p>
    </div>
    <Proping />
     </>
  );
}




// Beispielaufruf der propTest-Komponente mit einer Prop)

// Button wiht cout functions

// // src/App.jsx
// import { useState } from 'react'; // Importiere useState-Hook
// import './App.css'; // Styles

// // Hauptkomponente App
// function App() {
//   const [count, setCount] = useState(0); // Zähler mit initial 0

//   return (
//     <div className="app">
//       <h1>Hello World aus React 🎉</h1>
//       <p>Du hast {count} Mal geklickt.</p>
      
//       {/* Wenn der Button geklickt wird, erhöht sich der Zähler */}
//       <button onClick={() => setCount(count + 1)}>
//         Klick mich!
//       </button>
//     </div>
//   );
// }

// export default App; // Exportiere App als Hauptkomponente
