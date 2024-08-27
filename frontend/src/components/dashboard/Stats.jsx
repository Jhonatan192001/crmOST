import PropTypes from "prop-types";
import Card from "../ui/Card";

const StatCard = ({ icon, number, label, color }) => (
  <div className="flex items-center p-4">
    <div className={`p-3 rounded-full mr-4 ${color}`}>{icon}</div>
    <div>
      <div className="text-3xl font-semibold">{number}</div>
      <div
        className={`text-sm ${color
          .replace("bg-", "text-")
          .replace("-100", "-600")}`}
      >
        {label}
      </div>
    </div>
  </div>
);

StatCard.propTypes = {
  icon: PropTypes.element,
  number: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
};

const Stats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className={`${stat.bgColor} shadow-lg`}>
          <StatCard
            icon={stat.icon}
            number={stat.number}
            label={stat.label}
            color={stat.color}
          />
        </Card>
      ))}
    </div>
  );
};

Stats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element.isRequired,
      number: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      bgColor: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Stats;