import SalesGoalsChart from "../../components/BarChart";
import WeeklySalesChart from "../../components/CircleChart";
import Stats from "../../components/stats";

const AdminHome = () => {
  const salesGoalsData = [20, 30, 40, 35, 25, 45, 55, 65, 50, 40, 35, 45];
  const newCustomersPercentage = 65;

  return (
      <div className="min-h-full">
          <div className="container mx-auto">
              <Stats />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <SalesGoalsChart data={salesGoalsData} />
                  <WeeklySalesChart newCustomersPercentage={newCustomersPercentage} />
              </div>
          </div>
      </div>
  )
}

export default AdminHome;
