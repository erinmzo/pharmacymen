import { useQuery } from "@tanstack/react-query";
import { fetchAllMenuItemsByBookmark } from "../../api/pharmacy";
import useAuthStore from "../../zustand/auth";

function BookmarkList() {
	const userInfo = useAuthStore((state) => state.userInfo);
	const { data: pharmacies = [] } = useQuery({
		queryKey: ["pharmacy", userInfo?.id],
		queryFn: fetchAllMenuItemsByBookmark,
		enabled: !!userInfo
	});
	console.log(pharmacies);

	return (
		<div>hello</div>
		// <div>
		// 	{pharmacies.map((pharmacy) => (
		// 		<li key={pharmacy.id} className="px-4">
		// 			<PharmacyItem pharmacy={pharmacy} />
		// 		</li>
		// 	))}
		// </div>
	);
}

export default BookmarkList;
