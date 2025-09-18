import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/Admin/Navbars/AdminNavbar";
import HeaderStats from "../../../components/Admin/Headers/HeaderStats";
import CardTable from "../../../components/Admin/Cards/CardTable";
import FooterAdmin from "../../../components/Admin/Footers/FooterAdmin";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";

export default function Tables() {
  const [combinedPosts, setCombinedPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const apiUrl = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000";

  const fetchAllAdminPosts = async () => {
    setLoadingPosts(true);
    const adminToken = localStorage.getItem("adminToken");
    const response = await axios.get(`${apiUrl}/api/admin/all-posts`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const userPosts = response.data.user_posts || [];
    const companyPosts = response.data.company_posts || [];

    // Format user posts
    const formattedUserPosts = userPosts.map((post) => ({
      id: post.id,
      content: post.content,
      images: post.images?.map((img) =>
        img.startsWith("http") ? img : `${apiUrl}/${img}`
      ) || [],
      user: post.user || {
        id: post.user_id,
        name: post.username || post.name || "Post User",
        username: post.username || "unknown",
        photo: post.photo || null,
      },
      group: post.group || null,
      company: null,
      likes_count: post.likes_count || 0,
      comments_count: post.comments_count || 0,
      created_at: post.created_at,
      isLiked: post.is_liked || false,
      isCompanyPost: false,
      uniqueId: `user-${post.id}`,
      postType: "user",
    }));

    // Format company posts
    const formattedCompanyPosts = companyPosts.map((post) => ({
      id: post.id || post.company_id,
      content: post.company_content || post.content || "",
      images: post.images?.map((img) =>
        img.startsWith("http") ? img : `${apiUrl}/${img}`
      ) || [],
      user: post.user || null,
      group: post.group || null,
      company: post.company || {
        id: post.company_id,
        name: post.company_name,
        logo: post.company_logo,
      },
      likes_count: post.likes_count || 0,
      comments_count: post.comments_count || 0,
      created_at: post.created_at,
      isLiked: post.is_liked || false,
      isCompanyPost: true,
      uniqueId: `company-${post.id || post.company_id}`,
      postType: "company",
    }));

    // Gabungkan dan urutkan
    const combined = [...formattedUserPosts, ...formattedCompanyPosts].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setCombinedPosts(combined);
    setLoadingPosts(false);
    console.log("userPosts", userPosts);
console.log("companyPosts", companyPosts);
console.log("combined", combined);
  };

  useEffect(() => {
    fetchAllAdminPosts();
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const formatPostTime = (createdAt) => {
    return new Date(createdAt).toLocaleString();
  };

  const renderPostContent = (post) => (
    <div className="mb-4">
      <p className="text-gray-800">{post.content}</p>
    </div>
  );

  const renderPhotoGrid = (images) => {
    if (!images || images.length === 0) return null;
    return (
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.startsWith("http") ? image : `${apiUrl}/${image}`}
              alt={`Post image ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
          ))}
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