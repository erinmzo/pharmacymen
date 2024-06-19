import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import useAuthStore from "../../zustand/auth";

function LoginForm() {
	const navigate = useNavigate();
	const [userId, setUserId] = useState("");
	const [userPw, setUserPw] = useState("");
	const saveUserInfo = useAuthStore((state) => state.saveUserInfo);

	const handlLoginSubmit = async (e) => {
		e.preventDefault();
		const userInfo = {
			email: userId,
			password: userPw
		};
		const data = await loginUser(userInfo);
		if (data) {
			saveUserInfo(data);
			navigate("/");
		} else {
			alert("로그인에 실패했습니다.");
		}
	};
	return (
		<div className="flex justify-center items-center py-[60px]">
			<div className="flex flex-col gap-[20px] w-[474px]">
				<form onSubmit={handlLoginSubmit} className="flex flex-col gap-[20px]">
					<div className="flex items-center">
						<label htmlFor="userId" className="w-[100px] text-[22px]">
							아이디
						</label>
						<input
							type="text"
							id="userId"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							className="p-[12px] w-[374px] border-2 rounded-md border-green-400"
						/>
					</div>
					<div className="flex items-center">
						<label htmlFor="userPw" className="w-[100px] text-[22px]">
							비밀번호
						</label>
						<input
							type="password"
							id="userPw"
							value={userPw}
							onChange={(e) => setUserPw(e.target.value)}
							className="p-[12px] w-[374px] border-2 rounded-md border-green-400"
						/>
					</div>
					<button className="text-[24px] p-[12px] w-[100%] border-2 rounded-md border-green-400 bg-green-400">
						로그인
					</button>
				</form>
				<Link
					to="/join"
					className="text-center text-[24px] p-[12px] w-[100%] border-2 rounded-md border-yellow-400 bg-yellow-400"
				>
					회원가입
				</Link>
			</div>
		</div>
	);
}

export default LoginForm;
