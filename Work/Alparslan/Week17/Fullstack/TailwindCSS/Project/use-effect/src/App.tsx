
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [category, setCategory] = useState('any');
  const [joke, setJoke] = useState('');
  const [color, setColor] = useState('black');

  const colors = ['black', 'red', 'green', 'blue', 'yellow'];

  const onCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColor(prevColor => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      })
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <h1 style={{ color }}>Hello World!</h1>
      <div>
        <select onChange={onCategoryChange} value={category}>
          <option value="any">Any</option>
          <option value="programming">Programming</option>
          <option value="pun">Pun</option>
          <option value="dark">Dark</option>
          <option value="misc">Misc</option>
        </select>
      </div>
      <div>
        <p>The selected category is: {category}</p>
      </div>
      <div>
        <p>Joke: {joke}</p>
      </div>
    </>
  )
}

export default App
