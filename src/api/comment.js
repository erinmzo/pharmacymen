import supabase from "../supabase/supabase";

export const fetchReviews = async () => {
	const { data, error } = await supabase.from("review").select("id, nick_name, comment, created_at");

	if (error) {
		alert("불러오기에 실패했습니다.");
		throw error;
	}

	return data;
};
