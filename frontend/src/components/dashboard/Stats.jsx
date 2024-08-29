import PropTypes from "prop-types";
import Card from "../ui/Card";

const Stats = ({ icon, number, label, color, bgColor }) => (
  <Card className={`${bgColor} shadow-lg`}>
    <div className="flex items-center p-4">
      <div className={`p-3 rounded-full mr-4 ${color}`}>{icon}</div>
      <div>
        <div className="text-2xl font-semibold">{number}</div>
        <div className={`text-sm ${color.replace("bg-", "text-").replace("-100", "-600")}`}>
          {label}
        </div>
      </div>
    </div>
  </Card>
);

Stats.propTypes = {
  icon: PropTypes.element,
  number: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  bgColor: PropTypes.string,
};

export default Stats;