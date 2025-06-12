
// React Hooks
import { useState, useEffect} from 'react';
import './App.css'

// Main Function
export default function App() {
// State Variables
const[category, setCategory] = useState<string>('any'); // Selected joke category
const[joke, setJoke] = useState<string>(''); // Fetched joke
const [color, setColor] = useState<string>('white'); // Color for <h1> element

//Available colors for the <h1> element
const colors: string[] = ['white', 'lightpink', 'lightgreen', 'lightblue', 'lightyellow'];

// Event Handler for category change
const onCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setCategory(event.target.value); //This function is called when the category dropdown changes
}

// The 'useEffect listens for changes in the 'category' state variable
// Whenever 'category' changes, it runs the fetchData function to get a new joke based on the selected category
useEffect(() => {
  const fetchData = async () => {
    try{
      const response = await fetch(`https://v2.jokeapi.dev/joke/${category}?type=single`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setJoke(data.joke);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchData();
  }, [category]); 
  //Category is 'any' by default, but changes when the user selects a different category
  // This is achieved by using the 'useEffect' hook, which runs the fetchData function whenever the category changes
  // When'category' changes (ex: user selects a new category), React re-runs the effect, calling fetchData() again.

  // useEffect to change the color of the <h1> element every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setColor(prevColor => { // prevColor is the current color (black by default)
        const currentIndex = colors.indexOf(prevColor); // indexOf(prevColor) finds the index of the current color (prevColor) in the colors array
        const nextIndex = (currentIndex + 1) % colors.length; // If last element, return to the first element
        // Example: If prevColor is 'black' (index 0), nextIndex will be 1 (red)
        // If prevColor is 'yellow' (index 4), than currentIndex will be 4, nextIndex will be (4+1) % 5 -> 0 (black)
        return colors[nextIndex];
      })
    }, 1000);
    return () => clearInterval(intervalId);//
  }, []
);

return(
  <>
    <h1 style={{ color }}>Le grand Joke Fetcher</h1>
    <div>
      <select onChange={onCategoryChange} value={category}>
        <option value="any">Any</option>
        <option value="programming">Programming</option>
        <option value="pun">Pun</option>
        <option value="misc">Misc</option>
      </select>
    </div>
    <br />
    <div>The selected Category is {category}</div>
    <br />
    <div>
      <p>Joke: {joke}</p>
    </div>
    <br />
    <div>
      <p>Color: {color}</p>
    </div>
  </>
)
}


