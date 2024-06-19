import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addReview, deleteReview, getReviews, updateReview } from "../../api/review";
import useAuthStore from "../../zustand/auth";
function Review() {
	const { detailId } = useParams();
	const [comment, setComment] = useState("");
	const [editMode, setEditMode] = useState(null);
	const [editComment, setEditComment] = useState("");
	const queryClient = useQueryClient();
	const userInfo = useAuthStore((state) => state.userInfo);

	const {
		data: reviews,
		isLoading,
		error
	} = useQuery({
		queryKey: ["reviews", detailId],
		queryFn: () => getReviews(detailId)
	});

	const addMutation = useMutation({
		mutationFn: addReview,
		onSuccess: () => {
			queryClient.invalidateQueries(["reviews", detailId]);
		}
	});

	const updateMutation = useMutation({
		mutationFn: updateReview,
		onSuccess: () => {
			queryClient.invalidateQueries(["reviews", detailId]);
			setEditMode(null);
		}
	});

	const deleteMutation = useMutation({
		mutationFn: deleteReview,
		onSuccess: () => {
			queryClient.invalidateQueries(["reviews", detailId]);
			setEditMode(null);
		}
	});

	if (isLoading) return <>Loading...</>;

	if (error) {
		return <div>에러가 발생했습니다: {error.message}</div>;
	}

	const submitHandler = async (e) => {
		e.preventDefault();
		if (!userInfo) {
			alert("로그인 후 이용해주세요.");
			return;
		}
		const email = userInfo?.user?.email;
		const nickname = email.split("@")[0];
		addMutation.mutate({ nickname, comment, pharmacy_id: detailId });
		setComment("");
	};

	const handleEdit = (reviewId, currentComment) => {
		setEditMode(reviewId);
		setEditComment(currentComment);
	};

	const handleSave = (reviewId) => {
		updateMutation.mutate({ id: reviewId, comment: editComment });
	};

	const handleDelete = (reviewId) => {
		deleteMutation.mutate({ id: reviewId });
	};

	return (
		<div className="flex flex-col items-center mb-36">
			<div className="w-[670px]">
				<h2 className="text-xl font-bold text-[24px] mb-5">⭐️ 약국 후기를 남겨주세요!</h2>
				<form onSubmit={submitHandler} className="flex flex-col mb-5 border-b-2 border-green-400 pb-5">
					<div className="flex flex-row w-full">
						<div className="flex flex-col mr-2.5">
							<label className="block uppercase tracking-wide text-gray-700 text-[16px] font-bold mb-1.5">
								리뷰 내용
							</label>
							<input
								className="border-2 border-green-400 rounded-[7px] w-[575px] h-[42px] px-4"
								placeholder="내용을 입력하세요"
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							/>
						</div>
						<div className="flex items-end">
							<button className="bg-green-400 text-gray-700 font-bold w-[85px] rounded-[7px] h-[42px]">등록</button>
						</div>
					</div>
				</form>
				<ul className="space-y-4">
					{reviews?.map((review, index) => (
						<li key={index} className="border-b border-gray-200 pb-2">
							<div className="flex flex-col -translate-y-3">
								<div className="text-[14px] text-gray-400 ">{review.created_at}</div>
								<div className="flex flex-row items-center justify-between">
									<div className="flex flex-row">
										<div className="text-[18px] text-gray-700 w-[100px] truncate">{review.nick_name}</div>
										<p className="text-[18px] text-gray-700 truncate w-[380px]">{review.comment}</p>
									</div>
									{userInfo && review.nick_name === userInfo?.user?.email.split("@")[0] && (
										<div className="flex space-x-2">
											{editMode === review.id ? (
												<button
													className="bg-green-400 text-gray-700 font-bold w-[85px] rounded-[7px] h-[42px]"
													onClick={() => handleSave(review.id)}
												>
													저장
												</button>
											) : (
												<button
													className="bg-green-400 text-gray-700 font-bold w-[85px] rounded-[7px] h-[42px]"
													onClick={() => handleEdit(review.id, review.comment)}
												>
													수정
												</button>
											)}
											<button
												className="bg-green-400 text-gray-700 font-bold w-[85px] rounded-[7px] h-[42px]"
												onClick={() => handleDelete(review.id)}
											>
												삭제
											</button>
										</div>
									)}
								</div>
								{editMode === review.id && (
									<input
										className="border-2 border-green-400 rounded-[7px] w-full h-[42px] px-4 mt-2"
										value={editComment}
										onChange={(e) => setEditComment(e.target.value)}
									/>
								)}
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Review;
