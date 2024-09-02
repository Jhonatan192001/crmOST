import { useState } from 'react';
import Card from '../../components/ui/Card';
import { TabsList, TabsTrigger, TabsContent, TabsContainer } from '../../components/ui/Tabs';
import Input from '../../components/ui/Input';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import { Search, Mail, Phone, MessageSquare, Edit2, Trash2, Send } from 'lucide-react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

const CommunicationCenter = () => {
  const [communications] = useState([
    { id: 1, date: '2024-03-01', client: 'Empresa A', type: 'Email', subject: 'Renovación de contrato' },
    { id: 2, date: '2024-03-02', client: 'Empresa B', type: 'Llamada', subject: 'Consulta de servicios' },
    { id: 3, date: '2024-03-03', client: 'Empresa C', type: 'SMS', subject: 'Recordatorio de pago' },
  ]);

  const [emailTemplates] = useState([
    { id: 1, name: 'Bienvenida', subject: 'Bienvenido a nuestros servicios' },
    { id: 2, name: 'Recordatorio de pago', subject: 'Recordatorio: Pago pendiente' },
    { id: 3, name: 'Renovación', subject: 'Es hora de renovar su contrato' },
  ]);

  const communicationColumns = [
    { header: 'Fecha', accessorKey: 'date' },
    { header: 'Cliente', accessorKey: 'client' },
    { header: 'Tipo', accessorKey: 'type' },
    { header: 'Asunto', accessorKey: 'subject' },
    {
      header: 'Acciones',
      cell: () => (
        <div className="flex space-x-2">
          <Button className="px-2 py-1 text-sm" icon={Edit2}>Ver</Button>
          <Button className="px-2 py-1 text-sm bg-red-600 hover:bg-red-700" icon={Trash2}>Eliminar</Button>
        </div>
      ),
    },
  ];

  const templateColumns = [
    { header: 'Nombre', accessorKey: 'name' },
    { header: 'Asunto', accessorKey: 'subject' },
    {
      header: 'Acciones',
      cell: () => (
        <div className="flex space-x-2">
          <Button className="px-2 py-1 text-sm" icon={Edit2}>Editar</Button>
          <Button className="px-2 py-1 text-sm bg-green-600 hover:bg-green-700" icon={Send}>Usar</Button>
        </div>
      ),
    },
  ];

  return (
    <Card title="Centro de Comunicaciones" className="w-full max-w-full mx-auto">
      <TabsContainer defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">Historial de Comunicaciones</TabsTrigger>
          <TabsTrigger value="templates">Plantillas de Correo</TabsTrigger>
          <TabsTrigger value="calls">Sistema de Llamadas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="w-64">
                <Input
                  type="text"
                  name="search"
                  placeholder="Buscar comunicaciones..."
                  icon={Search}
                />
              </div>
              <div className="flex space-x-2">
                <Button className="w-40" icon={Mail}>Nuevo Email</Button>
                <Button className="w-40" icon={Phone}>Nueva Llamada</Button>
                <Button className="w-40" icon={MessageSquare}>Nuevo SMS</Button>
              </div>
            </div>
            <Table 
              table={useReactTable({
                data: communications,
                columns: communicationColumns,
                getCoreRowModel: getCoreRowModel(),
              })}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Plantillas de Correo Electrónico</h3>
              <Button className="w-52" icon={Mail}>Nueva Plantilla</Button>
            </div>
            <Table
              table={useReactTable({
                data: emailTemplates,
                columns: templateColumns,
                getCoreRowModel: getCoreRowModel(),
              })}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="calls">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Integración con Sistema de Llamadas</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card title="Llamada Actual">
                <div className="space-y-2">
                  <p><strong>Cliente:</strong> Empresa D</p>
                  <p><strong>Duración:</strong> 00:05:23</p>
                  <p><strong>Asunto:</strong> Consulta de facturación</p>
                  <div className="flex space-x-2 mt-4">
                    <Button className="flex-1" icon={Phone}>Finalizar Llamada</Button>
                    <Button className="flex-1" icon={MessageSquare}>Agregar Nota</Button>
                  </div>
                </div>
              </Card>
              <Card title="Próximas Llamadas Programadas">
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Empresa E - 14:30</span>
                    <Button className="px-2 py-1 text-sm" icon={Phone}>Llamar</Button>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Empresa F - 15:45</span>
                    <Button className="px-2 py-1 text-sm" icon={Phone}>Llamar</Button>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Empresa G - 16:15</span>
                    <Button className="px-2 py-1 text-sm" icon={Phone}>Llamar</Button>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </TabsContent>
      </TabsContainer>
    </Card>
  );
};

export default CommunicationCenter;