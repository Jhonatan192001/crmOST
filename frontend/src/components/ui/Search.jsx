import PropTypes from "prop-types";

import { Search } from 'lucide-react';

const SearchBar = ({ globalFilter, onGlobalFilterChange }) => {
  return (
    <div className="flex items-center w-96 mb-4">
      <Search className="text-gray-400 mr-2" />
      <input
        value={globalFilter ?? ''}
        onChange={(e) => onGlobalFilterChange(e.target.value)}
        className="border p-2 rounded-3xl w-full"
        placeholder="Buscar..."
      />
    </div>
  );
};

SearchBar.propTypes = {
  globalFilter: PropTypes.string,
  onGlobalFilterChange: PropTypes.func.isRequired,
}

export default SearchBar;