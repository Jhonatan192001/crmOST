import { useState } from "react";
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

const DataTableContainer = ({ data, columns }) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <SearchBar
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
      />
      <Table table={table} />
      <Pagination table={table} />
    </div>
  );
};

DataTableContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTableContainer;
