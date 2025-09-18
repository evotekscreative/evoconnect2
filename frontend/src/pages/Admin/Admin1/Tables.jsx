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

        // fetch company posts
        const companyRes = await fetch("/api/company-posts", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const companyData = await companyRes.json();

        // fetch user posts
        const userRes = await fetch("/api/posts", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const userData = await userRes.json();

        setCompanyPosts(companyData.posts || []);
        setUserPosts(userData.posts || []);
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
    );
  };
  

  return (
    <>
  <Sidebar />
  <div className="relative md:ml-64 bg-white h-screen flex flex-col">
    {/* Header tetap */}
    <Navbar />
    <HeaderStats />

    {/* Konten scrollable */}
    <div className="flex-1 overflow-y-auto px-4 md:px-10 mx-auto w-full pt-20 -m-44">
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="p-0">
            {loadingPosts ? (
              <div className="py-4 text-center">Loading post...</div>
            ) : (
              <>
                {combinedPosts.map((post) => (
                  <div
                    key={post.uniqueId}
                    className="p-4 mb-6 space-y-4 bg-white rounded-lg shadow-md"
                  >
                    {/* Header */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold overflow-hidden">
                        {post.isCompanyPost && post.company?.logo ? (
                          <img
                            src={
                              post.company.logo.startsWith("http")
                                ? post.company.logo
                                : `${apiUrl}/${post.company.logo}`
                            }
                            alt="Company Logo"
                            className="object-cover w-10 h-10"
                          />
                        ) : post.user?.photo ? (
                          <img
                            src={
                              post.user.photo.startsWith("http")
                                ? post.user.photo
                                : `${apiUrl}/${post.user.photo}`
                            }
                            alt="User"
                            className="object-cover w-10 h-10"
                          />
                        ) : (
                          <span>
                            {getInitials(
                              post.isCompanyPost
                                ? post.company?.name
                                : post.user?.name || post.username
                            )}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {post.isCompanyPost
                            ? post.company?.name
                            : post.user?.name || post.username}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatPostTime(post.created_at)}
                        </p>
                      </div>
                    </div>
                    {/* Konten */}
                    {renderPostContent(post)}
                    {/* Foto */}
                    {renderPhotoGrid(post.images)}
                  </div>
                ))}
                {combinedPosts.length === 0 && !loadingPosts && (
                  <div className="py-8 text-center bg-white rounded-lg shadow-md">
                    <p className="text-gray-500">No posts yet</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Footer tetap di bawah */}
    
  </div>
</>

  );
}