import { useState, useEffect, useCallback } from "react";
import DataTableContainer from "../../components/DataTable";
import SelectFilter from "../../components/ui/SelectInput";
import Button from "../../components/ui/Button";
import {
  Filter,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  BarChart2,
  X,
  ShieldCheck,
  Camera,
  Lock,
} from "lucide-react";

// Hook personalizado para manejar el tamaño de la ventana
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const ContactStages = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState("resumen");
  const { width } = useWindowSize();

  const userData = [
    {
      name: "Jane Cooper",
      email: "tim.jennings@you.com",
      phone: "(302) 555-0107",
      city: "Lima",
      state: "Nuevo",
    },
    {
      name: "Guy Hawkins",
      email: "georgia.young@i.com",
      phone: "(239) 555-0108",
      city: "Los olivos",
      state: "Recurrente",
    },
    {
      name: "Jane Cooper",
      email: "tim.jennings@you.com",
      phone: "(302) 555-0107",
      city: "Lima",
      state: "Nuevo",
    },
    {
      name: "Guy Hawkins",
      email: "georgia.young@i.com",
      phone: "(239) 555-0108",
      city: "Los olivos",
      state: "Recurrente",
    },
  ];

  const columns = [
    {
      header: "Nombre del cliente",
      accessorKey: "name",
      cell: ({ row }) => (
        <div
          className="cursor-pointer"
          onClick={() => setSelectedClient(row.original)}
        >
          <h3 className="font-semibold">{row.original.name}</h3>
          <p className="text-sm text-gray-500">{row.original.email}</p>
        </div>
      ),
    },
    { header: "Teléfono", accessorKey: "phone" },
    { header: "Ciudad", accessorKey: "city" },
    {
      header: "Estado",
      accessorKey: "state",
      cell: ({ row }) => {
        const state = row.original.state;
        const colorClass =
          state === "Nuevo"
            ? "bg-red-200 text-red-800"
            : "bg-green-200 text-green-800";
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}
          >
            {state}
          </span>
        );
      },
    },
  ];

  const uniqueStates = [...new Set(userData.map((user) => user.state))];

  const stateOptions = uniqueStates.map((state) => ({
    value: state,
    label: state,
  }));

  const customFilters = [
    {
      name: "state",
      component: SelectFilter,
      options: stateOptions,
      placeholder: "Todos los estados",
    },
  ];

  const handleClientSelect = useCallback((client) => {
    setSelectedClient(client);
  }, []);

  const handleCloseProfile = useCallback(() => {
    setSelectedClient(null);
  }, []);

  const isSmallScreen = width < 1024;

  const renderTabContent = () => {
    switch (activeTab) {
      case "resumen":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <DollarSign size={20} className="mr-2" />
                  Valor Total
                </h3>
                <p className="text-2xl font-bold">$15,750</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <FileText size={20} className="mr-2" />
                  Contratos Activos
                </h3>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <BarChart2 size={20} className="mr-2" />
                  Nivel de Satisfacción
                </h3>
                <p className="text-2xl font-bold">4.8/5</p>
              </div>
            </div>

            <h3 className="font-semibold mb-2">Interacciones Recientes</h3>
            <div className="space-y-2">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Llamada de seguimiento</p>
                  <p className="text-sm text-gray-500">
                    15/08/2023 - El cliente expresó interés en actualizar su
                    plan.
                  </p>
                </div>
              ))}
            </div>
          </>
        );
      case "interacciones":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold mb-2">Historial de Interacciones</h3>
            {[
              {
                date: "2023-08-15",
                type: "Llamada",
                description: "Seguimiento de instalación de cámaras",
              },
              {
                date: "2023-07-30",
                type: "Email",
                description: "Envío de cotización para sistema de alarma",
              },
              {
                date: "2023-07-10",
                type: "Visita",
                description: "Evaluación de seguridad en sitio",
              },
            ].map((interaction, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium">
                  {interaction.type} - {interaction.date}
                </p>
                <p className="text-sm text-gray-500">
                  {interaction.description}
                </p>
              </div>
            ))}
          </div>
        );
      case "compras":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold mb-2">Historial de Compras</h3>
            {[
              {
                date: "2023-06-01",
                product: "Sistema de Alarma Pro",
                price: "$1,200",
              },
              {
                date: "2023-03-15",
                product: "Cámaras de Seguridad (x4)",
                price: "$800",
              },
              {
                date: "2022-12-10",
                product: "Servicio de Monitoreo Anual",
                price: "$600",
              },
            ].map((purchase, index) => (
              <div
                key={index}
                className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{purchase.product}</p>
                  <p className="text-sm text-gray-500">{purchase.date}</p>
                </div>
                <p className="font-bold">{purchase.price}</p>
              </div>
            ))}
          </div>
        );
      case "suscripciones":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold mb-2">Suscripciones Activas</h3>
            {[
              {
                name: "Monitoreo 24/7",
                price: "$50/mes",
                icon: <ShieldCheck size={24} className="text-green-500" />,
              },
              {
                name: "Almacenamiento en la Nube",
                price: "$30/mes",
                icon: <Camera size={24} className="text-blue-500" />,
              },
              {
                name: "Mantenimiento Preventivo",
                price: "$25/mes",
                icon: <Lock size={24} className="text-purple-500" />,
              },
            ].map((subscription, index) => (
              <div
                key={index}
                className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
              >
                <div className="flex items-center">
                  {subscription.icon}
                  <div className="ml-3">
                    <p className="font-medium">{subscription.name}</p>
                    <p className="text-sm text-gray-500">
                      {subscription.price}
                    </p>
                  </div>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white text-xs">
                  Gestionar
                </Button>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:h-full bg-gray-100">
      {/* Lista de Clientes */}
      <div
        className={`w-full ${
          isSmallScreen && selectedClient ? "hidden" : ""
        } lg:w-2/3 lg:pr-4 bg-white overflow-y-auto`}
      >
        <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
          <Button icon={Filter} className="w-full sm:w-auto">
            Filtrar
          </Button>
          <Button
            icon={UserPlus}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600"
          >
            Nuevo Cliente
          </Button>
        </div>
        <DataTableContainer
          data={userData}
          columns={columns}
          customFilters={customFilters}
          onRowClick={handleClientSelect}
        />
      </div>

      {/* Perfil detallado del cliente */}
      {selectedClient && (
        <div
          className={`w-full lg:w-1/2 xl:w-1/3 bg-white rounded-lg shadow-lg overflow-y-auto ${
            isSmallScreen ? "fixed inset-0 z-50" : ""
          }`}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedClient.name}</h2>
              <button
                onClick={handleCloseProfile}
                className={isSmallScreen ? "" : "lg:hidden"}
              >
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Phone size={20} className="text-gray-400 mr-2" />
                <span>{selectedClient.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-2" />
                <span>{selectedClient.email}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={20} className="text-gray-400 mr-2" />
                <span>{selectedClient.city}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={20} className="text-gray-400 mr-2" />
                <span>Cliente desde: 01/01/2022</span>
              </div>
            </div>

            {/* Pestañas para diferentes secciones */}
            <div className="border-b border-gray-200 mb-4 overflow-x-auto">
              <nav className="mb-px flex">
                {["resumen", "interacciones", "compras", "suscripciones"].map(
                  (tab) => (
                    <a
                      key={tab}
                      href="#"
                      onClick={() => setActiveTab(tab)}
                      className={`border-b-2 py-2 px-4 text-sm font-medium whitespace-nowrap ${
                        activeTab === tab
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </a>
                  )
                )}
              </nav>
            </div>
            {renderTabContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactStages;
