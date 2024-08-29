import { useState } from 'react';
import BarChart from "../../components/dashboard/BarChart";
import CircleChart from "../../components/dashboard/CircleChart";
import { DollarSign, UserPlus, Package } from "lucide-react";
import Stats from "../../components/dashboard/Stats";
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AdminHome = () => {
  const [timeFilter, setTimeFilter] = useState('monthly');

  const salesStats = [
    {
      icon: <DollarSign className="text-green-500" size={24} />,
      number: "$45,231.89",
      label: "Ventas Totales",
      color: "bg-green-100",
      bgColor: "bg-green-50",
    },
    {
      icon: <UserPlus className="text-blue-500" size={24} />,
      number: "+2350",
      label: "Nuevos Clientes",
      color: "bg-blue-100",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Package className="text-red-500" size={24} />,
      number: "12,234",
      label: "Servicios Activos",
      color: "bg-red-100",
      bgColor: "bg-red-50",
    },
    {
      icon: <UserPlus className="text-green-500" size={24} />,
      number: "98.3%",
      label: "Tasa de Retención",
      color: "bg-green-100",
      bgColor: "bg-green-50",
    },
  ];

  const salesData = {
    weekly: [20, 25, 30, 35, 40, 45, 50],
    monthly: [20, 30, 40, 35, 25, 45, 55, 65, 50, 40, 35, 45],
    quarterly: [30, 35, 57, 40],
    yearly: [42],
  };

  const newCustomersData = {
    labels: ["Nuevos Clientes", "Clientes Existentes"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(200, 200, 200, 0.8)",
        ],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(200, 200, 200, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };

  return (
    <div className="min-h-full">
      <h1 className="text-2xl font-bold mb-4">Dashboard Principal</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {salesStats.map((stat, index) => (
          <Stats key={index} {...stat} />
        ))}
      </div>

      {/* Time Filter */}
      <div className="mb-4">
        <select 
          className="border rounded p-2"
          value={timeFilter}
          onChange={handleTimeFilterChange}
        >
          <option value="weekly">Semanal</option>
          <option value="monthly">Mensual</option>
          <option value="quarterly">Trimestral</option>
          <option value="yearly">Anual</option>
        </select>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <BarChart
          data={salesData[timeFilter]}
          title="Metas de ventas"
          yAxisLabel="% Ventas"
          backgroundColor="rgba(100, 60, 180, 0.8)"
        />
        <CircleChart
          data={newCustomersData}
          title="Ingreso de Clientes"
          subtitle={`% de clientes ${timeFilter === 'weekly' ? 'Semanales' : timeFilter === 'monthly' ? 'Mensuales' : timeFilter === 'quarterly' ? 'Trimestrales' : 'Anuales'}`}
          centerText={{
            primary: "65%",
            secondary: "Total de nuevos clientes",
          }}
          showLegend={true}
        />
      </div>

      {/* Alertas y Notificaciones */}
      {/* <div className="space-y-4">
        <Alert>
          <Bell className="h-4 w-4" />
          <AlertTitle>Alerta de Inventario</AlertTitle>
          <AlertDescription>
            El stock de cámaras modelo XYZ está por debajo del mínimo. Por favor, reabastece pronto.
          </AlertDescription>
        </Alert>
        <Alert>
          <Bell className="h-4 w-4" />
          <AlertTitle>Renovaciones Pendientes</AlertTitle>
          <AlertDescription>
            Tienes 15 clientes con suscripciones que vencen en los próximos 7 días. Revisa la lista de renovaciones.
          </AlertDescription>
        </Alert>
      </div> */}
    </div>
  );
};

export default AdminHome;