import DashboardLayout from "../components/DashboardLayout";
import KPICards from "../components/KPICards";
import { useMarkets } from "../hooks/useMarkets";

function Dashboard() {
  const { markets, loading, error } = useMarkets();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error loading markets.</p>;

  return (
    <DashboardLayout>
      <KPICards markets={markets} />
    </DashboardLayout>
  );
}

export default Dashboard;