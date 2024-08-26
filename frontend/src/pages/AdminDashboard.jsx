import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/dashboard/Layout";
// import AdminHome from "./Administrator/AdminHome";
// import UserList from "./Administrator/UserList";
import ContactReport from "./Administrator/ContactReport";

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
      {/* <AdminHome/> */}
      {/* <UserList/> */}
      <ContactReport />
    </Layout>
  );
};

export default AdminDashboard;
