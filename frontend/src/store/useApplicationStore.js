import { create } from 'zustand';


//Zustand adalah library state management ringan untuk React, dibuat oleh tim yang sama dengan Jotai dan React-Three-Fiber. Tujuannya adalah mengelola state global dengan cara yang simpel, efisien, dan tidak ribet.
export const useCompanyStore = create((set) => ({
  selectedCompany: null,
  companies: [],
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  setCompanies: (companies) => set({ companies }),
}));
  
export default useCompanyStore;