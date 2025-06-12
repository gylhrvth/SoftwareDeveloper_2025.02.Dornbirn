

export function Button({ 
    title, 
    color = 'blue', 
    eventHandler 
  }: { 
    title: string, 
    color?: string, 
    eventHandler?: (message: string) => void 
  }) {

  return (
    <button className={`bigButton ${color}`} onClick={() => eventHandler?.(`Danke dass du auf ${title} geklickt hast!`)}>
      <span>{ title.toUpperCase() }</span>
    </button>
  )
}