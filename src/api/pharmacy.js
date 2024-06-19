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

export const fetchAllMenuItemsByBookmark = async (userId) => {
	try {
		const { data: bookmarks, error } = await supabase.from("bookmark").select("pharmacy_id").eq("user_id", userId);
		const pharmacyIds = bookmarks.map((bookmark) => bookmark.pharmacy_id);
		const { data: pharmacies, error: pharmacyError } = await supabase
			.from("pharmacy")
			.select("*")
			.in("id", pharmacyIds);
		if (error) {
			return alert(error.message);
		}
		if (pharmacyError) {
			return alert(pharmacyError.message);
		}

		return pharmacies;
	} catch (error) {
		alert(error.message);
	}
};
