import { createBrowserRouter } from "react-router-dom";
import DetailPage from "../pages/DetailPage";
import JoinPage from "../pages/JoinPage";
import ListPage from "../pages/ListPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPage />
	},
	{
		path: "/list/:listId",
		element: <ListPage />
	},
	{
		path: "/list/detail/:detailId",
		element: <DetailPage />
	},
	{
		path: "/login",
		element: <LoginPage />
	},
	{
		path: "/join",
		element: <JoinPage />
	}
]);
export default router;
