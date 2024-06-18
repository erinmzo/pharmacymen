import { createBrowserRouter } from "react-router-dom";
import DetailPage from "../pages/DetailPage";
import ListPage from "../pages/ListPage";
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
	}
]);
export default router;
