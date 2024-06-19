import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import ListPageInToggle from "../components/List/ListPageInToggle";
import ListPageMap from "../components/List/ListPageMap";
import { fetchMenuItems } from "../api/pharmacy";
import { useState } from "react";

function ListPage() {
	const location = useLocation();
	const lastFourDigits = location.pathname.slice(-4);
	const [selectedMarkerId, setSelectedMarkerId] = useState(null);

	const {
		data: menuItems,
		error,
		isPending
	} = useQuery({
		queryKey: ["menuItems", lastFourDigits],
		queryFn: () => fetchMenuItems(lastFourDigits)
	});

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<>
			<ListPageInToggle
				menuItems={menuItems}
				selectedMarkerId={selectedMarkerId}
				setSelectedMarkerId={setSelectedMarkerId}
			/>
			<ListPageMap
				pharmacies={menuItems}
				selectedMarkerId={selectedMarkerId}
				setSelectedMarkerId={setSelectedMarkerId}
			/>
			<div>ListPage</div>
		</>
	);
}

export default ListPage;
