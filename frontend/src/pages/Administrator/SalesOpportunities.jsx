import { useState, useEffect } from 'react';
import { TabsContainer, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import BarChart from '../../components/dashboard/BarChart';
import { DollarSign, Users, FileText, Shield } from 'lucide-react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

const SalesOpportunities = () => {
  const [activeTab, setActiveTab] = useState('pipeline');

  useEffect(() => {
    // Forzar la actualización del componente después de que se monte
    setActiveTab('pipeline');
  }, []);

  const pipelineData = {
    monthly: [50000, 75000, 100000, 60000, 80000, 90000, 70000, 85000, 95000, 110000, 105000, 120000],
    quarterly: [75000, 83333, 83333, 111667],
    yearly: [87500]
  };

  const opportunitiesData = [
    { id: 1, client: 'TechCorp', product: 'Sistema de Vigilancia Avanzado', value: 25000, stage: 'Propuesta' },
    { id: 2, client: 'SecureBank', product: 'Control de Acceso Biométrico', value: 35000, stage: 'Negociación' },
    { id: 3, client: 'SafeMall', product: 'Sistema de Alarma Inteligente', value: 20000, stage: 'Calificación' },
    { id: 4, client: 'ResidentialComplex', product: 'Monitoreo 24/7', value: 15000, stage: 'Cierre' },
    { id: 5, client: 'CityCouncil', product: 'Seguridad Perimetral', value: 50000, stage: 'Propuesta' },
  ];

  const quotationsData = [
    { id: 'Q001', client: 'TechCorp', product: 'Sistema de Vigilancia Avanzado', value: 25000, status: 'Enviada' },
    { id: 'Q002', client: 'SecureBank', product: 'Control de Acceso Biométrico', value: 35000, status: 'En revisión' },
    { id: 'Q003', client: 'SafeMall', product: 'Sistema de Alarma Inteligente', value: 20000, status: 'Aprobada' },
    { id: 'Q004', client: 'ResidentialComplex', product: 'Monitoreo 24/7', value: 15000, status: 'Enviada' },
    { id: 'Q005', client: 'CityCouncil', product: 'Seguridad Perimetral', value: 50000, status: 'En negociación' },
  ];

  const opportunitiesColumns = [
    { header: 'Cliente', accessorKey: 'client' },
    { header: 'Producto', accessorKey: 'product' },
    { header: 'Valor', accessorKey: 'value', cell: ({ row }) => `$${row.original.value.toLocaleString()}` },
    { header: 'Etapa', accessorKey: 'stage' },
  ];

  const quotationsColumns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Cliente', accessorKey: 'client' },
    { header: 'Producto', accessorKey: 'product' },
    { header: 'Valor', accessorKey: 'value', cell: ({ row }) => `$${row.original.value.toLocaleString()}` },
    { header: 'Estado', accessorKey: 'status' },
  ];

  const opportunitiesTable = useReactTable({
    data: opportunitiesData,
    columns: opportunitiesColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const quotationsTable = useReactTable({
    data: quotationsData,
    columns: quotationsColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Oportunidades de Venta - Servicios de Seguridad</h1>
      
      <TabsContainer defaultValue="pipeline" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline de Ventas</TabsTrigger>
          <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
          <TabsTrigger value="quotations">Cotizaciones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pipeline">
          <BarChart
            data={pipelineData}
            title="Pipeline de Ventas - Servicios de Seguridad"
            yAxisLabel="Valor ($)"
            backgroundColor="rgba(4, 63, 97, 0.8)"
            periods={["Mensual", "Trimestral", "Anual"]}
          />
          <Card className="mt-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Valor total anual: $1,050,000</span>
              </div>
              <div className="flex items-center">
                <Shield className="mr-2 h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">5 tipos de servicios de seguridad</span>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="opportunities">
          <Card
            title="Oportunidades Activas - Servicios de Seguridad"
            footer={
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{opportunitiesData.length} oportunidades activas</span>
                </div>
                <Button icon={FileText}>Nueva Oportunidad</Button>
              </div>
            }
          >
            <Table table={opportunitiesTable} />
          </Card>
        </TabsContent>
        
        <TabsContent value="quotations">
          <Card
            title="Seguimiento de Cotizaciones - Servicios de Seguridad"
            footer={
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{quotationsData.length} cotizaciones activas</span>
                </div>
                <Button icon={FileText}>Nueva Cotización</Button>
              </div>
            }
          >
            <Table table={quotationsTable} />
          </Card>
        </TabsContent>
      </TabsContainer>
    </div>
  );
};

export default SalesOpportunities;