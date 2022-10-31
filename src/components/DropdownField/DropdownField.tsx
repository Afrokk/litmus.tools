import "./DropdownField.sass";

type DropdownFieldProps = {
  label: string;
  id: string;
  defaultSelected: string;
  options: string[];
};

const DropdownField = ({
  label,
  id,
  defaultSelected,
  options,
}: DropdownFieldProps): JSX.Element => {
  return (
    <div className="DropdownField">
      <label>{label}</label>
      <select id={id} defaultValue={defaultSelected}>
        {options.map((o, idx) => (
          <option key={idx} value={o}>
            {" "}
            {o}{" "}
          </option>
        ))}
      </select>
    </div>
  );
};

DropdownField.defaultProps = {
  label: "",
  id: "",
  defaultSelected: undefined,
  options: [],
};

export default DropdownField;
