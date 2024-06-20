import { useQuery } from "@tanstack/react-query";
import { getReviewCount } from "../../../api/pharmacy";
function ReviewInfo({ pharmacy }) {
	const { data: reviewCount } = useQuery({
		queryKey: ["reviewCount", pharmacy.id],
		queryFn: () => getReviewCount(pharmacy.id),
		staleTime: 1000 * 60 * 5 // 5분 후 갱신
	});
	return <div className="text-gray-400 px-2 inline-block">리뷰{reviewCount > 999 ? "999+" : reviewCount}</div>;
}

export default ReviewInfo;
