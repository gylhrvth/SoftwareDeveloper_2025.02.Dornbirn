
import './App.css'

interface AvatarProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

//2. Avatar (child) uses props to set img attributes
function Avatar(props: AvatarProps) {
  return(
  <img
    className="avatar"
    src={props.src}
    alt={props.alt}
    width={props.width ?? 100}
    height={props.height ?? 100}
  />
  )
}

//1. Profile passes attributes as props to the child <Avatar />
export default function Profile(){
  return (
    <div>
      <Avatar 
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={150}
      height={150}
      />

      <Avatar
      src="https://i.imgur.com/OKS67lhm.jpg"
      alt="A cat with a hat"
      width={120}
      height={120}
        />

      <Greeting
      name= "Lin Lanying"
      message="You must be very famous!"
        />
        <Profile02 />
    </div>
  );
}

// ======================================================================

interface GreetingProps {
  name: string;
  message: string;
}

function Greeting(props: GreetingProps) {
  return (
    <div>
      <h2>Hello, {props.name}!</h2>
      <p>Here is your message: {props.message}</p>
    </div>
  )
}

//=======================================================================


function Profile02() {
  return (
    <div>
      <Avatar02
        person={{ name: 'Ernesto Picamontes', imageId: '1bX5QH6'}}
        size={120}
      />

    </div>
  );
}

interface Avatar02Props {
  person: {name: string; imageId: string}
  size: number
}

function Avatar02(props: Avatar02Props){
  return(
  <div>
  <h2>Hello, {props.person.name}</h2>
  <h3>Here here, your imageId: {props.person.imageId}</h3>
  </div>
  )
}