import { Map, MapMarker } from "react-kakao-maps-sdk";
import useGeoLocation from "./GeoLocation.js";

function ListPageMap({ pharmacies, selectedMarkerId, setSelectedMarkerId }) {
	const centerLatLon = { lat: Number(pharmacies[0].lat), lng: Number(pharmacies[0].lon - 0.06) };
	const myLocation = useGeoLocation();

	const locations = pharmacies.map((pharmacy) => ({
		id: pharmacy.id,
		placeName: pharmacy["place-name"],
		latlng: { lat: pharmacy.lat, lng: pharmacy.lon }
	}));

	const handleSelectMarkerId = (id) => {
		setSelectedMarkerId(id);
	};

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
				{myLocation && (
					<MapMarker
						position={{ lat: myLocation.latitude, lng: myLocation.longitude }}
						image={{ src: "/img/icon-marker-mylocation.png", size: { width: 70, height: 70 }, title: "현재 위치" }}
						title="현재 위치"
					/>
				)}
				{locations.map((location) => (
					<MapMarker
						onClick={() => handleSelectMarkerId(location.id)}
						key={`${location.placeName}-${location.latlng}`}
						position={location.latlng}
						image={{
							src: selectedMarkerId === location.id ? "/img/icon-marker-selected.png" : "/img/icon-marker.png",
							size: { width: 70, height: 70 }
						}}
						placeName={location.placeName}
					></MapMarker>
				))}
			</Map>
		</div>
	);
}

export default ListPageMap;
