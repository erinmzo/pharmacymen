import { useQuery } from "@tanstack/react-query";
import { fetchAllMenuItemsByBookmark } from "../../api/pharmacy";
import PharmacyItem from "../List/PharmacyItem";

function BookmarkList() {
	const { data: pharmacies = [] } = useQuery({
		queryKey: ["pharmacy", userId],
		queryFn: fetchAllMenuItemsByBookmark
	});

	return (
		<div>
			{pharmacies.map((pharmacy) => (
				<li key={pharmacy.id} className="px-4">
					<PharmacyItem pharmacy={pharmacy} />
				</li>
			))}
		</div>
	);
}

export default BookmarkList;
