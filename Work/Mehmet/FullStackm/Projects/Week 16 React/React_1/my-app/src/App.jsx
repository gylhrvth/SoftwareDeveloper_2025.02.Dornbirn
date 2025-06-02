import './App.css'; // Importiere CSS-Stile

function MyButton() {
  return (
    <button className="buttonr" onClick={() => alert('Button clicked!')}>
      I'm a button
    </button>
  );
}

export default function MyApp() {
  return (
    <div className="app">
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}




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
