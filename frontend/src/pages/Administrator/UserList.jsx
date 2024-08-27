import { useState } from "react";
import DataTableContainer from "../../components/DataTable";
import { UserPlus, Edit2, Trash2 } from "lucide-react";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";

const UserList = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    empresa: "",
    ruc: "",
    cargo: "",
    usuario: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    console.log("Crear usuario:", formData);
    setIsCreateModalOpen(false);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log("Actualizar usuario:", formData);
    setIsUpdateModalOpen(false);
  };

  const handleDelete = () => {
    console.log("Eliminar usuario:", selectedUser);
    setIsDeletePopupOpen(false);
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setFormData({
      ...user,
      password: "",
      repeatPassword: "",
    });
    setIsUpdateModalOpen(true);
  };

  const openDeletePopup = (user) => {
    setSelectedUser(user);
    setIsDeletePopupOpen(true);
  };

  const userData = [
    {
      name: "Jane Cooper",
      email: "tim.jennings@you.com",
      phone: "(302) 555-0107",
      company: "Empresa8",
    },
    {
      name: "Guy Hawkins",
      email: "georgia.young@i.com",
      phone: "(239) 555-0108",
      company: "Empresa9",
    },
    {
      name: "Jane Cooper",
      email: "tim.jennings@you.com",
      phone: "(302) 555-0107",
      company: "Empresa8",
    },
    {
      name: "Guy Hawkins",
      email: "georgia.young@i.com",
      phone: "(239) 555-0108",
      company: "Empresa9",
    },
    {
      name: "Jane Cooper",
      email: "tim.jennings@you.com",
      phone: "(302) 555-0107",
      company: "Empresa8",
    },
    {
      name: "Guy Hawkins",
      email: "georgia.young@i.com",
      phone: "(239) 555-0108",
      company: "Empresa9",
    },
    {
      name: "Jane Cooper",
      email: "tim.jennings@you.com",
      phone: "(302) 555-0107",
      company: "Empresa8",
    },
    {
      name: "Guy Hawkins",
      email: "georgia.young@i.com",
      phone: "(239) 555-0108",
      company: "Empresa9",
    },
    {
      name: "Jane Cooper",
      email: "tim.jennings@you.com",
      phone: "(302) 555-0107",
      company: "Empresa8",
    },
    {
      name: "Guy Hawkins",
      email: "georgia.young@i.com",
      phone: "(239) 555-0108",
      company: "Empresa9",
    },
    {
      name: "Jane Cooper",
      email: "tim.jennings@you.com",
      phone: "(302) 555-0107",
      company: "Empresa8",
    },
    {
      name: "Guy Hawkins",
      email: "georgia.young@i.com",
      phone: "(239) 555-0108",
      company: "Empresa9",
    },
    {
      name: "Jane Cooper",
      email: "tim.jennings@you.com",
      phone: "(302) 555-0107",
      company: "Empresa8",
    },
    {
      name: "Guy Hawkins",
      email: "georgia.young@i.com",
      phone: "(239) 555-0108",
      company: "Empresa9",
    },
    {
      name: "Jane Cooper",
      email: "tim.jennings@you.com",
      phone: "(302) 555-0107",
      company: "Empresa8",
    },
    {
      name: "Guy Hawkins",
      email: "georgia.young@i.com",
      phone: "(239) 555-0108",
      company: "Empresa9",
    },
    {
      name: "Jane Cooper",
      email: "tim.jennings@you.com",
      phone: "(302) 555-0107",
      company: "Empresa8",
    },
    {
      name: "Guy Hawkins",
      email: "georgia.young@i.com",
      phone: "(239) 555-0108",
      company: "Empresa9",
    },
  ];

  const columns = [
    { header: "Nombre", accessorKey: "name" },
    { header: "Correo Electrónico", accessorKey: "email" },
    { header: "Teléfono", accessorKey: "phone" },
    { header: "Empresa", accessorKey: "company" },
    {
        header: "Acciones",
        cell: ({ row }) => (
          <div className="flex space-x-6">
            <div className="relative group">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => openUpdateModal(row.original)}
              >
                <Edit2 size={18} />
              </button>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max p-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100">
                Editar
              </span>
            </div>
            <div className="relative group">
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => openDeletePopup(row.original)}
              >
                <Trash2 size={18} />
              </button>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max p-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100">
                Eliminar
              </span>
            </div>
          </div>
        ),
      }
      
  ];

  return (
    <div className="min-h-full">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Administración de Usuarios</h1>
        <div className="flex justify-end mb-3">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            icon={UserPlus}
            className="rounded-3xl w-44"
          >
            Nuevo Usuario
          </Button>
        </div>
        <DataTableContainer data={userData} columns={columns} />

        {/* modal de crear nuevo usuario */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Nuevo Usuario"
          footer={
            <>
              <Button
                onClick={() => setIsCreateModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black"
              >
                Cancelar
              </Button>
              <Button onClick={handleCreateSubmit}>Registrar</Button>
            </>
          }
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label name="firsName">Nombres</Label>
              <Input
                name="nombres"
                placeholder="Ingrese nombres completos"
                value={formData.nombres}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="secound">Apellidos</Label>
              <Input
                name="apellidos"
                placeholder="Ingrese apellidos completos"
                value={formData.apellidos}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Ingrese el correo electrónico"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="phone">Telefono</Label>
              <Input
                name="telefono"
                placeholder="Ingrese el teléfono o celular"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="">Empresa</Label>
              <Input
                name="empresa"
                placeholder="Ingrese el nombre de empresa"
                value={formData.empresa}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="ruc">RUC:</Label>
              <Input
                name="ruc"
                placeholder="Ingrese el RUC"
                value={formData.ruc}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="">Cargo</Label>
              <Input
                name="cargo"
                placeholder="Ingrese el cargo que ocupa"
                value={formData.cargo}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="username">Usuario:</Label>
              <Input
                name="usuario"
                placeholder="Ingrese nombre de usuario"
                value={formData.usuario}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="password">Contraseña:</Label>
              <Input
                name="password"
                type="password"
                placeholder="Ingrese el nombre de empresa"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="repeatPassword">Repetir Contraseña</Label>
              <Input
                name="repeatPassword"
                type="password"
                placeholder="Ingrese nuevamente la contraseña"
                value={formData.repeatPassword}
                onChange={handleInputChange}
                errorMessage={
                  formData.password !== formData.repeatPassword
                    ? "La contraseña no coincide"
                    : ""
                }
              />
            </div>
          </div>
        </Modal>

        {/* modal para actualizar usuario */}
        <Modal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          title="Actualizar Usuario"
          footer={
            <>
              <Button
                onClick={() => setIsUpdateModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black"
              >
                Cancelar
              </Button>
              <Button onClick={handleUpdateSubmit}>Actualizar</Button>
            </>
          }
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label name="firsName">Nombres</Label>
              <Input
                name="nombres"
                placeholder="Ingrese nombres completos"
                value={formData.nombres}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="secound">Apellidos</Label>
              <Input
                name="apellidos"
                placeholder="Ingrese apellidos completos"
                value={formData.apellidos}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Ingrese el correo electrónico"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="phone">Telefono</Label>
              <Input
                name="telefono"
                placeholder="Ingrese el teléfono o celular"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="">Empresa</Label>
              <Input
                name="empresa"
                placeholder="Ingrese el nombre de empresa"
                value={formData.empresa}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="ruc">RUC:</Label>
              <Input
                name="ruc"
                placeholder="Ingrese el RUC"
                value={formData.ruc}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="">Cargo</Label>
              <Input
                name="cargo"
                placeholder="Ingrese el cargo que ocupa"
                value={formData.cargo}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="username">Usuario:</Label>
              <Input
                name="usuario"
                placeholder="Ingrese nombre de usuario"
                value={formData.usuario}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="password">Contraseña:</Label>
              <Input
                name="password"
                type="password"
                placeholder="Ingrese el nombre de empresa"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label name="repeatPassword">Repetir Contraseña</Label>
              <Input
                name="repeatPassword"
                type="password"
                placeholder="Ingrese nuevamente la contraseña"
                value={formData.repeatPassword}
                onChange={handleInputChange}
                errorMessage={
                  formData.password !== formData.repeatPassword
                    ? "La contraseña no coincide"
                    : ""
                }
              />
            </div>
          </div>
        </Modal>

        {/* pop-up para confirmar eliminación de usuario */}
        <Modal
          isOpen={isDeletePopupOpen}
          onClose={() => setIsDeletePopupOpen(false)}
          title="Confirmar Eliminación"
          className="max-w-md"
          footer={
            <>
              <Button
                onClick={() => setIsDeletePopupOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600"
              >
                Eliminar
              </Button>
            </>
          }
        >
          <p>
            ¿Está seguro que desea eliminar al usuario {selectedUser?.name}?
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default UserList;
