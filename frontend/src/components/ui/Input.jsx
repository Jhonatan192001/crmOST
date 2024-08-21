import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

const Inputs = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  errorMessage,
  className,
  icon: Icon,
  iconPosition = "left",
  ...props
}) => {
  const id = `input-${name}`

  return (
    <div className="relative">
      <div className="relative rounded-md shadow-sm">
        {Icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        )}
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={cn(
            "block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6",
            errorMessage && "ring-red-500 focus:ring-red-500",
            Icon && iconPosition === "left" && "pl-10",
            Icon && iconPosition === "right" && "pr-10",
            className
          )}
          {...props}
        />
        {Icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        )}
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>{errorMessage}</p>
      )}
    </div>

  );
};

Inputs.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(["left", "right"]),
};

export default Inputs;
