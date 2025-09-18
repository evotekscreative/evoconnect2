import React from "react";

// components
import CardLineChart from "../../../components/Admin/Cards/CardLineChart.jsx";
import CardBarChart from "../../../components/Admin/Cards/CardBarChart.jsx";
import CardPageVisits from "../../../components/Admin/Cards/CardPageVisits.jsx";
import CardSocialTraffic from "../../../components/Admin/Cards/CardSocialTraffic.jsx";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar.jsx";
import HeaderStats from "../../../components/Admin/Headers/HeaderStats.jsx";
import FooterAdmin from "../../../components/Admin/Footers/FooterAdmin.jsx";
import Case from "../../../components/Case.jsx";

export default function Dashboard() {
  // ✅ Data real untuk charts
  const [stats, setStats] = React.useState({
    totalSubmissions: 0,
    approved:  0,
    rejected: 0,
    pending: 0,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  
    const apiUrl = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000";
  
   React.useEffect(() => {
  let intervalId;
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;
      const response = await fetch(`${apiUrl}/api/admin/company-submissions/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Failed to fetch stats: ${response.status}`);
      const data = await response.json();
      if (data && data.data) {
        setStats({
          total: data.data.total || 0,
          approved: data.data.approved || 0,
          rejected: data.data.rejected || 0,
          pending: data.data.pending || 0
        });
      }
    } catch (error) {
      console.error("Error fetching company stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchStats(); // initial fetch
  intervalId = setInterval(fetchStats, 10000); // fetch every 10 seconds

  return () => clearInterval(intervalId); // cleanup on unmount
}, [apiUrl]);
  

  return (
    <>
      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen">
        <Case />
        <HeaderStats stats={stats} />
        <Sidebar />

      <div className="px-4 md:px-10 mx-auto w-full pt-24">
        {/* Section 1: Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <CardLineChart stats={stats} />
          <CardBarChart stats={stats} />
        </div>

        {/* Section 2: Visits and Traffic */}
        {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <CardPageVisits />
          <CardSocialTraffic />
        </div> */}

          {/* Footer */}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
