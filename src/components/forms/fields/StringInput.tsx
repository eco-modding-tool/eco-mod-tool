type StringInputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
};

export default function StringInput({
    label,
    value,
    onChange,
}: StringInputProps) {
    return (
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <label style={{ minWidth: "120px" }}>{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
