import DataTableContainer from "../../components/DataTable";
import SelectFilter from "../../components/ui/SelectInput";

const SalesList = () => {
  const userData = [
    {
      code: "BC0001",
      services: "Servicio 1",
      datesales: "01/09/2022",
      costo: "S/ 160.00",
      state: "Pendiente",
    },
    {
      code: "BC0002",
      services: "Servicio 3",
      datesales: "10/05/2023",
      costo: "s/ 150.00",
      state: "Pagado",
    },
    {
      code: "BC0001",
      services: "Servicio 1",
      datesales: "01/09/2022",
      costo: "S/ 160.00",
      state: "Pendiente",
    },
    {
      code: "BC0002",
      services: "Servicio 3",
      datesales: "10/05/2023",
      costo: "s/ 150.00",
      state: "Pagado",
    },
    {
      code: "BC0001",
      services: "Servicio 1",
      datesales: "01/09/2022",
      costo: "S/ 160.00",
      state: "Pendiente",
    },
    {
      code: "BC0002",
      services: "Servicio 3",
      datesales: "10/05/2023",
      costo: "s/ 150.00",
      state: "Pagado",
    },
    {
      code: "BC0001",
      services: "Servicio 1",
      datesales: "01/09/2022",
      costo: "S/ 160.00",
      state: "Pendiente",
    },
    {
      code: "BC0002",
      services: "Servicio 3",
      datesales: "10/05/2023",
      costo: "s/ 150.00",
      state: "Pagado",
    },
    {
      code: "BC0001",
      services: "Servicio 1",
      datesales: "01/09/2022",
      costo: "S/ 160.00",
      state: "Pendiente",
    },
    {
      code: "BC0002",
      services: "Servicio 3",
      datesales: "10/05/2023",
      costo: "s/ 150.00",
      state: "Pagado",
    },
  ];

  const columns = [
    { header: "Código de venta", accessorKey: "code" },
    { header: "servicio", accessorKey: "services" },
    { header: "fecha de compra", accessorKey: "datesales" },
    { header: "Costo total", accessorKey: "costo" },
    {
      header: "Estado",
      accessorKey: "state",
      cell: ({ row }) => {
        const state = row.original.state;
        const colorClass =
          state === "Pendiente"
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

  return (
    <div className="min-h-full">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Lista de ventas</h1>
        <DataTableContainer
          data={userData}
          columns={columns}
          customFilters={customFilters}
        />
      </div>
    </div>
  );
};

export default SalesList;
