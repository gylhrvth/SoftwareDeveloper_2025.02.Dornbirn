


export function Button({ 
    title, 
    color = 'blue', 
    eventHandler 
  }: { 
    title: string, 
    color?: string, 
    eventHandler?: (message: string) => void 
  }) {
    const style = {
        backgroundColor: color,
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '5px',
    }

  return (
    <button
      style={style}
      onClick={() => eventHandler?.(`Danke dass du auf ${title} geklickt hast!`)}
    >
      <span>{title.toUpperCase()}</span>
    </button>
  );
}
