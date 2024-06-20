import { create } from "zustand";
const useAuthStore = create((set) => ({
	userInfo: null,
	saveUserInfo: (info) => set({ userInfo: info })
}));
export default useAuthStore;
