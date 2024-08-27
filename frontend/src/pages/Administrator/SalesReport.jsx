import Card from "../../components/ui/Card";
import Stats from "../../components/dashboard/Stats";
import CircleChart from "../../components/dashboard/CircleChart";
import BarChart from "../../components/dashboard/BarChart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesReport = () => {
    // Datos de ejemplo para los gráficos y estadísticas
  const monthlyData = [
    { name: 'Ene', ventas: 4000, instalaciones: 2400, mantenimientos: 2400 },
    { name: 'Feb', ventas: 3000, instalaciones: 1398, mantenimientos: 2210 },
    { name: 'Mar', ventas: 2000, instalaciones: 9800, mantenimientos: 2290 },
    { name: 'Abr', ventas: 2780, instalaciones: 3908, mantenimientos: 2000 },
    { name: 'May', ventas: 1890, instalaciones: 4800, mantenimientos: 2181 },
    { name: 'Jun', ventas: 2390, instalaciones: 3800, mantenimientos: 2500 },
    { name: 'Jul', ventas: 3490, instalaciones: 4300, mantenimientos: 2100 },
  ];

  const pieChartData = {
    labels: ['Cámaras IP', 'Cámaras Analógicas', 'Sistemas NVR', 'Accesorios'],
    datasets: [
      {
        data: [300, 50, 100, 80],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Reporte de ventas</h1>
      
      <Stats />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Ingresos Mensuales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ventas" stroke="#8884d8" />
              <Line type="monotone" dataKey="instalaciones" stroke="#82ca9d" />
              <Line type="monotone" dataKey="mantenimientos" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        
        <Card>
          <CircleChart 
            data={pieChartData}
            title="Distribución de Ventas por Tipo de Producto"
            showLegend={true}
          />
        </Card>
        
        <Card>
          <BarChart 
            data={monthlyData.map(item => item.ventas)}
            title="Ventas Mensuales"
            yAxisLabel="Ventas ($)"
          />
        </Card>
      </div>
    </div>
  );
};

export default SalesReport;