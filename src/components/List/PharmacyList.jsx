import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchReviewCount } from "../../api/Review";

function PharmacyList({ pharmacy }) {
	const [isBookmark, setIsBookmark] = useState(false);
	const {
		data: reviewCount,
		isLoading,
		error
	} = useQuery({
		queryKey: ["reviewCount", pharmacy.id],
		queryFn: () => fetchReviewCount(pharmacy.id),
		staleTime: 1000 * 60 * 5 // 5분 후 갱신
	});
	const style = {
		backgroundImage: isBookmark ? "url(/img/icon_bookmark_on.png)" : "url(/img/icon_bookmark_off.png)"
	};
	const handleBookmark = () => {
		setIsBookmark((prev) => !prev);
	};
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading reviews</div>;

	return (
		<div className="relative">
			<Link to={`/list/detail/${pharmacy.id}`}>
				<div className="flex items-center h-full">
					<div className="text-[28px] font-bold inline-block">{pharmacy["place-name"]}</div>
					<div className="text-gray-400 px-2 inline-block">리뷰{reviewCount > 999 ? "999+" : reviewCount}</div>
				</div>

				<div className="text-[18px]">{pharmacy.address}</div>
				<div className="text-[18px]">{pharmacy["phone-number"]}</div>
			</Link>
			<button
				onClick={handleBookmark}
				className="absolute right-0 top-[5px] w-[20px] h-[22px] bg-cover"
				style={style}
			></button>
		</div>
	);
}

export default PharmacyList;
