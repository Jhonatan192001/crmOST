import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/dashboard/Layout";
import SalesReport from "./Administrator/SalesReport";
import IncomeList from "./Administrator/IncomeList";
import SalesList from "./Administrator/SalesList";
import SalesGenerated from "./Administrator/SalesGenerated";
import ContactStages from "./Administrator/ContactStages";
import AdminHome from "./Administrator/AdminHome";
import UserList from "./Administrator/UserList";
import ContactReport from "./Administrator/ContactReport";
import ProductList from "./Administrator/ProductList";
import KardexProducts from "./Administrator/KardexProducts";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdminDashboard();
        setData(response);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
        if (err.response && err.response.status === 401) {
          logout();
        } else {
          setError("Error al cargar los datos del dashboard");
        }
      }
    };

    fetchData();
  }, [logout]);

  if (error) return <div>{error}</div>;
  if (!data) return <div>Cargando...</div>;
  return (
    <Layout userRole="admin">
      <AdminHome/>
      <h1>usuarios</h1>
      <UserList/>
      <h1>Contactos</h1>
      <ContactReport />
      <ContactStages />
      <h1>Ventas</h1>
      <SalesGenerated />
      <SalesList />
      <SalesReport />
      <IncomeList />
      <h1>Inventario</h1>
      <ProductList />
      <KardexProducts />
    </Layout>
  );
};

export default AdminDashboard;
