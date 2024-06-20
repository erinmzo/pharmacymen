import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import useGeoLocation from "./GeoLocation.js";

function ListPageMap({ pharmacies, selectedMarkerId, setSelectedMarkerId }) {
	const myLocation = useGeoLocation();

	const locations = pharmacies.map((pharmacy) => ({
		id: pharmacy.id,
		placeName: pharmacy["place-name"],
		latlng: { lat: pharmacy.lat, lng: pharmacy.lon }
	}));

	const averageLatLng = () => {
		let lats = 0;
		let lngs = 0;

		locations.forEach((location) => {
			lats += Number(location.latlng.lat);
			lngs += Number(location.latlng.lng);
		});

		const averageLat = (lats / locations.length).toFixed(5);
		const averageLng = (lngs / locations.length).toFixed(5) - 0.04;

		return { lat: averageLat, lng: averageLng };
	};

	const centerLatLng = averageLatLng();

	const handleSelectMarkerId = (id) => {
		setSelectedMarkerId(id);
	};

	return (
		<div>
			<Map
				center={centerLatLng}
				style={{
					width: "100%",
					height: "100vh"
				}}
				level={7}
			>
				{myLocation && (
					<MapMarker
						position={{ lat: myLocation.latitude, lng: myLocation.longitude }}
						image={{ src: "/img/icon-marker-mylocation.png", size: { width: 70, height: 70 } }}
						title="현재 위치"
					/>
				)}
				<MarkerClusterer averageCenter={true} minLevel={6}>
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
				</MarkerClusterer>
			</Map>
		</div>
	);
}

export default ListPageMap;
