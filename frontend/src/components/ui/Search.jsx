import PropTypes from "prop-types";
import { cn } from "../../lib/utils"

const SearchBar = ({ globalFilter, onGlobalFilterChange, className, placeholder }) => {
  return (
    <input
      value={globalFilter ?? ""}
      onChange={(e) => onGlobalFilterChange(e.target.value)}
      className={cn("w-96 px-4 py-2 rounded-md border-2 border-[#043F61]/50 focus:ring-1 focus:ring-[#043F61]",className)}
      placeholder={placeholder}
      type="text"
    />
  );
};

SearchBar.propTypes = {
  globalFilter: PropTypes.string,
  onGlobalFilterChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default SearchBar;