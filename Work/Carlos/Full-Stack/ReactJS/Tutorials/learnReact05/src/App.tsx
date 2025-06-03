
import { getImageUrl } from './utils.tsx';

interface AvatarProps {
  person: {
    name: string;
    imageId: string;
    altText?: string;
  };
  size: number;
}


function Avatar( props : AvatarProps) {

  return (
    <div style={{ width: props.size}}>
      <img
        className="avatar"
        src={getImageUrl(props.person.imageId, props.size)}
        width={props.size}
        height={props.size}
        alt={props.person.altText || props.person.name}
        />
      <h2 style={{marginBlock: '0', fontSize: props.size / 10, textAlign: 'center'}}>{props.person.name}</h2>
    </div>
  )

}

const personList = [
  {
    name: 'Katsuko Saruhashi',
    imageId: 'YfeOqp2',
    size: 400,
  },
    {
    name: 'Katsuko Saruhashi',
    imageId: 'YfeOqp2',
    size: 200,
  },
    {
    name: 'Katsuko Saruhashi',
    imageId: 'YfeOqp2',
    size: 100,
  },
  {
    name: 'Aklilu Lemma',
    imageId: 'OKS67lh'
  }
];

export default function Profile() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-end'}}>
      {
        personList.map((person, index) => (
          <Avatar
            key={index}
            size={person.size || 80}
            person={{
              name: person.name,
              imageId: person.imageId
            }}
          />
        ))
      }

{/*       
      <Avatar
        size={400}
        person={{
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />


      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      /> */}
    </div>
  );
}





