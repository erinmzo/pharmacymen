import supabase from "../supabase/supabase";

// 기존의 getReviews, addReview 함수도 이 파일에 포함되어 있습니다.

export const getReviews = async (pharmacy_id) => {
	const { data, error } = await supabase
		.from("review")
		.select("id, nick_name, comment, created_at")
		.eq("pharmacy_id", pharmacy_id);

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

export const addReview = async ({ nickname, comment, pharmacy_id }) => {
	const { data, error } = await supabase.from("review").insert([
		{
			nick_name: nickname,
			comment: comment,
			pharmacy_id: pharmacy_id
		}
	]);

	if (error) {
		alert("작성에 실패했습니다.");
		throw error;
	}

	return data;
};

export const updateReview = async ({ id, comment }) => {
	const { data, error } = await supabase.from("review").update({ comment }).eq("id", id);

	if (error) {
		alert("수정에 실패했습니다.");
		throw error;
	}

	return data;
};

export const deleteReview = async ({ id }) => {
	const { data, error } = await supabase.from("review").delete().eq("id", id);

	if (error) {
		alert("삭제에 실패했습니다.");
		throw error;
	}

	return data;
};
