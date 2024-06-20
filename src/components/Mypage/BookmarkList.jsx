import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllPharmacyByBookmark } from "../../api/pharmacy";
import useAuthStore from "../../zustand/auth";
import PharmacyItem from "../List/PharmacyItem";

function BookmarkList() {
	const userInfo = useAuthStore((state) => state.userInfo);
	const [isUserInfoLoaded, setIsUserInfoLoaded] = useState(false);

	useEffect(() => {
		if (userInfo && userInfo.id) {
			setIsUserInfoLoaded(true);
		} else {
			setIsUserInfoLoaded(false);
		}
	}, [userInfo]);

	const {
		data: pharmacies = [],
		isLoading,
		isError
	} = useQuery({
		queryKey: ["bookmark", userInfo?.id],
		queryFn: () => getAllPharmacyByBookmark(userInfo?.id),
		enabled: isUserInfoLoaded
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error loading pharmacies</div>;
	}

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
