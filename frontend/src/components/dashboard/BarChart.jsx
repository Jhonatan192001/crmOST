import { useState, useMemo } from 'react';
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

const BarChart = ({ 
  data, 
  title = "Gráfico de Barras",
  yAxisLabel = "Valores",
  backgroundColor = "rgba(100, 60, 180, 0.8)",
  periods = ["Semanal", "Mensual", "Trimestral", "Anual"]
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);

  const getPeriodData = (periodType) => {
    switch(periodType) {
      case "Semanal":
        return {
          labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
          data: data.weekly || data.slice(0, 7)
        };
      case "Mensual":
        return {
          labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
          data: data.monthly || data
        };
      case "Trimestral":
        return {
          labels: ["Q1", "Q2", "Q3", "Q4"],
          data: data.quarterly || [
            data.slice(0, 3).reduce((a, b) => a + b, 0) / 3,
            data.slice(3, 6).reduce((a, b) => a + b, 0) / 3,
            data.slice(6, 9).reduce((a, b) => a + b, 0) / 3,
            data.slice(9, 12).reduce((a, b) => a + b, 0) / 3
          ]
        };
      case "Anual":
        return {
          labels: ["Anual"],
          data: data.yearly || [data.reduce((a, b) => a + b, 0) / data.length]
        };
      default:
        return { labels: [], data: [] };
    }
  };

  const chartData = useMemo(() => {
    const { labels, data: periodData } = getPeriodData(selectedPeriod);
    return {
      labels,
      datasets: [
        {
          label: title,
          data: periodData,
          backgroundColor,
        },
      ],
    };
  }, [selectedPeriod, data, title, backgroundColor]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
  };

  return (
    <Card className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <select 
          className="border rounded p-1"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          {periods.map(period => (
            <option key={period} value={period}>{period}</option>
          ))}
        </select>
      </div>
      <Bar options={options} data={chartData} />
    </Card>
  );
};

BarChart.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.shape({
      monthly: PropTypes.arrayOf(PropTypes.number),
      quarterly: PropTypes.arrayOf(PropTypes.number),
      yearly: PropTypes.arrayOf(PropTypes.number),
    }),
  ]).isRequired,
  title: PropTypes.string,
  yAxisLabel: PropTypes.string,
  backgroundColor: PropTypes.string,
  periods: PropTypes.arrayOf(PropTypes.string),
};

export default BarChart;