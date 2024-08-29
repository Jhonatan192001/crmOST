import { useState } from 'react';
import { TabsContainer, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import Card from '../../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Table from '../../components/ui/Table';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

const ReportsAndAnalysis = () => {
  const [timeFrame, setTimeFrame] = useState('monthly');

  // Datos de ejemplo
  const salesData = {
    monthly: [
      { name: 'Ene', ventas: 4000 }, { name: 'Feb', ventas: 3000 },
      { name: 'Mar', ventas: 5000 }, { name: 'Abr', ventas: 4500 },
      { name: 'May', ventas: 6000 }, { name: 'Jun', ventas: 5500 },
    ],
    quarterly: [
      { name: 'Q1', ventas: 12000 }, { name: 'Q2', ventas: 16000 },
      { name: 'Q3', ventas: 14000 }, { name: 'Q4', ventas: 18000 },
    ],
    yearly: [
      { name: '2021', ventas: 50000 }, { name: '2022', ventas: 60000 },
      { name: '2023', ventas: 75000 },
    ],
  };

  const retentionData = [
    { name: 'Ene', tasa: 95 }, { name: 'Feb', tasa: 93 },
    { name: 'Mar', tasa: 97 }, { name: 'Abr', tasa: 94 },
    { name: 'May', tasa: 96 }, { name: 'Jun', tasa: 98 },
  ];

  const productPerformanceData = [
    { name: 'Cámaras de Seguridad', value: 400 },
    { name: 'Sistemas de Alarma', value: 300 },
    { name: 'Monitoreo 24/7', value: 300 },
    { name: 'Control de Acceso', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const clientRetentionColumns = [
    { header: 'Cliente', accessorKey: 'client' },
    { header: 'Tiempo de Contrato', accessorKey: 'contractTime' },
    { header: 'Valor del Contrato', accessorKey: 'contractValue' },
    { header: 'Estado', accessorKey: 'status' },
  ];

  const clientRetentionData = [
    { client: 'TechCorp', contractTime: '2 años', contractValue: '$10,000', status: 'Activo' },
    { client: 'SecureBank', contractTime: '3 años', contractValue: '$15,000', status: 'Activo' },
    { client: 'SafeMall', contractTime: '1 año', contractValue: '$5,000', status: 'En riesgo' },
    { client: 'CityCouncil', contractTime: '5 años', contractValue: '$25,000', status: 'Activo' },
  ];

  const clientRetentionTable = useReactTable({
    data: clientRetentionData,
    columns: clientRetentionColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Reportes y Análisis</h1>
      
      <TabsContainer defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Reportes de Ventas</TabsTrigger>
          <TabsTrigger value="retention">Retención de Clientes</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento de Productos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales">
          <Card title="Reporte de Ventas">
            <div className="mb-4">
              <select 
                value={timeFrame} 
                onChange={(e) => setTimeFrame(e.target.value)}
                className="border rounded p-2"
              >
                <option value="monthly">Mensual</option>
                <option value="quarterly">Trimestral</option>
                <option value="yearly">Anual</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData[timeFrame]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ventas" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
        
        <TabsContent value="retention">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Tasa de Retención de Clientes">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="tasa" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Detalles de Retención de Clientes">
              <Table table={clientRetentionTable} />
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card title="Rendimiento de Productos y Servicios">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productPerformanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </TabsContainer>
    </div>
  );
};

export default ReportsAndAnalysis;