import supabase from "../supabase/supabase";

export const fetchMenuItems = async (lastFourDigits) => {
	try {
		const { data, error } = await supabase
			.from("pharmacy")
			.select("id, place-name, address, phone-number, lat, lon")
			.eq("place-code", Number(lastFourDigits));

		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		console.error("Error fetching menu items:", error.message);
		throw new Error("Failed to fetch menu items");
	}
};

// export const fetchLatLon = async () => {
// 	try {
// 		const response = await supabase.from("pharmacy").select("place-code, place-area, lat, lon");
// 		console.log(response.data);
// 		return response.data;
// 	} catch (error) {
// 		console.error("Error fetching latlon:", error);
// 	}
// };
