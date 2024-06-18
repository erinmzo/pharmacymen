import supabase from "../supabase/supabase";

export const getReviews = async () => {
	const { data, error } = await supabase.from("review").select("id, nick_name, comment, created_at");

	if (error) {
		alert("불러오기에 실패했습니다.");
		throw error;
	}

	const formatDate = data.map((review) => ({
		...review,
		created_at: review.created_at.split("T")[0]
	}));

	return formatDate;
};

export const addReview = async ({ nickname, comment }) => {
	const { data, error } = await supabase.from("review").insert([
		{
			nick_name: nickname,
			comment: comment
		}
	]);

	if (error) {
		alert("작성에 실패했습니다.");
		throw error;
	}

	return data;
};
