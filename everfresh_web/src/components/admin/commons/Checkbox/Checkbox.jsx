import "./Checkbox.scss";

export default function Checkbox({ sx, label, borderColor = '#666666', selectedColor = "#000000", ...props }) {
  return (
    <div
      className="common-checkbox"
    >
      <input
        id="common-checkbox"
        type="checkbox"
        style={{...sx, '--selected-color': selectedColor, '--border-color': borderColor}}
        {...props}
      />
      {label && <label htmlFor="common-checkbox">{label}</label>}
    </div>
  );
}
