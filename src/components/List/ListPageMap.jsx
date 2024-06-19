import { Map, MapMarker } from "react-kakao-maps-sdk";

function ListPageMap({ pharmacies, selectedMarkerId, setSelectedMarkerId }) {
	const centerLatLon = { lat: Number(pharmacies[0].lat), lng: Number(pharmacies[0].lon - 0.06) };

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
				{locations.map((location) => (
					<MapMarker
						onClick={() => handleSelectMarkerId(location.id)}
						key={`${location.placeName}-${location.latlng.lat}-${location.latlng.lng}`}
						position={location.latlng}
						image={{
							src: selectedMarkerId === location.id ? "/img/icon-marker-selected.png" : "/img/icon-marker.png",
							size: { width: 70, height: 70 }
						}}
						placeName={location.placeName}
					/>
				))}
			</Map>
		</div>
	);
}

export default ListPageMap;
