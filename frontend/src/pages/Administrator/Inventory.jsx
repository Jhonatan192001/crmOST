import { useState } from 'react';
import Card from '../../components/ui/Card';
import { TabsContainer, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import Input from '../../components/ui/Input';
import SelectFilter from '../../components/ui/SelectInput';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import { Search, PlusCircle, FileText, AlertTriangle, Wrench, Truck } from 'lucide-react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

const InventoryManagement = () => {
  const [products] = useState([
    { id: '001', name: 'Cámara de seguridad HD', category: 'Cámaras', stock: 50, status: 'En stock' },
    { id: '002', name: 'Sensor de movimiento', category: 'Sensores', stock: 10, status: 'Bajo stock' },
    { id: '003', name: 'Cerradura inteligente', category: 'Control de acceso', stock: 5, status: 'Crítico' },
    // Más productos...
  ]);

  const [alerts] = useState([
    { id: '002', name: 'Sensor de movimiento', currentStock: 10, minStock: 20, supplier: 'TechSense Inc.' },
    { id: '003', name: 'Cerradura inteligente', currentStock: 5, minStock: 15, supplier: 'SecureLock Co.' },
    // Más alertas...
  ]);

  const [installedEquipment] = useState([
    { id: 'IE001', name: 'Cámara de seguridad HD', client: 'Empresa A', location: 'Entrada principal', installDate: '2024-01-15', nextMaintenance: '2024-07-15' },
    { id: 'IE002', name: 'Sistema de alarma', client: 'Empresa B', location: 'Oficina central', installDate: '2024-02-20', nextMaintenance: '2024-08-20' },
    // Más equipos instalados...
  ]);

  const productColumns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Producto', accessorKey: 'name' },
    { header: 'Categoría', accessorKey: 'category' },
    { header: 'Stock', accessorKey: 'stock' },
    { 
      header: 'Estado', 
      accessorKey: 'status',
      cell: ({ cell }) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          cell.getValue() === 'En stock' ? 'bg-green-500 text-white' : 
          cell.getValue() === 'Bajo stock' ? 'bg-yellow-500 text-white' : 
          'bg-red-500 text-white'
        }`}>
          {cell.getValue()}
        </span>
      )
    },
    {
      header: 'Acciones',
      cell: () => (
        <Button className="px-2 py-1 text-sm">Editar</Button>
      ),
    },
  ];

  const alertColumns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Producto', accessorKey: 'name' },
    { header: 'Stock Actual', accessorKey: 'currentStock' },
    { header: 'Stock Mínimo', accessorKey: 'minStock' },
    { header: 'Proveedor', accessorKey: 'supplier' },
    {
      header: 'Acciones',
      cell: () => (
        <Button className="px-2 py-1 text-sm" icon={Truck}>Reabastecer</Button>
      ),
    },
  ];

  const installedEquipmentColumns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Equipo', accessorKey: 'name' },
    { header: 'Cliente', accessorKey: 'client' },
    { header: 'Ubicación', accessorKey: 'location' },
    { header: 'Fecha de Instalación', accessorKey: 'installDate' },
    { header: 'Próximo Mantenimiento', accessorKey: 'nextMaintenance' },
    {
      header: 'Acciones',
      cell: () => (
        <Button className="px-2 py-1 text-sm" icon={Wrench}>Mantenimiento</Button>
      ),
    },
  ];

  const productTable = useReactTable({
    data: products,
    columns: productColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const alertTable = useReactTable({
    data: alerts,
    columns: alertColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const installedEquipmentTable = useReactTable({
    data: installedEquipment,
    columns: installedEquipmentColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card title="Gestión de Inventario" className="w-full max-w-full mx-auto">
      <TabsContainer defaultValue="stock">
        <TabsList>
          <TabsTrigger value="stock">Stock de Productos</TabsTrigger>
          <TabsTrigger value="alerts">Alertas de Reabastecimiento</TabsTrigger>
          <TabsTrigger value="installed">Equipos Instalados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stock">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  name="search"
                  placeholder="Buscar productos..."
                  icon={Search}
                  className="w-64"
                />
                <SelectFilter
                  options={[
                    { value: '', label: 'Todas las categorías' },
                    { value: 'cameras', label: 'Cámaras' },
                    { value: 'sensors', label: 'Sensores' },
                    { value: 'access_control', label: 'Control de acceso' },
                  ]}
                  placeholder="Categoría"
                  className="w-40"
                />
                <SelectFilter
                  options={[
                    { value: '', label: 'Todos los estados' },
                    { value: 'in_stock', label: 'En stock' },
                    { value: 'low_stock', label: 'Bajo stock' },
                    { value: 'critical', label: 'Crítico' },
                  ]}
                  placeholder="Estado"
                  className="w-40"
                />
              </div>
              <Button icon={PlusCircle}>Añadir Producto</Button>
            </div>
            <Table table={productTable} />
          </div>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold">Resumen de Inventario:</p>
              <p>Total de productos: 150 | En stock: 120 | Bajo stock: 25 | Crítico: 5</p>
            </div>
            <Button icon={FileText} className="bg-yellow-500 hover:bg-yellow-600">
              Generar Reporte
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="alerts">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold flex items-center">
                <AlertTriangle className="mr-2 text-yellow-500" />
                Alertas de Reabastecimiento
              </h3>
              <Button icon={Truck}>Solicitar Reabastecimiento Masivo</Button>
            </div>
            <Table table={alertTable} />
          </div>
        </TabsContent>
        
        <TabsContent value="installed">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  name="searchInstalled"
                  placeholder="Buscar equipos instalados..."
                  icon={Search}
                  className="w-64"
                />
                <SelectFilter
                  options={[
                    { value: '', label: 'Todos los clientes' },
                    { value: 'empresa_a', label: 'Empresa A' },
                    { value: 'empresa_b', label: 'Empresa B' },
                  ]}
                  placeholder="Cliente"
                  className="w-40"
                />
              </div>
              <Button icon={PlusCircle}>Registrar Nueva Instalación</Button>
            </div>
            <Table table={installedEquipmentTable} />
          </div>
        </TabsContent>
      </TabsContainer>
    </Card>
  );
};

export default InventoryManagement;