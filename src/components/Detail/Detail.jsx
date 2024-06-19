import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchItem } from "../../api/pharmacy";

export default function Detail() {
	const { detailId } = useParams();

	const {
		data: pharmacy,
		isLoading,
		error
	} = useQuery({
		queryKey: ["pharmacy", detailId],
		queryFn: fetchItem
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error fetching pharmacy</p>;

	return (
		<div className="flex flex-col items-center mb-5">
			<div className="w-[670px]">
				<Map
					center={{ lat: pharmacy[0].lat, lng: pharmacy[0].lon }}
					style={{ width: "100%", height: "400px", marginBottom: "30px" }}
					level={3}
				>
					<MapMarker position={{ lat: pharmacy[0].lat, lng: pharmacy[0].lon }} />
				</Map>
				<div>
					<p className="text-2xl font-black text-[24px] mb-5">{pharmacy[0]["place-name"]}</p>
					<p className="text-gray-700 text-[16px] font-medium mb-1.5">{pharmacy[0]["address"]}</p>
					<p className="text-gray-700 text-[16px] font-medium mb-12">전화번호 : {pharmacy[0]["phone-number"]}</p>
				</div>
			</div>
		</div>
	);
}
