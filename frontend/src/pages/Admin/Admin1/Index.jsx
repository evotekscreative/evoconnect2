import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  FaUserAlt,
  FaCommentDots,
  FaFileAlt,
  FaBriefcase,
  FaBars,
  FaRegCommentDots,
  FaStickyNote,
} from "react-icons/fa";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar.jsx";

const COLORS = ["#A78B71", "#9A9B7C", "#3B3C36", "#6B705C", "#CB997E", "#DDBEA9"];

const ReportPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const res = await fetch("/api/admin/report-overview", {
          credentials: "include", // kalau pakai session/cookie
        });
        const json = await res.json();

        // langsung mapping dari data asli user
        setChartData([
          { name: "Report User", value: json.user || 0 },
          { name: "Report Comment", value: json.comment || 0 },
          { name: "Report Blog", value: json.blog || 0 },
          { name: "Report Job", value: json.job || 0 },
          { name: "Report Comment Blog", value: json.commentBlog || 0 },
          { name: "Report Post", value: json.post || 0 },
        ]);
      } catch (err) {
        console.error("Failed to fetch report data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="hidden lg:block w-64">
        <Sidebar />
      </div>

      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          className="text-gray-700 bg-white p-2 rounded shadow"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Report</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <Link to="/admin/report-user">
            <ReportCard icon={<FaUserAlt />} title="Report User" count={chartData[0]?.value} />
          </Link>
          <Link to="/admin/report-comment">
            <ReportCard icon={<FaCommentDots />} title="Report Comment" count={chartData[1]?.value} />
          </Link>
          <Link to="/admin/report-blog">
            <ReportCard icon={<FaFileAlt />} title="Report Blog" count={chartData[2]?.value} />
          </Link>
          <ReportCard icon={<FaBriefcase />} title="Report Job" count={chartData[3]?.value} />
          <ReportCard icon={<FaRegCommentDots />} title="Report Comment Blog" count={chartData[4]?.value} />
          <Link to="/admin/report-post">
            <ReportCard icon={<FaStickyNote />} title="Report Post" count={chartData[5]?.value} />
          </Link>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow p-6 w-full">
          <h2 className="text-gray-800 text-lg font-semibold mb-4">Report Overview</h2>
          {loading ? (
            <p>Loading chart...</p>
          ) : (
            <>
              <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name} (${value})`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-1">
                {chartData.map((item, idx) => (
                  <p key={idx} className="text-sm">
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    ></span>
                    {item.name}: <strong>{item.value}</strong>
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

const ReportCard = ({ icon, title, count }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all border border-gray-200 flex flex-col items-start">
    <div className="text-gray-600 text-sm mb-1">Total Report</div>
    <div className="text-2xl font-bold mb-2">{count ?? "-"}</div>
    <div className="flex items-center gap-2 text-lg font-medium text-gray-800">
      {icon} {title}
    </div>
  </div>
);

export default ReportPage;
