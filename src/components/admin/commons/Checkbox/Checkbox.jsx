import "./Checkbox.scss";

export default function Checkbox({ sx, label, ...props }) {
  return (
    <div className="common-checkbox">
      <input
        id="common-checkbox"
        type="checkbox"
        style={sx}
        {...props}
      />
      {label && <label htmlFor="common-checkbox">{label}</label>}
    </div>
  );
}
