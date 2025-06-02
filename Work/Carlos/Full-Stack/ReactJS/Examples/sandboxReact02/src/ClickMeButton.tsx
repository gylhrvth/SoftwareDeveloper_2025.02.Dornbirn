

function ClickMeButton(props: { clickEvent: () => void }) {
    return <button onClick={props.clickEvent}>Click me, damn it!</button>;
}
export default ClickMeButton;