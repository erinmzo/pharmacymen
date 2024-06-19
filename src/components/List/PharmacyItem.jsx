import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addBookmark, getPharmacyBookmarkByUserId } from "../../api/bookmark";
import useAuthStore from "../../zustand/auth";
import BookmarkButton from "./BookmarkButton";

function PharmacyItem({ pharmacy }) {
	const [isBookmark, setIsBookmark] = useState(false);
	const userInfo = useAuthStore((state) => state.userInfo);
	const queryClient = useQueryClient();

	const { data: bookmark } = useQuery({
		queryKey: ["bookmark"],
		queryFn: () => getPharmacyBookmarkByUserId(userInfo.id),
		enabled: !!userInfo,
		onSuccess: () => {
			if (bookmark.pharmacy_id === pharmacy.id) {
				setIsBookmark(true);
			}
		}
	});

	console.log(bookmark);

	const { mutate: clickBookmark } = useMutation({
		mutationFn: (bookmarkInfo) => addBookmark(bookmarkInfo),
		onSuccess: queryClient.invalidateQueries(["bookmark"])
	});

	const handleBookmark = (clickedPharmacy) => {
		const bookmarkInfo = {
			userId: userInfo.id,
			pharmacyId: clickedPharmacy
		};

		clickBookmark(bookmarkInfo);

		//setIsBookmark((prev) => !prev);
	};
	return (
		<div className="relative">
			<Link to={`/list/detail/${pharmacy.id}`}>
				<div className="text-[28px] font-bold ">{pharmacy["place-name"]}</div>
				<div className="text-[18px]">{pharmacy.address}</div>
				<div className="text-[18px]">{pharmacy["phone-number"]}</div>
			</Link>
			{userInfo && <BookmarkButton pharmacy={pharmacy} handleBookmark={handleBookmark} isBookmark={isBookmark} />}
		</div>
	);
}

export default PharmacyItem;
