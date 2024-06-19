import supabase from "../supabase/supabase";

export const fetchMenuItems = async (lastFourDigits) => {
	try {
		const { data, error } = await supabase
			.from("pharmacy")
			.select("id, place-name, address, phone-number, place-area, lat, lon")
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

export const fetchItem = async ({ queryKey }) => {
	try {
		const { data, error } = await supabase
			.from("pharmacy")
			.select("id, place-name, address, phone-number, place-area, lat, lon")
			.eq("id", queryKey[1])
			.single();

		if (error) {
			throw new Error(error.message);
		}

		console.log(data);
		return data;
	} catch (error) {
		console.error("Error fetching item:", error.message);
		throw new Error("Failed to fetch item");
	}
};
