import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchMenuItems } from "../api/pharmacy";
import ListPageInToggle from "../components/List/ListPageInToggle";
import ListPageMap from "../components/List/ListPageMap";

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
			<ListPageInToggle menuItems={menuItems} selectedMarkerId={selectedMarkerId} />
			<ListPageMap
				pharmacies={menuItems}
				selectedMarkerId={selectedMarkerId}
				setSelectedMarkerId={setSelectedMarkerId}
			/>
		</>
	);
}

export default ListPage;
