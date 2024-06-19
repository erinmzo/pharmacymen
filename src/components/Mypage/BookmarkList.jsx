import { useQuery } from "@tanstack/react-query";
import { fetchAllMenuItemsByBookmark } from "../../api/pharmacy";
import useAuthStore from "../../zustand/auth";
import PharmacyItem from "../List/PharmacyItem";

function BookmarkList() {
	const userInfo = useAuthStore((state) => state.userInfo);
	const { data: pharmacies = [] } = useQuery({
		queryKey: ["bookmark", userInfo?.id],
		queryFn: () => fetchAllMenuItemsByBookmark(userInfo?.id),
		enabled: !!userInfo
	});

	return (
		<div className="w-[480px] mx-auto my-[80px]">
			<h3 className="flex py-2 gap-3 items-center text-[28px] font-bold border-b-2 border-green-400">
				<img src="/img/icon_bookmark_on.png" alt="북마크 아이콘" className="w-[20px] h-[20px]" />
				내가 찜한 약국
			</h3>
			<ul>
				{pharmacies.map((pharmacy) => (
					<li key={pharmacy.id} className="px-4 py-4 border-b-2 border-gray-200 hover:bg-gray-100">
						<PharmacyItem pharmacy={pharmacy} />
					</li>
				))}
			</ul>
		</div>
	);
}

export default BookmarkList;
