import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

const Label = ({ name, children, className, required, ...props }) => {
  return (
    <label
      htmlFor={name}
      className={cn(
        "block text-md font-bold leading-6 text-gray-900 mb-2",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  required: PropTypes.bool,
};

export default Label;
