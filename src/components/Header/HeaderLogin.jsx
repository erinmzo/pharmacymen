import { Link, useParams } from "react-router-dom";
import { logOut } from "../../api/auth";
import useAuthStore from "../../zustand/auth";

function HeaderLogin() {
	const { detailId } = useParams();
	const saveUserInfo = useAuthStore((state) => state.saveUserInfo);
	const userInfo = useAuthStore((state) => state.userInfo);
	const handleLogout = async () => {
		saveUserInfo(null);
		await logOut();
	};

	return (
		<div>
			{userInfo ? (
				<div className="flex gap-5">
					<button
						onClick={handleLogout}
						className={`text-[20px] hover:underline ${detailId ? "text-white" : "text-black"}`}
					>
						로그아웃
					</button>
					<Link to="/my-page" className={`text-[20px] hover:underline ${detailId ? "text-white" : "text-black"}`}>
						마이페이지
					</Link>
				</div>
			) : (
				<Link to="/login" className={`text-[20px] hover:underline ${detailId ? "text-white" : "text-black"}`}>
					로그인
				</Link>
			)}
		</div>
	);
}

export default HeaderLogin;
