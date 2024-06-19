import { Link, useParams } from "react-router-dom";
import { logOut } from "../../api/Auth";
import useAuthStore from "../../zustand/Auth";

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
				<button
					onClick={handleLogout}
					className={`text-[20px] hover:underline ${detailId ? "text-white" : "text-black"}`}
				>
					로그아웃
				</button>
			) : (
				<Link to="/login" className={`text-[20px] hover:underline ${detailId ? "text-white" : "text-black"}`}>
					로그인
				</Link>
			)}
		</div>
	);
}

export default HeaderLogin;
