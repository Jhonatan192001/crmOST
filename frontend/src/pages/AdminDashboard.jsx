import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/dashboard/Layout"; 
//
import AdminHome from "./Administrator/AdminHome";
import CatalogPage from "./Administrator/CatalogPage";
import CommunicationCenter from "./Administrator/Comunication";
import ContactStages from "./Administrator/ContactStages";
import InstallationMap from "./Administrator/Installation";
import InventoryManagement from "./Administrator/Inventory";
import ReportsAndAnalysis from "./Administrator/Reports";
import SalesOpportunities from "./Administrator/SalesOpportunities";
import SubscriptionManagement from "./Administrator/Supscription";
import UserRoleManagement from "./Administrator/UserList";
import CalendarAndScheduling from "./Administrator/ViewScheduling";

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
      <ContactStages />
      <SalesOpportunities />
      <CatalogPage />
      <SubscriptionManagement />
      <CalendarAndScheduling />
      <ReportsAndAnalysis />
      <UserRoleManagement />
      <CommunicationCenter />
      <InventoryManagement />
      <InstallationMap />
    </Layout>
  );
};

export default AdminDashboard;
