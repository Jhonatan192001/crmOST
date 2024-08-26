import Card from "../ui/Card";
import { DollarSign, Clock, Briefcase } from "lucide-react";

const StatCard = ({ icon, number, label, color }) => (
  <div className="flex items-center p-4">
    <div className={`p-3 rounded-full mr-4 ${color}`}>{icon}</div>
    <div>
      <div className="text-3xl font-semibold">{number}</div>
      <div
        className={`text-sm ${color
          .replace("bg-", "text-")
          .replace("-100", "-600")}`}
      >
        {label}
      </div>
    </div>
  </div>
);

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="bg-green-50 shadow-lg">
        <StatCard
          icon={<DollarSign className="text-green-500" size={24} />}
          number="500"
          label="Ventas Realizadas"
          color="bg-green-100"
        />
      </Card>
      <Card className="bg-blue-50 shadow-lg">
        <StatCard
          icon={<Clock className="text-blue-500" size={24} />}
          number="20"
          label="Ventas Pendientes"
          color="bg-blue-100"
        />
      </Card>
      <Card className="bg-red-50 shadow-lg">
        <StatCard
          icon={<Briefcase className="text-red-500" size={24} />}
          number="15"
          label="Ventas Denegadas"
          color="bg-red-100"
        />
      </Card>
      
    </div>
  );
};

export default Stats;
