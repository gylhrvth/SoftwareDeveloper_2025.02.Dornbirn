import "./App.css"; // Import CSS styles
import { useEffect, useState } from "react"; // import React hooks fom the libary 

function App() { 
  const [category, setCategory] = useState("any"); // returns an array with two elements, the first is the current state and the second is a function to update the state
  const [joke, setJoke] = useState(""); // current joke text, initially an empty string
  const [color, setColor] = useState("black"); // color for the heading, initially black

  const colors = ["Black", "Red", "green", "violet", "azure", "brown", "midnightblue"];

  const onCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  }


  useEffect(() => {
  const fetchData = async () => {

    try {
      const response = await fetch("https://v2.jokeapi.dev/joke/" + category + "?type=single");
      if (!response.ok) {
        throw new Error("Network response was not ok");

      }
      const data = await response.json();
      setJoke(data.joke); // Set the joke state with the fetched joke

    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
  fetchData(); // Call the fetchData function to fetch the joke
}, [category]); // useEffect will run whenever the category changes


    useEffect(() => {
  const intervalId = setInterval(() => {
    setColor((prevColor) => {
      const currentIndex = colors.indexOf(prevColor); // Find the index of the current color
      const nextIndex = (currentIndex + 1) % colors.length; // Calculate the next index cyclically
      return colors[nextIndex]; // Return the next color
    });
  

  }, 1000); // Change color every second
  return () => clearInterval(intervalId); // Cleanup function to clear the interval when the component unmounts
  }
, []); // Empty dependency array means this effect runs only once when the component mounts

return (

    <>
      <h1 style={{ color }}>Hello World!</h1> {/* Heading with dynamic color */}
      <div> 
      <select value={category} onChange={onCategoryChange}> {/* Dropdown for category selection */}
        <option value="any">Any</option>
        <option value="Programming">Programming</option>
        <option value="Miscellaneous">Miscellaneous</option>
        <option value="Dark">Dark</option>
        <option value="Pun">Pun</option>
        <option value="Spooky">Spooky</option>
        <option value="Christmas">Christmas</option>
      </select>
      </div>

      {/* Anzeige der gewählten Kategorie */}
      <div>
        <p>The selected category is: {category}</p>
      </div>

      <div>
         <p>{joke}</p> {/* Display the fetched joke */}
      </div>
     

    </>
  );
}

export default App; // Export the App component as the default export