import BarChart from "../../components/dashboard/BarChart";
import CircleChart from "../../components/dashboard/CircleChart";
import { DollarSign, Clock, Briefcase } from "lucide-react";
import Stats from "../../components/dashboard/Stats";

const AdminHome = () => {
  const salesStats = [
    {
      icon: <DollarSign className="text-green-500" size={24} />,
      number: "500",
      label: "Ventas Realizadas",
      color: "bg-green-100",
      bgColor: "bg-green-50"
    },
    {
      icon: <Clock className="text-blue-500" size={24} />,
      number: "20",
      label: "Ventas Pendientes",
      color: "bg-blue-100",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Briefcase className="text-red-500" size={24} />,
      number: "15",
      label: "Ventas Denegadas",
      color: "bg-red-100",
      bgColor: "bg-red-50"
    }
  ];

  const salesData = {
    weekly: [20, 25, 30, 35, 40, 45, 50],
    monthly: [20, 30, 40, 35, 25, 45, 55, 65, 50, 40, 35, 45],
    quarterly: [30, 35, 57, 40],
    yearly: [42]
  };

  const newCustomersData = {
    labels: ['Nuevos Clientes', 'Clientes Existentes'],
    datasets: [{
      data: [65, 35],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(200, 200, 200, 0.8)'
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
        <Stats stats={salesStats}/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <BarChart 
            data={salesData} 
            title="Metas de ventas" 
            yAxisLabel="% Ventas"
            backgroundColor="rgba(100, 60, 180, 0.8)"
          />
          <CircleChart 
            data={newCustomersData}
            title="Ingreso de Clientes"
            subtitle="% de clientes Semanales"
            centerText={{
              primary: "65%",
              secondary: "Total de nuevos clientes"
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminHome;