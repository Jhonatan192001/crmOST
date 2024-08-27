import BarChart from "../../components/dashboard/BarChart";
import CircleChart from "../../components/dashboard/CircleChart";
import Stats from "../../components/dashboard/stats";

const SalesGenerated = () => {
    const salesData = {
        weekly: [20, 25, 30, 35, 40, 45, 50],
        monthly: [20, 30, 40, 35, 25, 45, 55, 65, 50, 40, 35, 45],
        quarterly: [30, 35, 57, 40],
        yearly: [42]
      };
    
      const newCustomersData = {
        labels: ['Ventas Incompletas', 'Ventas Completadas'],
        datasets: [{
          data: [40, 60],
          backgroundColor: [
            'rgba(255, 147, 39, 0.92)',
            'rgba(9, 186, 176, 0.63)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(200, 200, 200, 1)'
          ],
          borderWidth: 1,
        }]
      };
  return (
    <div className="min-h-full">
      <div className="container mx-auto">
        <Stats />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <BarChart
            data={salesData}
            title="Metas de ventas"
            yAxisLabel="% Ventas"
            backgroundColor="rgba(233, 40, 75, 0.8)"
          />
          <CircleChart
            data={newCustomersData}
            title="Ventas semanales"
            subtitle="% de ventas semanales"
            centerText={{
              primary: "60%",
              secondary: "Ventas semanales",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesGenerated;
