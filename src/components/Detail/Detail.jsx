import { useQuery } from "@tanstack/react-query";
import { Map, MapMarker } from "react-kakao-maps-sdk";
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
		queryFn: () => fetchItem(detailId)
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error fetching pharmacy</p>;

	return (
		<div className="flex flex-col items-center mb-5 mt-[50px]">
			<div className="w-[670px]">
				<Map
					center={{ lat: pharmacy.lat, lng: pharmacy.lon }}
					style={{ width: "100%", height: "400px", marginBottom: "30px" }}
					level={3}
				>
					<MapMarker
						position={{ lat: pharmacy.lat, lng: pharmacy.lon }}
						image={{
							src: "/img/icon-marker.png",
							size: { width: 70, height: 70 }
						}}
					/>
				</Map>
				<div>
					<p className="text-2xl font-black text-[24px] mb-5">{pharmacy["place-name"]}</p>
					<p className="text-gray-700 text-[16px] font-medium mb-1.5">{pharmacy["address"]}</p>
					<p className="text-gray-700 text-[16px] font-medium mb-12">전화번호 : {pharmacy["phone-number"]}</p>
				</div>
			</div>
		</div>
	);
}
