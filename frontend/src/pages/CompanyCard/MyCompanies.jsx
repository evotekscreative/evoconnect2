import React, { useEffect, useState } from "react";
import MyCompanyCard from "../../components/CompanyCard/MyCompanyCard.jsx";
import Case from "../../components/Case.jsx";
import CompanySidebar from "../../components/CompanyCard/CompanySidebar.jsx";

export default function MyCompanies() {
  const [companies, setCompanies] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const payload = JSON.parse(atob(token.split(".")[1]));
  console.log(allCompanies);
  console.log(allCompanies.isMemberOfCompany);
  const uniqueCompanies = [];
const seen = new Set();
for (const company of allCompanies) {
  if (!seen.has(company.id)) {
    uniqueCompanies.push(company);
    seen.add(company.id);
  }
}

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl =
          import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000";
        const res = await fetch(`${apiUrl}/api/my-companies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCompanies(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllCompanies = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl =
          import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000";
        const res = await fetch(`${apiUrl}/api/companies`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          console.error("Fetch error:", res.status, res.statusText);
          setAllCompanies([]);
          return;
        }

        const data = await res.json();

        // ✅ ambil array companies
        setAllCompanies(
          Array.isArray(data.data.companies) ? data.data.companies : []
        );
      } catch (err) {
        console.error("FetchAllCompanies error:", err);
        setAllCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
    fetchAllCompanies();
  }, []);
  if (loading) return <div>Loading...</div>;

  return (
    <Case>
      <div className="px-36 bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="md:sticky md:top-8 h-auto">
              <CompanySidebar />
            </div>

            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6 min-h-[500px] w-full">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 pb-4 border-b border-gray-200">
                  Company Management
                </h2>
                <div className="overflow-x-auto">
                  <div className="flex flex-wrap">
                    {/* {payload.memberCompanyId === "super_admin" &&
    allCompanies.map((company) => (
      <MyCompanyCard key={company.id} company={company} />
    ))} */}

                   {payload.role === "super_admin"
  ? uniqueCompanies.map((company) => (
      <MyCompanyCard key={company.id} company={company} />
    ))
  : uniqueCompanies
      .filter((company) => company.is_member_of_company)
      .map((company) => (
        <MyCompanyCard key={company.id} company={company} />
      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Case>
  );
}
