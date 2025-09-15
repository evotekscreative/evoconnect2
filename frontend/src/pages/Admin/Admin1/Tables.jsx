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
        const res = await fetch("/api/posts", { credentials: "include" });
        const data = await res.json();

        const posts = data.posts || [];

        setCompanyPosts(posts.filter((p) => p.company)); // postingan dengan company
        setUserPosts(posts.filter((p) => !p.company)); // postingan pribadi user
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
