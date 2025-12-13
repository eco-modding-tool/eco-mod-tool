type StringInputProps = {
  label: string;
  value: string;
  onChange?: (val: string) => void;
  readonly?: boolean;
};

export default function StringInput({ label, value, onChange, readonly }: StringInputProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
      <label style={{ width: 120 }}>{label}:</label>
      <input
        type="text"
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readonly}
        style={{
          flex: 1,
          padding: 4,
          backgroundColor: readonly ? "#eee" : "white",
          color: readonly ? "#666" : "#000",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}
