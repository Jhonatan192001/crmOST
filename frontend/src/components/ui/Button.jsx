import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

const Button = ({
  children,
  className,
  icon: Icon,
  iconPosition = "left",
  ...props
}) => {
  return (
    <button
      className={cn(
        "w-full py-2 px-4 bg-[#043F61] text-white hover:bg-[#083344] font-bold flex items-center justify-center",
        Icon && iconPosition === "left" ? "flex-row" : "flex-row-reverse",
        className
      )}
      {...props}
    >
      {Icon && (
        <Icon
          className={cn("w-5 h-5", iconPosition === "left" ? "mr-2" : "ml-2")}
        />
      )}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(["left", "right"]),
};

export default Button;
