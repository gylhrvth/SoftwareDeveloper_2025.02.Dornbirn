

function Greeting(props: { name: string; age: number }) {
    return (
    <h2>
        Hello, {props.name}! You are {props.age} years old.
    </h2>
    );
}

export default Greeting;