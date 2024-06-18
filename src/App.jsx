import { RouterProvider } from "react-router-dom";
import QueryClientSetup from "./QueryClientSetup.jsx";
import "./App.css";
import router from "./routes/router";

function App() {
	return (
		<>
			<QueryClientSetup>
				<RouterProvider router={router} />
			</QueryClientSetup>
		</>
	);
}

export default App;
