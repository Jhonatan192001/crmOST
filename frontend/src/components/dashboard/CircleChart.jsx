import PropTypes from "prop-types";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from '../ui/Card';

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart = ({ 
  data,
  title = "Gráfico Circular",
  subtitle,
  centerText,
  showLegend = false,
  cutout = '70%',
  height = '300px'
}) => {
  const options = {
    cutout: cutout,
    plugins: {
      legend: {
        display: showLegend,
        position: 'bottom'
      },
      tooltip: {
        enabled: true
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <Card className="w-full p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {subtitle && <div className="text-sm text-gray-500 mb-2">{subtitle}</div>}
      <div className="relative" style={{ height: height }}>
        <Doughnut data={data} options={options} />
        {centerText && (
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold">{centerText.primary}</span>
            {centerText.secondary && (
              <span className="text-sm text-gray-500">{centerText.secondary}</span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

CircleChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
      backgroundColor: PropTypes.arrayOf(PropTypes.string),
      borderColor: PropTypes.arrayOf(PropTypes.string),
      borderWidth: PropTypes.number
    }))
  }).isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  centerText: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string
  }),
  showLegend: PropTypes.bool,
  cutout: PropTypes.string,
  height: PropTypes.string
};

export default CircleChart;