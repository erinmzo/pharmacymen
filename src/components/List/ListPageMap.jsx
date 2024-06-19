import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
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
				level={5}
			>
				{myLocation && (
					<MapMarker
						position={{ lat: myLocation.latitude, lng: myLocation.longitude }}
						image={{ src: "/img/icon-marker-mylocation.png", size: { width: 70, height: 70 }, title: "현재 위치" }}
						title="현재 위치"
					/>
				)}
				<MarkerClusterer
					averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
					minLevel={7} // 클러스터 할 최소 지도 레벨
				>
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
