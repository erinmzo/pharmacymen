import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinUser } from "../../api/auth";

function JoinForm() {
	const navigate = useNavigate();
	const [userId, setUserId] = useState("");
	const [userPw, setUserPw] = useState("");
	const [userPwConfirm, setUserPwConfirm] = useState("");

	const handleJoinSubmit = async (e) => {
		e.preventDefault();
		const userInfo = {
			email: userId,
			password: userPw
		};
		const error = await joinUser(userInfo);

		if (error) {
			alert(error.message);
		} else {
			alert("회원가입이 성공적으로 완료되었습니다.");
			navigate("/login");
		}
	};
	return (
		<div className="flex justify-center items-center py-[60px]">
			<div className="flex flex-col gap-[20px] w-[474px]">
				<form onSubmit={handleJoinSubmit} className="flex flex-col gap-[20px]">
					<div className="flex items-center">
						<label htmlFor="userId" className="w-[150px] text-[22px]">
							아이디
						</label>
						<input
							type="text"
							id="userId"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							placeholder="이메일 형식만 가능합니다."
							className="p-[12px] w-[324px] border-2 rounded-md border-green-400"
						/>
					</div>
					<div className="flex  items-center">
						<label htmlFor="userPw" className="w-[150px] text-[22px]">
							비밀번호
						</label>
						<input
							type="password"
							id="userPw"
							value={userPw}
							placeholder="6자리 이상 입력해주세요."
							onChange={(e) => setUserPw(e.target.value)}
							className="p-[12px] w-[324px] border-2 rounded-md border-green-400"
						/>
					</div>
					<div className="flex items-center">
						<label htmlFor="userPwConfirm" className="w-[150px] text-[22px]">
							비밀번호 확인
						</label>
						<input
							type="password"
							id="userPwConfirm"
							value={userPwConfirm}
							placeholder="비밀번호 재입력"
							onChange={(e) => setUserPwConfirm(e.target.value)}
							className="p-[12px] w-[324px] border-2 rounded-md border-green-400"
						/>
					</div>
					<button className="text-[24px] p-[12px] w-[100%] border-2 rounded-md border-green-400 bg-green-400">
						회원가입
					</button>
				</form>
			</div>
		</div>
	);
}

export default JoinForm;
