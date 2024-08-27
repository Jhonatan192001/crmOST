import { useState } from 'react';
import Card from '../../components/ui/Card';
import DataTableContainer from '../../components/DataTable';
import Button from '../../components/ui/Button';
import Stats from '../../components/dashboard/Stats';
import { Download, DollarSign, Clock, Briefcase } from 'lucide-react'

const KardexProducts = () => {
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

    const [selectedProduct, setSelectedProduct] = useState(null);

    // Datos de ejemplo para el kardex
    const kardexData = [
      { id: 1, date: '2024-01-15', type: 'Entrada', quantity: 50, unitCost: 2500, totalCost: 125000, balance: 50 },
      { id: 2, date: '2024-01-20', type: 'Salida', quantity: 10, unitCost: 2500, totalCost: 25000, balance: 40 },
      { id: 3, date: '2024-01-25', type: 'Entrada', quantity: 25, unitCost: 2600, totalCost: 65000, balance: 65 },
      { id: 4, date: '2024-02-01', type: 'Salida', quantity: 15, unitCost: 2550, totalCost: 38250, balance: 50 },
      { id: 5, date: '2024-02-10', type: 'Entrada', quantity: 30, unitCost: 2450, totalCost: 73500, balance: 80 },
      // ... más movimientos
    ];
  
    const columns = [
      { header: 'Fecha', accessorKey: 'date' },
      { header: 'Tipo', accessorKey: 'type', 
        cell: ({ row }) => (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.original.type === 'Entrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {row.original.type}
          </span>
        )
      },
      { header: 'Cantidad', accessorKey: 'quantity' },
      { header: 'Costo Unitario', accessorKey: 'unitCost', cell: ({ row }) => `$${row.original.unitCost.toLocaleString()}` },
      { header: 'Costo Total', accessorKey: 'totalCost', cell: ({ row }) => `$${row.original.totalCost.toLocaleString()}` },
      { header: 'Balance', accessorKey: 'balance' },
    ];
  
    // Calcular estadísticas para el producto seleccionado
    // const totalEntries = kardexData.filter(item => item.type === 'Entrada').reduce((sum, item) => sum + item.quantity, 0);
    // const totalExits = kardexData.filter(item => item.type === 'Salida').reduce((sum, item) => sum + item.quantity, 0);
    // const currentBalance = kardexData[kardexData.length - 1].balance;
  
    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Kardex de Productos</h1>
        
        <Card className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Detalles del Producto</h2>
            <select 
              className="border rounded p-2"
              onChange={(e) => setSelectedProduct(e.target.value)}
              value={selectedProduct || ''}
            >
              <option value="">Seleccionar Producto</option>
              <option value="camara_ip">Cámara IP HD</option>
              <option value="camara_domo">Cámara Domo 360°</option>
              <option value="nvr">NVR 8 canales</option>
            </select>
          </div>
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Stats stats={salesStats}/>
              {/* <Stats 
                icon={<Plus size={24} />}
                number={totalEntries}
                label="Total Entradas"
                color="bg-green-100"
              />
              <Stats 
                icon={<ArrowUpDown size={24} />}
                number={totalExits}
                label="Total Salidas"
                color="bg-red-100"
              />
              <Stats 
                icon={<Download size={24} />}
                number={currentBalance}
                label="Balance Actual"
                color="bg-blue-100"
              /> */}
            </div>
          )}
        </Card>
        
        <Card>
          <div className="flex mb-4 w-48">
            <Button icon={Download} className="bg-green-500 hover:bg-green-600 rounded-3xl">Exportar Kardex</Button>
          </div>
          <DataTableContainer 
            data={kardexData}
            columns={columns}
          />
        </Card>
      </div>
    );
  };

export default KardexProducts