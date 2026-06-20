type SelectInputProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

export default function SelectInput({ label, value, options, onChange }: SelectInputProps) {
  return (
    <div className="field-row">
      <label className="field-label">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field-input">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
