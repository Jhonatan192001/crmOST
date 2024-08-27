import PropTypes from 'prop-types';

const DateRangeFilter = ({ value, onChange, placeholder }) => {
  const [startDate, endDate] = value ? value.split(',') : ['', ''];

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    onChange(`${newStartDate},${endDate}`);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    onChange(`${startDate},${newEndDate}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        className="border border-gray-300 rounded-md px-2 py-1 text-sm"
        placeholder={`${placeholder} (inicio)`}
      />
      <span className="text-gray-500">a</span>
      <input
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        className="border border-gray-300 rounded-md px-2 py-1 text-sm"
        placeholder={`${placeholder} (fin)`}
      />
    </div>
  );
};

DateRangeFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default DateRangeFilter;