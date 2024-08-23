import Layout from "../components/dashboard/Layout";

const AdvisorDashboard = () => {
    return (
        <Layout userRole="advisor">
            <h2 className="text-2xl font-bold mb-4">Bienvenido, Asesor</h2>
            <p>Aquí está tu contenido específico de asesor.</p>
            {/* Otros componentes y contenido específico para asesor */}
        </Layout>
    );
};

export default AdvisorDashboard;