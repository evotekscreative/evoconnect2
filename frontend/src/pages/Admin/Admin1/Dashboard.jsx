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
  const stats = {
    totalSubmissions: 1,
    approved: 1,
    rejected: 0,
    pending: 0,
  };

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
