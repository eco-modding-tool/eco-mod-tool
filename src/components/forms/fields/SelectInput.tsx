type SelectInputProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

export default function SelectInput({
  label,
  value,
  options,
  onChange,
}: SelectInputProps) {
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <label style={{ minWidth: "120px" }}>{label}</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
