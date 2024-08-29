import { useState } from 'react';
import { TabsContainer, TabsList, TabsTrigger, TabsContent } from '../../components/ui/Tabs';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import CalendarView from '../../components/CalendarView';
import moment from 'moment';
import { Users, Cable, Wrench } from 'lucide-react';

const CalendarAndScheduling = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState('all');

  const events = [
    { id: 1, title: 'Cita con TechCorp', start: new Date(2023, 7, 15, 10, 0), end: new Date(2023, 7, 15, 11, 0), type: 'client' },
    { id: 2, title: 'Instalación en SecureBank', start: new Date(2023, 7, 16, 9, 0), end: new Date(2023, 7, 16, 17, 0), type: 'installation' },
    { id: 3, title: 'Mantenimiento en SafeMall', start: new Date(2023, 7, 17, 14, 0), end: new Date(2023, 7, 17, 16, 0), type: 'maintenance' },
  ];

  const filteredEvents = filter === 'all' ? events : events.filter(event => event.type === filter);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Calendario y Programación</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Card>
            <CalendarView
              events={filteredEvents}
              onSelectEvent={handleSelectEvent}
              date={date}
              onNavigate={handleNavigate}
              view={view}
              onView={handleViewChange}
            />
          </Card>
        </div>
        <div>
          <Card title="Filtros">
            <div className="space-y-2">
              <Button icon={Users} className={`w-full ${filter === 'client' ? 'bg-green-500' : ''}`} onClick={() => handleFilterChange('client')}>Citas con Clientes</Button>
              <Button icon={Cable} className={`w-full ${filter === 'installation' ? 'bg-blue-500' : ''}`} onClick={() => handleFilterChange('installation')}>Instalaciones</Button>
              <Button icon={Wrench} className={`w-full ${filter === 'maintenance' ? 'bg-yellow-500' : ''}`} onClick={() => handleFilterChange('maintenance')}>Mantenimientos</Button>
              <Button className="w-full" onClick={() => handleFilterChange('all')}>Mostrar Todos</Button>
            </div>
          </Card>
          {selectedEvent && (
            <Card title="Detalles del Evento" className="mt-4">
              <h3 className="font-bold">{selectedEvent.title}</h3>
              <p>Inicio: {moment(selectedEvent.start).format('LLL')}</p>
              <p>Fin: {moment(selectedEvent.end).format('LLL')}</p>
              <p>Tipo: {selectedEvent.type}</p>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-8">
        <TabsContainer defaultValue="clients">
          <TabsList>
            <TabsTrigger value="clients">Citas con Clientes</TabsTrigger>
            <TabsTrigger value="installations">Instalaciones</TabsTrigger>
            <TabsTrigger value="maintenance">Mantenimientos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clients">
            <Card title="Próximas Citas con Clientes">
              <ul>
                {events.filter(e => e.type === 'client').map(event => (
                  <li key={event.id} className="mb-2">
                    <span className="font-bold">{event.title}</span> - {moment(event.start).format('LLL')}
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>
          
          <TabsContent value="installations">
            <Card title="Instalaciones Programadas">
              <ul>
                {events.filter(e => e.type === 'installation').map(event => (
                  <li key={event.id} className="mb-2">
                    <span className="font-bold">{event.title}</span> - {moment(event.start).format('LL')}
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>
          
          <TabsContent value="maintenance">
            <Card title="Mantenimientos Programados">
              <ul>
                {events.filter(e => e.type === 'maintenance').map(event => (
                  <li key={event.id} className="mb-2">
                    <span className="font-bold">{event.title}</span> - {moment(event.start).format('LL')}
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>
        </TabsContainer>
      </div>
    </div>
  );
};

export default CalendarAndScheduling;