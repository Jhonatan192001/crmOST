import DataTableContainer from "../../components/DataTable";
import SelectFilter from "../../components/ui/SelectInput";

const ContactStages = () => {
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
    { header: "Nombre del cliente", accessorKey: "name" },
    { header: "Correo Electrónico", accessorKey: "email" },
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
  const stateOptions = uniqueStates.map(state => ({ value: state, label: state }));

  const customFilters = [
    {
      name: "state",
      component: SelectFilter,
      options: stateOptions,
      placeholder: "Todos los estados",
    },
  ];

  return (
    <div className="min-h-full">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Etapas de clientes</h1>
        <DataTableContainer 
          data={userData} 
          columns={columns} 
          customFilters={customFilters}
        />
      </div>
    </div>
  );
};

export default ContactStages;
