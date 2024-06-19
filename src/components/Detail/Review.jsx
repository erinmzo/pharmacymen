import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getReviews, addReview } from "../../api/Review";

function Review() {
	const { detailId } = useParams();
	const [nickname, setNickname] = useState("");
	const [comment, setComment] = useState("");
	const queryClient = useQueryClient();

	const {
		data: reviews,
		isLoading,
		error
	} = useQuery({
		queryKey: ["reviews", detailId],
		queryFn: () => getReviews(detailId)
	});

	const mutation = useMutation({
		mutationFn: addReview,
		onSuccess: () => {
			queryClient.invalidateQueries(["reviews", detailId]);
		}
	});

	if (isLoading) return <>Loading...</>;

	if (error) {
		return <div>에러가 발생했습니다: {error.message}</div>;
	}

	const submitHandler = async (e) => {
		e.preventDefault();
		mutation.mutate({ nickname, comment, pharmacy_id: detailId });
		setNickname("");
		setComment("");
	};

	return (
		<div className="flex flex-col items-center mb-36">
			<div className="w-[670px]">
				<h2 className="text-xl font-bold text-[24px] mb-5">⭐️ 약국 후기를 남겨주세요!</h2>
				<form onSubmit={submitHandler} className="flex flex-col mb-5 border-b-2 border-green-400 pb-5">
					<div className="flex flex-row w-full">
						<div className="flex flex-col mr-2.5">
							<label className="block uppercase tracking-wide text-gray-700 text-[16px] font-bold mb-1.5">닉네임</label>
							<input
								className="border-2 border-green-400 rounded-[7px] w-[148px] h-[42px] px-4"
								placeholder="닉네임"
								value={nickname}
								onChange={(e) => setNickname(e.target.value)}
							/>
						</div>
						<div className="flex flex-col mr-2.5">
							<label className="block uppercase tracking-wide text-gray-700 text-[16px] font-bold mb-1.5">
								리뷰 내용
							</label>
							<input
								className="border-2 border-green-400 rounded-[7px] w-[417px] h-[42px] px-4"
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
								<div className="flex flex-row items-center">
									<div className="text-[18px] text-gray-700 w-[100px] mr-20 truncate">{review.nick_name}</div>
									<p className="text-[18px] text-gray-700 truncate">{review.comment}</p>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Review;
