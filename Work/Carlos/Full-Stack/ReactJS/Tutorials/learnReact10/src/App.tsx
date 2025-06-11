import Avatar from './Avatar';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="card"
      style={{
        border: '2px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        display: 'inline-block',
        background: '#fff'
      }}
    >
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}