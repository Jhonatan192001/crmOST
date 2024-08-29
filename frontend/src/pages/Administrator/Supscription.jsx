import { useState, useMemo } from 'react';
import { TabsContainer, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import { Shield, DollarSign, Calendar, Search } from 'lucide-react';
import { useReactTable, getCoreRowModel, getFilteredRowModel } from '@tanstack/react-table';

const SubscriptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const subscriptions = [
    { id: 1, clientName: 'TechCorp', plan: 'Plan Básico', status: 'Activo', nextRenewal: '2023-09-01', price: 49.99 },
    { id: 2, clientName: 'SecureBank', plan: 'Monitoreo 24/7', status: 'Activo', nextRenewal: '2023-08-15', price: 29.99 },
    { id: 3, clientName: 'SafeMall', plan: 'Plan Premium', status: 'Activo', nextRenewal: '2023-10-01', price: 99.99 },
    { id: 4, clientName: 'CityCouncil', plan: 'Plan Estándar', status: 'Inactivo', nextRenewal: '2023-07-31', price: 79.99 },
  ];

  const paymentHistory = [
    { id: 1, clientName: 'TechCorp', date: '2023-07-01', amount: 49.99, status: 'Pagado' },
    { id: 2, clientName: 'SecureBank', date: '2023-07-01', amount: 29.99, status: 'Pagado' },
    { id: 3, clientName: 'SafeMall', date: '2023-07-01', amount: 99.99, status: 'Pagado' },
    { id: 4, clientName: 'CityCouncil', date: '2023-06-01', amount: 79.99, status: 'Pagado' },
  ];

  const subscriptionColumns = [
    { header: 'Cliente', accessorKey: 'clientName' },
    { header: 'Plan', accessorKey: 'plan' },
    { header: 'Estado', accessorKey: 'status' },
    { header: 'Próxima Renovación', accessorKey: 'nextRenewal' },
    { header: 'Precio', accessorKey: 'price', cell: ({ row }) => `$${row.original.price}` },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button 
            onClick={() => handleCancelSubscription(row.original.id)}
            className="bg-red-500 hover:bg-red-600 px-2 py-1 text-sm"
          >
            Cancelar
          </Button>
          <Button 
            onClick={() => handleUpgradeSubscription(row.original.id)}
            className="px-2 py-1 text-sm"
          >
            Actualizar
          </Button>
        </div>
      ),
    },
  ];

  const paymentHistoryColumns = [
    { header: 'Cliente', accessorKey: 'clientName' },
    { header: 'Fecha', accessorKey: 'date' },
    { header: 'Monto', accessorKey: 'amount', cell: ({ row }) => `$${row.original.amount}` },
    { header: 'Estado', accessorKey: 'status' },
  ];

  const handleCancelSubscription = (id) => {
    console.log(`Cancelar suscripción ${id}`);
  };

  const handleUpgradeSubscription = (id) => {
    console.log(`Actualizar suscripción ${id}`);
  };

  const subscriptionTable = useReactTable({
    data: subscriptions,
    columns: subscriptionColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: searchTerm,
    },
    onGlobalFilterChange: setSearchTerm,
  });

  const paymentHistoryTable = useReactTable({
    data: paymentHistory,
    columns: paymentHistoryColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: searchTerm,
    },
    onGlobalFilterChange: setSearchTerm,
  });

  const totalMonthlyRevenue = useMemo(() => {
    return subscriptions.reduce((sum, sub) => sum + sub.price, 0);
  }, [subscriptions]);

  const activeSubscriptions = useMemo(() => {
    return subscriptions.filter(sub => sub.status === 'Activo').length;
  }, [subscriptions]);

  const nextRenewal = useMemo(() => {
    return subscriptions.reduce((earliest, sub) => {
      return sub.nextRenewal < earliest ? sub.nextRenewal : earliest;
    }, '9999-12-31');
  }, [subscriptions]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestión de Suscripciones de Clientes</h1>
      
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md pr-10"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <TabsContainer defaultValue="subscriptions">
        <TabsList>
          <TabsTrigger value="subscriptions">Suscripciones</TabsTrigger>
          <TabsTrigger value="payments">Historial de Pagos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscriptions">
          <Card title="Suscripciones de Clientes">
            <Table table={subscriptionTable} />
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card title="Historial de Pagos">
            <Table table={paymentHistoryTable} />
          </Card>
        </TabsContent>
      </TabsContainer>
      
      <Card className="mt-8" title="Resumen General">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Ingreso Mensual Total</p>
              <p className="text-xl font-bold">${totalMonthlyRevenue.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Suscripciones Activas</p>
              <p className="text-xl font-bold">{activeSubscriptions}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-yellow-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Próxima Renovación</p>
              <p className="text-xl font-bold">{nextRenewal}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SubscriptionManagement;