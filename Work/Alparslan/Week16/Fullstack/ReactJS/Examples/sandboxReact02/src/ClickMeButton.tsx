

function ClickMeButton(props: { clickEvent: (name: string) => void; name: string }) {
  return (
  <button onClick={() => props.clickEvent(props.name)}>
  Click me {props.name}, damn it!!
  </button>
)
}

export default ClickMeButton;