import { useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import type { HeaderProps } from './components/Header/Header_Types';




function App() {

  const headerData: HeaderProps = {
    title: '💕Mein Header💕',
    subtitle: '💕 Mit Props erstellt 💕',
  };

  const handelClick = () => {
    console.log('The button has been pressed.');
  };

  const secondHandelClick = () => {
    console.log('The second button has been pressed.');
  };

  const thirdHandelClick = () => {
    console.log('The third button has been pressed.');

  };

  const forthHandelClick = (t: Date) => {
    console.log('The third button has been pressed.', t);

  };

  const alertHandelClick = () => {
    alert(`You've presst the alert Button. Help is comming soon!`);
    console.log('The alert button has been pressed.');
  }

  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn(!isOn);

  }
  return (
    <>

      <Header {...headerData} />

      

      <div>
        <Img
        src="./src/assets/somePicture.jpg"
        alt="some Picture"
        width={700}
        className='somePicture'
      />

        <h1>My first Button</h1>
        <button onClick={handelClick} className='Btn'>Klick here!</button>
        <button onClick={secondHandelClick} className='Btn' >Press this button.</button>
        <button onClick={thirdHandelClick} className='Btn white'>Another button</button>
        <button onClick={alertHandelClick} className='Btn alert'>alert button</button>

        <button onClick={toggle} className={`Btn toggle ${isOn ? 'on' : 'off'}`}>
          {isOn ? 'ON' : 'OFF'}
        </button>
        <Button label="Ich bin grossartig! Und bescheiden." />
        <Button label="Another Button" className='white' onClick={forthHandelClick} />
        <Button label='alert Button' className='alert' />

      </div>
    </>
  );
}



interface ButtonProps {
  label: string,
  className?: string,
  onClick?: (now: Date) => Promise<void> | void,
}

function Button(props: ButtonProps) {
  return (
    <button className={`Btn ${props.className ? props.className : ''}`}
      onClick={() => props.onClick ? props.onClick(new Date()) : {}}
    >{props.label}</button>
  )
}


interface ImgProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

function Img({ src, alt, width, height, className = '' }: ImgProps) {

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );

}


export default App; 