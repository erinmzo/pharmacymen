import supabase from "../supabase/supabase";

export const getPharmacies = async (lastFourDigits) => {
	try {
		const { data, error } = await supabase
			.from("pharmacy")
			.select("id, place-name, address, phone-number, place-area, lat, lng")
			.eq("place-code", Number(lastFourDigits));

		if (error) {
			alert(`약국 정보를 가져오는 데 실패했습니다. error:${error}`);
		}

		return data;
	} catch (error) {
		console.error("Error fetching menu items:", error.message);
	}
};

export const getPharmacy = async (id) => {
	try {
		const { data, error } = await supabase
			.from("pharmacy")
			.select("id, place-name, address, phone-number, place-area, lat, lng")
			.eq("id", id)
			.single();

		if (error) {
			alert(`약국 정보를 가져오는 데 실패했습니다. error:${error}`);
		}

		return data;
	} catch (error) {
		console.error("Error fetching item:", error.message);
	}
};

export const getReviewCount = async (pharmacyId) => {
	try {
		const { count, error } = await supabase
			.from("review")
			.select("id", { count: "exact" })
			.eq("pharmacy_id", pharmacyId);

		if (error) {
			alert(`리뷰 정보를 가져오는 데 실패했습니다. error:${error}`);
		}

		return count;
	} catch (error) {
		console.error("Error fetching item:", error.message);
	}
};

export const getAllPharmacyByBookmark = async (userId) => {
	if (!userId) {
		return [];
	}

	try {
		const { data: bookmarks, error: bookmarkError } = await supabase
			.from("bookmark")
			.select("pharmacy_id")
			.eq("user_id", userId);

		if (bookmarkError) {
			alert(`정보를 가져오는 데 실패했습니다. error:${error}`);
		}

		if (!bookmarks || bookmarks.length === 0) {
			return [];
		}

		const pharmacyIds = bookmarks.map((bookmark) => bookmark.pharmacy_id);

		const { data: pharmacies, error: pharmacyError } = await supabase
			.from("pharmacy")
			.select("*")
			.in("id", pharmacyIds);

		if (pharmacyError) {
			alert(`정보를 가져오는 데 실패했습니다. error:${error}`);
		}

		return pharmacies;
	} catch (error) {
		console.error("Error fetching pharmacies by bookmark:", error.message);
	}
};
