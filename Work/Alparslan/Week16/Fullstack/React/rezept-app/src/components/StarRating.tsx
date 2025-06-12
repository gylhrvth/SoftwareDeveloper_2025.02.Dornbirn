
type StarRatingProps = {
    value: number;
    max?: number;
    onChange?: (value: number) => void;
};

export default function StarRating({ value, max = 5, onChange }: StarRatingProps) {
    return (
        <div style={{ display: "flex", gap: 4 }}>
            {Array.from({ length: max }).map((_, i) => (
            <span
                key={i}
                style={{
                cursor: onChange ? "pointer" : "default",
                fontSize: "1.5rem",
                color: i < value ? "#FFD600" : "#ccc",
                transition: "color 0.2s"
            }}
            onClick={() => onChange && onChange(i + 1)}
            role={onChange ? "button" : undefined}
            aria-label={`Bewertung: ${i + 1} Sterne`}
            >
            ★
            </span>
        ))}
    </div>
  );
}

