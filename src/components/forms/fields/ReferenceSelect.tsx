import { useState } from "react";
import type { Reference } from "../../../models/types";

type ReferenceSelectProps = {
  label: string;
  value: string;
  vanillaOptions: Reference[];
  customOptions: Reference[];
  onChange: (className: string) => void;
  hint?: string;
};

const FREE_TEXT_VALUE = "__free_text__";

// Dropdown qui mélange vanilla + custom (chargé via le registre), avec une
// option "Autre (saisie libre)" pour les cas où l'élément vient d'un mod
// non encore importé dans le registre.
export default function ReferenceSelect({
  label,
  value,
  vanillaOptions,
  customOptions,
  onChange,
  hint,
}: ReferenceSelectProps) {
  const allOptions = [...vanillaOptions, ...customOptions];
  const matchesKnown = allOptions.some((o) => o.className === value);
  const [freeTextMode, setFreeTextMode] = useState(!matchesKnown && value !== "");

  const selectValue = freeTextMode ? FREE_TEXT_VALUE : value;

  return (
    <div className="field-row">
      <label className="field-label">{label}</label>
      <div className="field-input-group">
        <select
          value={selectValue}
          onChange={(e) => {
            if (e.target.value === FREE_TEXT_VALUE) {
              setFreeTextMode(true);
              onChange("");
            } else {
              setFreeTextMode(false);
              onChange(e.target.value);
            }
          }}
          className="field-input"
        >
          <option value="" disabled>
            -- choisir --
          </option>
          {vanillaOptions.length > 0 && (
            <optgroup label="Vanilla">
              {vanillaOptions.map((o) => (
                <option key={o.className} value={o.className}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          )}
          {customOptions.length > 0 && (
            <optgroup label="Custom (registre)">
              {customOptions.map((o) => (
                <option key={o.className} value={o.className}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          )}
          <option value={FREE_TEXT_VALUE}>Autre (saisie libre)...</option>
        </select>
        {freeTextMode && (
          <input
            type="text"
            value={value}
            placeholder="NomDeClasseExact"
            onChange={(e) => onChange(e.target.value)}
            className="field-input"
          />
        )}
      </div>
      {hint && <span className="field-hint">{hint}</span>}
    </div>
  );
}
