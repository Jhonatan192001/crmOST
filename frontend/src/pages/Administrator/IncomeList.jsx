import DataTableContainer from '../../components/DataTable';
import Card from '../../components/ui/Card';
import SelectFilter  from '../../components/ui/SelectInput'; // Asumiendo que tienes este componente
import DateRangeFilter from '../../components/ui/DateRangerFilter';

const IncomeList = () => {
    const salesData = [
        { id: 1, date: '2024-01-15', client: 'Empresa A', product: 'Cámara IP', quantity: 5, total: 2500 },
        { id: 2, date: '2024-01-16', client: 'Empresa B', product: 'Sistema NVR', quantity: 1, total: 1800 },
        { id: 3, date: '2024-01-17', client: 'Empresa C', product: 'Cámara Analógica', quantity: 10, total: 3000 },
        { id: 4, date: '2024-01-18', client: 'Empresa D', product: 'Accesorios', quantity: 20, total: 1000 },
        { id: 5, date: '2024-01-19', client: 'Empresa E', product: 'Cámara IP', quantity: 3, total: 1500 },
        // ... más datos
      ];
    
      const columns = [
        { header: 'Fecha', accessorKey: 'date' },
        { header: 'Cliente', accessorKey: 'client' },
        { header: 'Producto', accessorKey: 'product' },
        { header: 'Cantidad', accessorKey: 'quantity' },
        { 
          header: 'Total', 
          accessorKey: 'total',
          cell: ({ row }) => `$${row.original.total.toLocaleString()}`
        },
      ];
    
      const customFilters = [
        {
          name: 'product',
          component: SelectFilter,
          options: ['Cámara IP', 'Cámara Analógica', 'Sistema NVR', 'Accesorios'],
          placeholder: 'Filtrar por producto'
        },
        {
          name: 'dateRange',
          component: DateRangeFilter,
          placeholder: 'Rango de fechas'
        }
      ];
    
      // Calcular el total de ventas
      const totalSales = salesData.reduce((sum, sale) => sum + sale.total, 0);
    
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Ingresos de Ventas de Cámaras de Seguridad</h1>
          
          <Card className="mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Resumen de Ventas</h2>
              <div className="text-2xl font-bold text-green-600">
                Total: ${totalSales.toLocaleString()}
              </div>
            </div>
          </Card>
          
          <Card>
            <DataTableContainer 
              data={salesData}
              columns={columns}
              customFilters={customFilters}
            />
          </Card>
        </div>
      );
    };

export default IncomeList;