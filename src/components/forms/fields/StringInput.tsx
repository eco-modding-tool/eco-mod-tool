type StringInputProps = {
  label: string;
  value: string;
  onChange?: (val: string) => void;
  readonly?: boolean;
  hint?: string;
};

export default function StringInput({ label, value, onChange, readonly, hint }: StringInputProps) {
  return (
    <div className="field-row">
      <label className="field-label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readonly}
        className={`field-input ${readonly ? "field-input-readonly" : ""}`}
      />
      {hint && <span className="field-hint">{hint}</span>}
    </div>
  );
}
