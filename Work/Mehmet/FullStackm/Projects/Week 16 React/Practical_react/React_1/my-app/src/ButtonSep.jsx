import { useState } from 'react';
import './app.css';

// Seperate Count Buttons 
export function ButtonImport() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button  onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}



// Together synced Buttons
export function ButtonImportSync() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  function ButtonSync(){
    return (
      <button onClick={handleClick}>
        Clicked {count} times
      </button>
    );
  }
  return (
    <div className='button-sync'>
        <ButtonSync count={count} onClick={handleClick}/>
        <ButtonSync count={count} onClick={handleClick}/>
    </div>
  );
}