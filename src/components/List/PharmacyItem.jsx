import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addBookmark, getPharmacyBookmarkByUserId, removeBookmark } from "../../api/bookmark";
import useAuthStore from "../../zustand/auth";
import BookmarkButton from "./BookmarkButton/BookmarkButton";
import ReviewInfo from "./ReviewInfo/ReviewInfo";

function PharmacyItem({ pharmacy }) {
	const [isBookmark, setIsBookmark] = useState(false);
	const userInfo = useAuthStore((state) => state.userInfo);
	const queryClient = useQueryClient();

	const { data: bookmark } = useQuery({
		queryKey: ["bookmark", userInfo?.id, pharmacy?.id],
		queryFn: () => getPharmacyBookmarkByUserId({ userId: userInfo.id, pharmacyId: pharmacy.id }),
		enabled: !!userInfo
	});

	useEffect(() => {
		if (bookmark) {
			setIsBookmark(true);
		} else {
			setIsBookmark(false);
		}
	}, [bookmark]);

	const { mutate: clickAddBookmark } = useMutation({
		mutationFn: (bookmarkInfo) => addBookmark(bookmarkInfo),
		onSuccess: () => {
			queryClient.invalidateQueries(["bookmark", userInfo?.id, pharmacy?.id]);
		}
	});

	const { mutate: clickRemoveBookmark } = useMutation({
		mutationFn: (bookmarkInfo) => removeBookmark(bookmarkInfo),
		onSuccess: () => {
			queryClient.invalidateQueries(["bookmark", userInfo?.id, pharmacy?.id]);
		}
	});

	const handleBookmark = (clickedPharmacy) => {
		if (!userInfo) {
			alert("로그인이 필요합니다.");
			return;
		}
		const bookmarkInfo = {
			userId: userInfo.id,
			pharmacyId: clickedPharmacy
		};

		if (!isBookmark) {
			clickAddBookmark(bookmarkInfo);
			setIsBookmark(true);
		} else {
			clickRemoveBookmark(bookmarkInfo);
			setIsBookmark(false);
		}
	};
	return (
		<div className="relative">
			<Link to={`/list/detail/${pharmacy.id}`}>
				<div className="flex items-center h-full">
					<div className="text-[28px] font-bold inline-block">{pharmacy["place-name"]}</div>
					<ReviewInfo pharmacy={pharmacy} />
				</div>
				<div className="text-[18px]">{pharmacy.address}</div>
				<div className="text-[18px] hover:underline">
					<a href={`tel:${pharmacy["phone-number"]}`}>{pharmacy["phone-number"]}</a>
				</div>
			</Link>
			{userInfo && <BookmarkButton pharmacy={pharmacy} handleBookmark={handleBookmark} isBookmark={isBookmark} />}
		</div>
	);
}

export default PharmacyItem;
