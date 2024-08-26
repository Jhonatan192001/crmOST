import PropTypes from "prop-types";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from '../ui/Card';

ChartJS.register(ArcElement, Tooltip, Legend);

const WeeklySalesChart = ({ newCustomersPercentage }) => {
  const data = {
    datasets: [{
      data: [newCustomersPercentage, 100 - newCustomersPercentage],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(200, 200, 200, 0.8)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(200, 200, 200, 1)'
      ],
      borderWidth: 1,
    }],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <Card className="w-full p-4">
      <h2 className="text-lg font-semibold mb-4">Ingreso de Clientes</h2>
      <div className="text-sm text-gray-500 mb-2">% de clientes Semanales</div>
      <div className="relative" style={{ height: '300px' }}>
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-3xl font-bold">{newCustomersPercentage}%</span>
          <span className="text-sm text-gray-500">Total de nuevos clientes</span>
        </div>
      </div>
    </Card>
  );
};

WeeklySalesChart.propTypes = {
   newCustomersPercentage: PropTypes.string,
}

export default WeeklySalesChart;