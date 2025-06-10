import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [category, setCategory] = useState("any");
  const [joke, setJoke] = useState("");
  const [color, setColor] = useState("black");

  const colors = ["Black", "Red", "green", "violet", "azure", "brown", "midnightblue"];

  const onCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  }

} 