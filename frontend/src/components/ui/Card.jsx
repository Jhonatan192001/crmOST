import { cn } from "../../lib/utils";
import PropTypes from "prop-types";

const Card = ({ title, children, footer, className, ...props }) => {
  return (
    <div
      className={cn("bg-white shadow-md rounded-lg p-6", className)}
      {...props}
    >
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <div className="content mb-4">{children}</div>
      {footer && <div className="footer border-t pt-4">{footer}</div>}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.string,
  className: PropTypes.string,
};

export default Card;
