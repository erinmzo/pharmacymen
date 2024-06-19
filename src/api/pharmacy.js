import supabase from "../supabase/supabase";

export const fetchAllMenuItems = async () => {
	try {
		const { data, error } = await supabase.from("pharmacy").select("*");
		if (error) {
			alert(error.message);
		}

		return data;
	} catch (error) {
		alert(error.message);
	}
};

export const fetchAllMenuItemsByBookmark = async () => {
	try {
		const { data, error } = await supabase.from("pharmacy").select(`*, bookmark(user_id)`);
		if (error) {
			alert(error.message);
		}
		console.log(data);
		return data;
	} catch (error) {
		alert(error.message);
	}
};

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

export const fetchItem = async (id) => {
	try {
		const { data, error } = await supabase
			.from("pharmacy")
			.select("id, place-name, address, phone-number, place-area, lat, lon")
			.eq("id", id)
			.single();

		if (error) {
			throw new Error(error.message);
		}
		return data;
	} catch (error) {
		console.error("Error fetching item:", error.message);
		throw new Error("Failed to fetch item");
	}
};
