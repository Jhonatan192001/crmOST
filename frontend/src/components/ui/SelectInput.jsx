import PropTypes from "prop-types";

const SelectFilter = ({ value, onChange, options, placeholder }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="px-4 py-2 rounded-md border-2 border-[#043F61]/50 focus:ring-1 focus:ring-[#043F61]"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

SelectFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
};

SelectFilter.defaultProps = {
  placeholder: "Seleccionar...",
};

export default SelectFilter;