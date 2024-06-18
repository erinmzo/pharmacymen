import { RouterProvider } from "react-router-dom";
import QueryClientSetup from "./QueryClientSetup.jsx";
import "./App.css";
import router from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</>
	);
}

export default App;
