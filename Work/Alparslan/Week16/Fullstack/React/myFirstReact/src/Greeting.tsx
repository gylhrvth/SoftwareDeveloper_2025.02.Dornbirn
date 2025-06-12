type GreetingProps = {
    name: string
}

export function Greeting({ name }: GreetingProps) {
    return (
        <div>
            Hallo, { name }! Schön, dich zu sehen!
        </div>
    );
}
