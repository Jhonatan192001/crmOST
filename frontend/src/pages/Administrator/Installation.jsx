import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Search, Filter, PlusCircle, RotateCw, UserCheck } from 'lucide-react';

// Función para crear un icono personalizado
const createCustomIcon = (color) => new L.Icon({
  iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Componente para actualizar la vista del mapa
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

// const InstallationMap = () => {
//   const [clients, setClients] = useState([]);
// eslint-disable-next-line no-unused-vars
//   const [center, setCenter] = useState([-9.1900, -75.0152]);
// eslint-disable-next-line no-unused-vars
//   const [zoom, setZoom] = useState(6);

const InstallationMap = () => {
  const [clients, setClients] = useState([]);
  const [center] = useState([-9.1900, -75.0152]);
  const [zoom] = useState(6);


  useEffect(() => {
    // Simula la carga de datos de clientes
    const fetchClients = async () => {
      // Aquí normalmente harías una llamada API
      const data = [
        { id: 1, name: 'Cliente Lima', address: 'Av. Arequipa 123, Lima', lat: -12.0464, lng: -77.0428 },
        { id: 2, name: 'Cliente Arequipa', address: 'Calle Mercaderes 456, Arequipa', lat: -16.3988, lng: -71.5369 },
        { id: 3, name: 'Cliente Trujillo', address: 'Jr. Pizarro 789, Trujillo', lat: -8.1091, lng: -79.0215 },
      ];
      setClients(data);
    };
    fetchClients();
  }, []);

  const handleSearch = (searchTerm) => {
    // Aquí implementarías la lógica de búsqueda
    console.log('Buscando:', searchTerm);
  };

  const route = clients.map(client => [client.lat, client.lng]);

  return (
    <Card title="Mapa de Instalaciones en Perú" className="w-full max-w-full mx-auto h-screen">
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          name="search"
          placeholder="Buscar cliente o dirección"
          icon={Search}
          className="flex-grow"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button icon={Filter}>Filtrar</Button>
        <Button icon={PlusCircle}>Añadir Cliente</Button>
      </div>

      <div className="flex h-[calc(100vh-200px)]">
        <div className="w-2/3 pr-4">
          <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
            <ChangeView center={center} zoom={zoom} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {clients.map(client => (
              <Marker 
                key={client.id} 
                position={[client.lat, client.lng]}
                icon={createCustomIcon('red')}
              >
                <Popup>
                  <strong>{client.name}</strong><br />
                  {client.address}
                </Popup>
              </Marker>
            ))}
            <Polyline positions={route} color="blue" dashArray="5, 5" />
          </MapContainer>
        </div>

        <div className="w-1/3 bg-gray-50 p-4 rounded-lg overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Detalles de Ruta</h2>
          {clients.map((client, index) => (
            <div key={client.id} className="bg-white p-3 rounded-lg mb-2 shadow-sm">
              <p className="font-medium">{index + 1}. {client.name}</p>
              <p className="text-sm text-gray-600">{client.address}</p>
            </div>
          ))}
          <div className="mt-4 space-y-2">
            <Button icon={RotateCw} className="w-full">Optimizar Ruta</Button>
            <Button icon={UserCheck} className="w-full">Asignar a Técnico</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

ChangeView.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired
};

export default InstallationMap;