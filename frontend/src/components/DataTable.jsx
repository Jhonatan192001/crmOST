import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Table from "./ui/Table";
import Pagination from "./ui/Pagination";
import SearchBar from "./ui/Search";

const DataTableContainer = ({ data, columns, customFilters, onRowClick }) => {
  const [filters, setFilters] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    if (customFilters) {
      const initialFilters = customFilters.reduce((acc, filter) => {
        acc[filter.name] = "";
        return acc;
      }, {});
      setFilters(initialFilters);
    }
  }, [customFilters]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Aplicar filtro global
      if (globalFilter && !Object.values(item).some(val => 
        String(val).toLowerCase().includes(globalFilter.toLowerCase())
      )) {
        return false;
      }
      
      // Aplicar filtros personalizados
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(item[key]).toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [data, filters, globalFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <SearchBar
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          placeholder="Buscar..."
          className="w-full"
        />
        {customFilters && (
          <div className="flex flex-wrap gap-2">
            {customFilters.map((filter) => (
              <filter.component
                key={filter.name}
                value={filters[filter.name] || ""}
                onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                options={filter.options}
                placeholder={filter.placeholder}
              />
            ))}
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <Table table={table} onRowClick={onRowClick} />
        <Pagination table={table} />
      </div>
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
  onRowClick: PropTypes.func,
};

export default DataTableContainer;