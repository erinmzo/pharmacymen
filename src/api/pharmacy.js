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

//리뷰갯수
export const fetchReviewCount = async (pharmacyId) => {
	try {
		const { count, error } = await supabase
			.from("review")
			.select("id", { count: "exact" })
			.eq("pharmacy_id", pharmacyId);

		if (error) {
			throw new Error(error.message);
		}

		return count;
	} catch (error) {
		console.error("Error fetching item:", error.message);
		throw new Error("Failed to fetch item");
	}
};
