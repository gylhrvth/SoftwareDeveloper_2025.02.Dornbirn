
import './App.css'

import { getImageUrl } from './Utils.tsx';

interface AvatarProps {
  person: {
    name: string;
    imageId: string;
  };
  size: number;
}

//Single Object reading
function Avatar(props:AvatarProps) {
  return (
    <img
      className="avatar"
      src={getImageUrl(props.person)}
      alt={props.person.name}
      width={props.size}
      height={props.size}
    />
  );
}

//Destructuring the props
function Avatar02 ({ person, size }: AvatarProps) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  )
}


export default function Profile() {
  return (
    <div>
    <Avatar 
      person={{ name: 'Lin Yang', imageId: '1bX5QH6'}}
      size={100}
    />

     <Avatar02 
      person={{ name: 'Lin Yang', imageId: '1bX5QH6'}}
      size={100}
    />
    </div>
  );
}