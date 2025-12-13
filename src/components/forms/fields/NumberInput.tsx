type NumberInputProps = {
    label: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (value: number) => void;
};

export default function NumberInput({
    label,
    value,
    min,
    max,
    step = 1,
    onChange,
}: NumberInputProps) {
    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <label style={{ width: 120 }}>{label}:</label>
            <input
                type="number"
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{ flex: 1, padding: 4 }}
            />
        </div>
    );
}
