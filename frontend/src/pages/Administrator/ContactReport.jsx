import BarChart from "../../components/dashboard/BarChart";
import CircleChart from "../../components/dashboard/CircleChart";

const ContactReport = () => {
  const visitorData = {
    weekly: [20, 25, 30, 35, 40, 45, 50],
    monthly: [100, 150, 200, 180, 220, 250, 300, 280, 260, 240, 220, 200],
    quarterly: [150, 217, 280, 220],
    yearly: [218],
  };

  const acquisitionData = {
    labels: ["Social", "Organic Search", "Direct"],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(255, 206, 86, 0.8)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <BarChart
          data={visitorData}
          title="Visitas de la página"
          yAxisLabel="Número de visitantes"
          backgroundColor="rgba(54, 162, 235, 0.8)"
          periods={["Semanal", "Mensual", "Trimestral", "Anual"]}
        />
        <BarChart
          data={visitorData}
          title="Visitas de la página"
          yAxisLabel="Número de visitantes"
          backgroundColor="rgba(54, 162, 235, 0.8)"
          periods={["Semanal", "Mensual", "Trimestral", "Anual"]}
        />
        <CircleChart
          data={acquisitionData}
          title="ACQUISION"
          showLegend={true}
          height="400px"
        />
      </div>
    </div>
  );
};

export default ContactReport;
