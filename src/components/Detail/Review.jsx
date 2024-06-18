import React from "react";

function Review() {
	const reviews = [
		{
			date: "2024/06/11",
			nickname: "조민수",
			content:
				"이 약국 저녁에도 해서 너무 좋아요!이 약국 저녁에도 해서 너무 좋아요!이 약국 저녁에도 해서 너무 좋아요!이 약국 저녁에도 해서 너무 좋아요!"
		},
		{
			date: "2024/06/11",
			nickname: "이성찬",
			content:
				"약국이 정말 좋아요!약국이 정말 좋아요!약국이 정말 좋아요!약국이 정말 좋아요!약국이 정말 좋아요!약국이 정말 좋아요!약국이 정말 좋아요!약국이 정말 좋아요!"
		},
		{
			date: "2024/06/11",
			nickname: "조민수",
			content: "이 약국 저녁에도 해서 너무 좋아요!"
		}
	];

	return (
		<div className="flex flex-col items-center">
			<div className="w-[670px]">
				<h2 className="text-xl font-bold text-[24px] mb-5">⭐️ 약국 후기를 남겨주세요!</h2>
				<form className="flex flex-col mb-5 border-b-2 border-green-400 pb-5">
					<div className="flex flex-row w-full">
						<div className="flex flex-col mr-2.5">
							<label className="block uppercase tracking-wide text-gray-700 text-[16px] font-bold mb-1.5">닉네임</label>
							<input className="border-2 border-green-400 rounded-[7px] w-[148px] h-[42px] px-4" placeholder="닉네임" />
						</div>
						<div className="flex flex-col mr-2.5">
							<label className="block uppercase tracking-wide text-gray-700 text-[16px] font-bold mb-1.5">
								리뷰 내용
							</label>
							<input
								className="border-2 border-green-400 rounded-[7px] w-[417px] h-[42px] px-4"
								placeholder="내용을 입력하세요"
							/>
						</div>
						<div className="flex items-end">
							<button className="bg-green-400 text-gray-700 font-bold w-[85px] rounded-[7px] h-[42px]">등록</button>
						</div>
					</div>
				</form>

				<ul className="space-y-4">
					{reviews.map((review, index) => (
						<li key={index} className="flex flex-col border-b border-gray-200 pb-4">
							<section className="flex flex-row items-center">
								<header className="mr-20">
									<div className="text-[14px] text-gray-400 mb-[5px]">{review.date}</div>
									<div className="text-[18px] text-gray-700">{review.nickname}</div>
								</header>
								<p className="text-[18px] text-gray-700 truncate">{review.content}</p>
							</section>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Review;
