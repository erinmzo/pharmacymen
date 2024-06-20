import { useEffect, useState } from "react";
function useGeoLocation() {
	const [myLocation, setMyLocation] = useState(null);
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
	}, []);

	const handleSuccess = (response) => {
		const { latitude, longitude } = response.coords;
		setMyLocation({ latitude, longitude });
	};

	const handleError = (error) => {
		console.log(error);
	};

	return myLocation;
}

export default useGeoLocation;
