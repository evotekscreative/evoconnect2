import { create } from "zustand";
import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3000";

export const useCompanyStore = create((set) => ({
  selectedCompany: null,
  companies: [],
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  setCompanies: (companies) => set({ companies }),
  fetchCompanies: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/api/my-companies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const companyList =
        response.data?.data && Array.isArray(response.data.data)
          ? response.data.data
          : [];
      set({ companies: companyList });
      // Jika belum ada selectedCompany, set perusahaan pertama
      if (!companyList.length) return;
      set((state) => ({
        selectedCompany: state.selectedCompany || companyList[0],
      }));
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  },
}));

export default useCompanyStore;