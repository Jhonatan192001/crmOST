import { useState } from 'react';
import Card  from '../../components/ui/Card';
import { TabsList, TabsTrigger, TabsContent, TabsContainer } from '../../components/ui/Tabs';
import Input from '../../components/ui/Input';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import { UserPlus, Shield, Key, Search, Edit2, Trash2 } from 'lucide-react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

const UserRoleManagement = () => {
  const [users] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@ejemplo.com', role: 'Administrador' },
    { id: 2, name: 'María García', email: 'maria@ejemplo.com', role: 'Supervisor' },
    { id: 3, name: 'Carlos López', email: 'carlos@ejemplo.com', role: 'Operador' },
  ]);

  const [roles] = useState(['Administrador', 'Supervisor', 'Operador']);

  const [permissions] = useState([
    { id: 1, name: 'Ver dashboard', roles: ['Administrador', 'Supervisor', 'Operador'] },
    { id: 2, name: 'Gestionar usuarios', roles: ['Administrador'] },
    { id: 3, name: 'Generar reportes', roles: ['Administrador', 'Supervisor'] },
  ]);

  const columns = [
    { header: 'Nombre', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Rol', accessorKey: 'role' },
    {
      header: 'Acciones',
      cell: () => (
        <div className="flex space-x-2">
          <Button className="px-2 py-1 text-sm" icon={Edit2}>Editar</Button>
          <Button className="px-2 py-1 text-sm bg-red-600 hover:bg-red-700" icon={Trash2}>Eliminar</Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card title="Gestión de Usuarios y Roles" className="w-full max-w-full mx-auto">
      <TabsContainer defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Lista de Usuarios</TabsTrigger>
          <TabsTrigger value="roles">Asignación de Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permisos y Accesos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="w-64">
                <Input
                  type="text"
                  name="search"
                  placeholder="Buscar usuarios..."
                  icon={Search}
                />
              </div>
              <Button className="w-72" icon={UserPlus}>Agregar Usuario</Button>
            </div>
            <Table table={table} />
          </div>
        </TabsContent>
        
        <TabsContent value="roles">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Roles Disponibles</h3>
              <Button className="w-72" icon={Shield}>Crear Nuevo Rol</Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {roles.map((role, index) => (
                <Card key={index} title={role}>
                  <Button className="w-full">Editar Permisos</Button>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="permissions">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Permisos del Sistema</h3>
              <Button className="w-72" icon={Key}>Agregar Permiso</Button>
            </div>
            <Table
              table={useReactTable({
                data: permissions,
                columns: [
                  { header: 'Permiso', accessorKey: 'name' },
                  { header: 'Roles Asignados', accessorKey: 'roles', cell: ({ cell }) => cell.getValue().join(', ') },
                  {
                    header: 'Acciones',
                    cell: () => <Button className="px-2 py-1 text-sm" icon={Edit2}>Editar</Button>,
                  },
                ],
                getCoreRowModel: getCoreRowModel(),
              })}
            />
          </div>
        </TabsContent>
      </TabsContainer>
    </Card>
  );
};

export default UserRoleManagement;