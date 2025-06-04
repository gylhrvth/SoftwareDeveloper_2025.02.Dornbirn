interface InputDivsProps {
    label: string;
    id: string;
    value: number;
    onValueChange: (value: number) => void;
}

export function InputDivs({ label, id, value, onValueChange }: InputDivsProps) {
    return (
        <div className="input-group">
            <label htmlFor={id}>{label}</label>
            <input
                value={value}
                type="range"
                id={id}
                onChange={(event) => onValueChange(Number(event.target.value))}
            />
        </div>
    );
}
