import './App.css'; // Importiere CSS-Stile

// Importiere das Bild von Son Goku
import gokuImage from './assets/SonGoku_Smiling.png'; // Importiere das Bild


// to add Picture in React, you need to import the image file and use it in an <img> tag inside a {importName}.
// This is a simple React component that displays an image of Son Goku smiling.
const IMGLocal = () => {
  return (
   <img className='pic' src={gokuImage} alt="Son Goku is smiling with closed eyes" />
  );
}

const IMGUprops = (props) => {
  return (
    <img 
      className='pic' 
      src={props.filename} 
      alt={props.size ? `Size: ${props.size}` : 'Unknown size'} 
    />
  );
}


// This is a simple React component that displays an image of Son Goku smiling from a URL.
// It uses an external URL to fetch the image. THE LINK OF THE IMAGE MUST BE PUBLICLY ACCESSIBLE and has to end with .png, .jpg, etc.
// If the image is not publicly accessible, it will not be displayed.
// this does not require importing the image file, as it directly uses the URL in the src attribute of the <img> tag.

const IMGUrl = () => {
  return (
<img className='pic' src="https://i.imgur.com/8gmeb2F.png" alt="Son Goku is smiling" />
  );
}

export function App() {

  // This is a list of image URLs that will be displayed in the app.
  // The images are a mix of local and external URLs.
    const imgList = [
    '/son.png', // local image from public folder
    'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    'https://www.w3schools.com/w3images/lights.jpg',
  ];

  return (

    <div className="app">
      <h1>Welcome to my app</h1>
      <IMGLocal />
      <IMGUrl />
      <IMGUprops filename="/son.png" size="large" /> 
      <div style={{width: '100%', height: '0.2rem', backgroundColor: 'blue', margin: '0.2rem 0'}}></div>
      <h2>Image List</h2>
      {/* This maps over the imgList array and renders an IMGUprops component for each image URL. */
      /* The key prop is used to uniquely identify each component in the list. */}
      {/* The filename prop is passed to the IMGUprops component, which will display the image. */}
      
      {imgList.map((img, index) => (
        <IMGUprops key={index} filename={img} size="medium" />
      ))} 
    </div>
  );
}



