import { Map, MapMarker } from "react-kakao-maps-sdk";
import { fetchMenuItems } from "../../api/pharmacy";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

function ListPageMap() {
	const location = useLocation();
	const lastFourDigits = location.pathname.slice(-4);

	const {
		data: pharmacies = [],
		isLoading,
		error
	} = useQuery({
		queryKey: ["pharmacies", lastFourDigits],
		queryFn: () => fetchMenuItems(lastFourDigits)
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error fetching pharmacies</p>;
	if (pharmacies.length === 0) return <p>No pharmacies found</p>;

	const centerLatLon = { lat: pharmacies[0].lat, lng: pharmacies[0].lon };

	const locations = pharmacies.map((pharmacy) => ({
		placeName: pharmacy["place-name"],
		latlng: { lat: pharmacy.lat, lng: pharmacy.lon }
	}));

	return (
		<div>
			<Map
				center={centerLatLon}
				style={{
					width: "100%",
					height: "100vh"
				}}
				level={7}
			>
				{locations.map((loc, idx) => (
					<MapMarker
						key={`${loc.placeName}-${loc.latlng.lat}-${loc.latlng.lng}`}
						position={loc.latlng}
						image={{
							src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
							size: { width: 24, height: 35 }
						}}
						placeName={loc.placeName}
					/>
				))}
			</Map>
		</div>
	);
}

export default ListPageMap;
