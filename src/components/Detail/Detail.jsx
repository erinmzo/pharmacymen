import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useParams } from "react-router-dom";
import { getPharmacy } from "../../api/pharmacy";
import Loading from "../Loading/Loading";

export default function Detail() {
	const { detailId } = useParams();
	const [isOpen, setIsOpen] = useState(false);

	const {
		data: pharmacy,
		isPending,
		error
	} = useQuery({
		queryKey: ["pharmacy", detailId],
		queryFn: () => getPharmacy(detailId)
	});

	if (isPending) return <Loading />;
	if (error) return <p>Error fetching pharmacy</p>;

	const handleMarkerToggle = () => {
		if (isOpen) {
			setIsOpen(false);
		} else {
			setIsOpen(true);
		}
	};

	return (
		<div className="flex flex-col items-center mb-5 mt-[50px]">
			<div className="w-[670px]">
				<Map
					center={{ lat: pharmacy.lat, lng: pharmacy.lng }}
					style={{ width: "100%", height: "400px", marginBottom: "30px" }}
					level={3}
				>
					<MapMarker
						position={{ lat: pharmacy.lat, lng: pharmacy.lng }}
						image={{
							src: "/img/icon-marker.png",
							size: { width: 70, height: 70 }
						}}
						clickable={true}
						onClick={handleMarkerToggle}
					>
						{isOpen && (
							<div className="min-w-44 max-w-80 min-h-28 p-1">
								<p className="absolute right-[5px] bottom-[5px] cursor-pointer underline hover:decoration-2">
									<a href={`https://map.kakao.com/link/search/${pharmacy["address"]}`}>카카오맵으로 이동하기&gt;&gt;</a>
								</p>
								<p className="text-sky-600 font-bold">{pharmacy["place-name"]}</p>
								<p className="text-gray-700 font-medium">{pharmacy["address"]}</p>
							</div>
						)}
					</MapMarker>
				</Map>
				<div>
					<p className="text-2xl font-black text-[24px] mb-5">{pharmacy["place-name"]}</p>
					<p className="text-gray-700 text-[16px] font-medium mb-1.5">{pharmacy["address"]}</p>
					<p className="text-gray-700 text-[16px] font-medium mb-12">
						전화번호 :{" "}
						<a href={`tel:${pharmacy["phone-number"]}`} className="underline hover:decoration-2">
							{pharmacy["phone-number"]}
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
