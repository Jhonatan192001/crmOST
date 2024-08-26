import PropTypes from "prop-types";

const Pagination = ({ table }) => {
  return (
    <div className="mt-4 flex justify-center">
      <nav className="flex space-x-2" aria-label="Pagination">
        {[...Array(table.getPageCount())].map((_, index) => (
          <button
            key={index}
            onClick={() => table.setPageIndex(index)}
            className={`px-3 py-1 rounded ${
              table.getState().pagination.pageIndex === index
                ? 'bg-[#043F61] hover:bg-[#083344] text-white'
                : 'bg-white border'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  table: PropTypes.object.isRequired,
};

export default Pagination;