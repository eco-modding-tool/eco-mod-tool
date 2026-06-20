type NumberInputProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

export default function NumberInput({ label, value, min, max, step = 1, onChange }: NumberInputProps) {
  return (
    <div className="field-row">
      <label className="field-label">{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="field-input"
      />
    </div>
  );
}
