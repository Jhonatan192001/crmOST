import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/dashboard/Layout"; 
import CatalogPage from "./Administrator/CatalogPage";
import SalesOpportunities from "./Administrator/SalesOpportunities";
import ContactStages from "./Administrator/ContactStages";
import AdminHome from "./Administrator/AdminHome";
import SubscriptionManagement from "./Administrator/Supscription";
import CalendarAndScheduling from "./Administrator/ViewScheduling";
import ReportsAndAnalysis from "./Administrator/Reports";
// import UserList from "./Administrator/UserList";

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
      {/* <h1>usuarios</h1> */}
      {/* <UserList/> */}
      {/* <h1>Contactos</h1> */}
      <ContactStages />
      {/* <h1>Ventas</h1> */}
      <SalesOpportunities />
      {/* <h1>Inventario</h1> */}
      <CatalogPage />
      <SubscriptionManagement />
      <CalendarAndScheduling />
      <ReportsAndAnalysis />
    </Layout>
  );
};

export default AdminDashboard;
