import Layout from '../components/Layout';

const AdminDashboard = () => {
    return (
        <Layout userRole="admin">
            <h2 className="text-2xl font-bold mb-4">Bienvenido, Admin</h2>
            <p>Aquí está tu contenido específico de administrador.</p>
            {/* Otros componentes y contenido específico para admin */}
        </Layout>
    );
};

export default AdminDashboard;