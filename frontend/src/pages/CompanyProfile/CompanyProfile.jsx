import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // ✅ harus diimport
import Navbar from "../../components/Navbar";
import CompanyHeader from "../../components/CompanyProfile/CompanyHeader.jsx";
import CompanyTabs from "../../components/CompanyProfile/CompanyTabs.jsx";
import CompanyLeftSidebar from "../../components/CompanyProfile/CompanyLeftSidebar.jsx";
import CompanyMainContent from "../../components/CompanyProfile/CompanyMainContent.jsx";
import CompanyRightSidebar from "../../components/CompanyProfile/CompanyRightSidebar.jsx";

export default function CompanyProfile() {
  const { companyId } = useParams();

  const [activeTab, setActiveTab] = useState("About");
  const [newComment, setNewComment] = useState("");
  const [isFollowingMain, setIsFollowingMain] = useState(false);
  const [isFollowingAmazon, setIsFollowingAmazon] = useState(false);
  const [isConnectedSophia, setIsConnectedSophia] = useState(false);

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userReviews, setUserReviews] = useState([]);
  const [jobs, setJobs] = useState([]); // ✅ jobs dari API kalau ada

  const tabs = ["About", "Jobs", "Reviews"];

  // Fetch company data
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000"
          }/api/companies/${companyId}/details`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCompany(res.data.data);
        setJobs(res.data.data?.jobs || []); // jika API ada field jobs
      } catch (err) {
        console.error("Error fetching company:", err);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!company) return <div className="text-center mt-10">Company not found</div>;

  // Handle comment submit
  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    const newReview = {
      id: Date.now(),
      name: "User " + (userReviews.length + 1),
      like: "0",
      unLike: "0",
      comment: newComment,
      date: new Date().toISOString(),
      description: newComment,
    };

    setUserReviews([...userReviews, newReview]);
    setNewComment("");
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <CompanyHeader
          company={company}
          isFollowingMain={isFollowingMain}
          setIsFollowingMain={setIsFollowingMain}
        />

        <CompanyTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />

        <div className="mt-4 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <CompanyLeftSidebar company={company} />

            <CompanyMainContent
              activeTab={activeTab}
              company={company}
              jobs={jobs}
              userReviews={userReviews}
              newComment={newComment}
              setNewComment={setNewComment}
              handleCommentSubmit={handleCommentSubmit}
            />

            <CompanyRightSidebar
              isFollowingAmazon={isFollowingAmazon}
              setIsFollowingAmazon={setIsFollowingAmazon}
              isConnectedSophia={isConnectedSophia}
              setIsConnectedSophia={setIsConnectedSophia}
            />
          </div>
        </div>
      </div>
    </>
  );
}
