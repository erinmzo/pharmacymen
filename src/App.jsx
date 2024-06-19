import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/router";
import supabase from "./supabase/supabase";
import useAuthStore from "./zustand/auth";

const queryClient = new QueryClient();

function App() {
	const saveUserInfo = useAuthStore((state) => state.saveUserInfo);

	useEffect(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_, session) => {
			if (session) {
				saveUserInfo(session.user);
			} else {
				saveUserInfo(null);
			}
			console.log(session.user);
		});
		return () => subscription.unsubscribe();
	}, []);
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</>
	);
}

export default App;
