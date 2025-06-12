
import './App.css'

  export default function App() {
    return (
    <div>
    <Profile />
    <br />
    <Profile02 />
    </div>
    )
  }

//Using destructuring:

interface Person {
  name: string;
  imageId: string;
}

interface AvatarProps {
  person: Person;
  size?: number;
}

function Avatar({ person, size = 100 }: AvatarProps) {
  return (
    <img
      className="avatar"
      src={`https://i.imgur.com/${person.imageId}.jpg`}
      alt={person.name}
      width={size}
      height={size}
      />
  )
}

  

function Profile() {
  return (
    <Avatar 
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6'}}
      size={200}
    />
  );
}

//Using props:

interface Person {
  name: string;
  imageId: string;
}

interface AvatarProps {
  person: Person;
  size?: number;
}


  function Avatar02(props: AvatarProps) { 
    return (
      <img
        className="avatar"
        src={`https://i.imgur.com/${props.person.imageId}.jpg`}
        alt={props.person.name}
        width={props.size ?? 100}
        height={props.size ?? 100}
      />
  );
  } 

  function Profile02() {
  return (
    <Avatar02 
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6'}}
      size={200}
    />
  );
}

// Explanation:

/* In this example, we use two different ways to pass props to the Avatar component.
  The first one uses destructuring to extract the properties directly from the props object.
  The second one uses the props object directly, accessing the properties with dot notation.
  Both approaches achieve the same result, but destructuring can make the code cleaner and easier to read.
  The Avatar component receives a person object and an optional size property.
  The Profile component creates a person object and passes it to the Avatar component.
  The Avatar component then renders an image with the person's name and imageId, using the size property to set the width and height of the image.
  The Avatar02 component does the same thing, but uses the props object directly instead of destructuring.
  The Avatar component is reusable and can be used with different person objects and sizes.
  The Avatar02 component is also reusable and can be used with different person objects and sizes.
  Both components can be used in the App component to display the avatars of different people.
  */







