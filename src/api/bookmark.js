import supabase from "../supabase/supabase";

export const addBookmark = async ({ userId, pharmacyId }) => {
	const { error } = await supabase
		.from("bookmark")
		.insert([{ user_id: userId, pharmacy_id: pharmacyId }])
		.select();
	if (error) {
		alert(`북마크에 실패했습니다. error:${error}`);
	}
};

export async function getPharmacyBookmarkByUserId(userId) {
	const { data, error } = await supabase.from("bookmark").select("*").eq("user_id", userId).maybeSingle();

	if (error) {
		if (error) throw error;
		//alert(`북마크에 실패했습니다. error:${error}`);
	}
	return data;
}
