import DataTableContainer from "../../components/DataTable";
import Stats from "../../components/dashboard/Stats";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
// import Modal from "../../components/ui/Modal";
// import Input from "../../components/ui/Input";
// import Label from "../../components/ui/Label";
import { Briefcase, Clock, DollarSign, Download, Plus } from "lucide-react";

const ProductList = () => {
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

  const inventoryData = [
    {
      id: 1,
      product: "Cámara IP HD",
      buyingPrice: 2500,
      quantity: 43,
      thresholdValue: 12,
      entrydate: "2024-12-31",
      availability: "En stock",
    },
    {
      id: 2,
      product: "Cámara Domo 360°",
      buyingPrice: 3500,
      quantity: 22,
      thresholdValue: 10,
      entrydate: "2024-11-30",
      availability: "Agotado",
    },
    {
      id: 3,
      product: "NVR 8 canales",
      buyingPrice: 5000,
      quantity: 36,
      thresholdValue: 5,
      entrydate: "2025-06-30",
      availability: "En stock",
    },
    {
      id: 4,
      product: "Cámara Bullet 4K",
      buyingPrice: 4000,
      quantity: 14,
      thresholdValue: 8,
      entrydate: "2024-10-31",
      availability: "Agotado",
    },
    {
      id: 5,
      product: "Micrófono de vigilancia",
      buyingPrice: 1500,
      quantity: 50,
      thresholdValue: 15,
      entrydate: "2025-03-31",
      availability: "En stock",
    },
    // ... más productos
  ];

  const columns = [
    { header: "Producto", accessorKey: "product" },
    {
      header: "Precio de Compra",
      accessorKey: "buyingPrice",
      cell: ({ row }) => `₹${row.original.buyingPrice}`,
    },
    {
      header: "Cantidad",
      accessorKey: "quantity",
      cell: ({ row }) => `${row.original.quantity} Unidades`,
    },
    {
      header: "Valor Umbral",
      accessorKey: "thresholdValue",
      cell: ({ row }) => `${row.original.thresholdValue} Unidades`,
    },
    { header: "Fecha de Ingreso", accessorKey: "entrydate" },
    {
      header: "Disponibilidad",
      accessorKey: "availability",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold
              ${
                row.original.availability === "En stock"
                  ? "bg-green-100 text-green-800"
                  : row.original.availability === "Agotado"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
        >
          {row.original.availability}
        </span>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Inventario General de Cámaras de Seguridad
      </h1>

      <Card className="mb-6">
        <Stats stats={salesStats}/>
      </Card>

      <div className="flex space-x-2 mb-4">
        <Button icon={Plus} className="rounded-3xl w-52">
          Agregar Producto
        </Button>
        <Button
          icon={Download}
          className="bg-green-500 hover:bg-green-600 rounded-3xl w-48"
        >
          Descargar todo
        </Button>
      </div>
      <DataTableContainer data={inventoryData} columns={columns} />
    </div>
  );
};

export default ProductList;
