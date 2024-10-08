import { Home, Users, PhoneCall, ShoppingCart, Package, CreditCard } from 'lucide-react';

export const menuItems = [
  { name: "Inicio", path: "/home", icon: Home, roles: ["admin", "advisor"] },
  {
    name: "Usuarios",
    icon: Users,
    roles: ["admin"],
    subItems: [
      { name: "Lista de Empresas", path: "/usuarios/empresas" },
      { name: "Roles y Permisos", path: "/usuarios/roles" },
    ]
  },
  {
    name: "Gestión de Clientes",
    path: "/customer_management",
    icon: PhoneCall,
    roles: ["admin", "advisor"],
  },
  {
    name: "Ventas",
    icon: ShoppingCart,
    roles: ["admin", "advisor"],
    subItems: [
      { name: "Ventas Generadas", path: "/ventas/generadas" },
      { name: "Lista de Ventas", path: "/ventas/lista" },
      { name: "Reporte Ventas", path: "/ventas/reporte" },
      { name: "Lista de Ingresos", path: "/ventas/ingresos" },
    ]
  },
  {
    name: "Inventario",
    icon: Package,
    roles: ["admin"],
    subItems: [
      { name: "Reporte de Productos", path: "/inventario/reporte" },
      { name: "Categorías", path: "/inventario/categorias" },
      { name: "Kardex de producto", path: "/inventario/kardex" },
    ]
  },
  { name: "Cobranzas", path: "/cobranzas", icon: CreditCard, roles: ["admin", "advisor"] },
];