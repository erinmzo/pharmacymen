import supabase from "../supabase/supabase";

export async function getPharmacyBookmarkByUserId({ userId, pharmacyId }) {
	const { data, error } = await supabase
		.from("bookmark")
		.select("*")
		.eq("user_id", userId)
		.eq("pharmacy_id", pharmacyId)
		.maybeSingle();

	if (error) throw error;

	return data;
}

export const addBookmark = async ({ userId, pharmacyId }) => {
	const { data, error } = await supabase
		.from("bookmark")
		.insert([{ user_id: userId, pharmacy_id: pharmacyId }])
		.select();
	if (error) {
		alert(`북마크에 실패했습니다. error:${error}`);
	}
	return data;
};

export const removeBookmark = async ({ userId, pharmacyId }) => {
	const { data, error } = await supabase.from("bookmark").delete().eq("user_id", userId).eq("pharmacy_id", pharmacyId);
	if (error) {
		alert(`북마크 해제에 실패했습니다. error:${error}`);
	}
	return data;
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
		console.log(pharmacies);
		return pharmacies;
	} catch (error) {
		alert(error.message);
	}
};
