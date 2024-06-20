import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getPharmacies } from "../api/pharmacy";
import ListPageMap from "../components/List/ListPageMap";
import ListPageToggle from "../components/List/ListPageToggle";
import Loading from "../components/Loading/Loading";

function ListPage() {
	const location = useLocation();
	const lastFourDigits = location.pathname.slice(-4);
	const [selectedMarkerId, setSelectedMarkerId] = useState(null);

	const {
		data: menuItems,
		isPending,
		error
	} = useQuery({
		queryKey: ["menuItems", lastFourDigits],
		queryFn: () => getPharmacies(lastFourDigits)
	});

	if (isPending) return <Loading />;

	if (error) return <div>약국 정보를 불러오는 데 실패했습니다.</div>;

	return (
		<>
			<ListPageToggle menuItems={menuItems} selectedMarkerId={selectedMarkerId} />
			<ListPageMap
				pharmacies={menuItems}
				selectedMarkerId={selectedMarkerId}
				setSelectedMarkerId={setSelectedMarkerId}
			/>
		</>
	);
}

export default ListPage;
