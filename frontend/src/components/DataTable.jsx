import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Table from "./ui/Table";
import SearchBar from "./ui/Search";
import Pagination from "./ui/Pagination";

const DataTableContainer = ({ data, columns, customFilters }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [filters, setFilters] = useState({});

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return item[key] === value;
      });
    });
  }, [data, filters]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <div>
      <div className="flex items-center space-x-4 p-2 rounded-lg mb-4">
        <div className="flex-grow">
          <SearchBar
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            placeholder="Buscar..."
          />
        </div>
        {customFilters &&
          customFilters.map((filter) => (
            <filter.component
              key={filter.name}
              value={filters[filter.name] || ""}
              onChange={(e) => handleFilterChange(filter.name, e.target.value)}
              options={filter.options}
              placeholder={filter.placeholder}
            />
          ))}
      </div>
      <Table table={table} />
      <Pagination table={table} />
    </div>
  );
};

DataTableContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  customFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      component: PropTypes.elementType.isRequired,
      options: PropTypes.array,
      placeholder: PropTypes.string,
    })
  ),
};

export default DataTableContainer;