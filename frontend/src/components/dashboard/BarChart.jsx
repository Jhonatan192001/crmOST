import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Card from "../ui/Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesGoalsChart = ({ data, period = "Trimestral" }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Metas de ventas",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "% Ventas Mensuales",
        },
      },
    },
  };

  const chartData = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    datasets: [
      {
        label: "Ventas",
        data: data,
        backgroundColor: "rgba(100, 60, 180, 0.8)",
      },
    ],
  };

  return (
    <Card className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Metas de ventas</h2>
        <select className="border rounded p-1">
          <option>{period}</option>
        </select>
      </div>
      <Bar options={options} data={chartData} />
    </Card>
  );
};

SalesGoalsChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  period: PropTypes.string,
};

export default SalesGoalsChart;
