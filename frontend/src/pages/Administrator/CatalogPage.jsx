import { useState } from 'react';
import { TabsContainer, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/SelectInput';
import { Camera, Shield, Activity, Package } from 'lucide-react';

const CatalogPage = () => {
  const [selectedPackage, setSelectedPackage] = useState('basic');

  const products = [
    { id: 1, name: 'Cámara de seguridad HD', price: 199.99, icon: Camera },
    { id: 2, name: 'Sistema de alarma inteligente', price: 299.99, icon: Shield },
    { id: 3, name: 'Monitor de actividad', price: 149.99, icon: Activity },
    { id: 4, name: 'Monitor de actividad', price: 149.99, icon: Activity },
    { id: 5, name: 'Monitor de actividad', price: 149.99, icon: Activity },
    { id: 6, name: 'Monitor de actividad', price: 149.99, icon: Activity },
  ];

  const services = [
    { id: 1, name: 'Monitoreo 24/7', price: 49.99, icon: Activity },
    { id: 2, name: 'Respuesta de emergencia', price: 79.99, icon: Shield },
    { id: 3, name: 'Mantenimiento anual', price: 99.99, icon: Package },
  ];

  const packages = [
    { value: 'basic', label: 'Básico - $199.99/mes' },
    { value: 'standard', label: 'Estándar - $299.99/mes' },
    { value: 'premium', label: 'Premium - $399.99/mes' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Productos y Servicios</h1>
      
      <TabsContainer defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="services">Servicios</TabsTrigger>
          <TabsTrigger value="configurator">Configurador de Paquetes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <product.icon className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price}</span>
                  {/* <Button>Añadir al carrito</Button> */}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="services">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                  <service.icon className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${service.price}/mes</span>
                  <Button>Contratar</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="configurator">
          <Card title="Configurador de Paquetes">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seleccione un paquete base</label>
                <Select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  options={packages}
                  placeholder="Seleccionar paquete"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de cámaras</label>
                <Input
                  type="number"
                  name="cameras"
                  min="1"
                  max="10"
                  defaultValue="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Servicios adicionales</label>
                <div className="space-y-2">
                  {services.map((service) => (
                    <label key={service.id} className="inline-flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="ml-2">{service.name} (+${service.price}/mes)</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button>Crear paquete personalizado</Button>
            </div>
          </Card>
        </TabsContent>
      </TabsContainer>
    </div>
  );
};

export default CatalogPage;