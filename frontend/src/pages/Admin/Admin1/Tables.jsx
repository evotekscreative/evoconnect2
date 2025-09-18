import React, { useEffect, useState } from "react";

// components
import CardTable from "../../../components/Admin/Cards/CardTable.jsx";
import AdminNavbar from "../../../components/Admin/Navbars/AdminNavbar.jsx";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar.jsx";
import HeaderStats from "../../../components/Admin/Headers/HeaderStats.jsx";
import FooterAdmin from "../../../components/Admin/Footers/FooterAdmin.jsx";

export default function Tables() {
  const [companyPosts, setCompanyPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token"); // ambil token dari localStorage
        if (!token) {
          console.error("No token found in localStorage");
          setLoading(false);
          return;
        }

        // Base URL backend (port 8080)
        const baseUrl = "http://localhost:3000";

        // fetch company posts
        const companyRes = await fetch(`${baseUrl}/api/companyPost`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!companyRes.ok) {
          const errText = await companyRes.text();
          throw new Error(
            `Company posts fetch failed: ${companyRes.status} ${errText}`
          );
        }
        const companyData = await companyRes.json();

        // fetch user posts
        const userRes = await fetch(`${baseUrl}/api/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!userRes.ok) {
          const errText = await userRes.text();
          throw new Error(
            `User posts fetch failed: ${userRes.status} ${errText}`
          );
        }
        const userData = await userRes.json();

        // Pastikan field array sesuai struktur backend (Posts / posts)
        setCompanyPosts(companyData.posts || companyData.Posts || []);
        setUserPosts(userData.posts || userData.Posts || []);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-white min-h-screen">
        <AdminNavbar />
        <HeaderStats />

        <div className="px-4 md:px-10 mx-auto w-full pt-20 -m-44">
          {loading ? (
            <p className="text-center py-10">Loading posts...</p>
          ) : (
            <div className="flex flex-wrap mt-4">
              <div className="w-full mb-12 px-4">
                <CardTable posts={companyPosts} title="Company Posts" />
              </div>
              <div className="w-full mb-12 px-4">
                <CardTable posts={userPosts} title="User Posts" color="dark" />
              </div>
            </div>
          )}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
