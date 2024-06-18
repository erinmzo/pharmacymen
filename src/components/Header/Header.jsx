import { Link } from "react-router-dom";
import { logOut } from "../../api/Auth";
import useAuthStore from "../../zustand/Auth";

function Header() {
	const saveUserInfo = useAuthStore((state) => state.saveUserInfo);
	const userInfo = useAuthStore((state) => state.userInfo);
	const handleLogout = async () => {
		saveUserInfo(null);
		await logOut();
	};

	return (
		<header className="flex justify-between items-center bg-gray-50 p-[32px]">
			<h1 className="flex justify-center items-center text-[42px] font-bold text-green-400">
				<img src="/img/logo-pharmacymen.png" />
				<span className="ml-[10px]">약국 어디 가멘</span>
			</h1>
			{userInfo ? (
				<button onClick={handleLogout} className="text-[24px] hover:underline">
					로그아웃
				</button>
			) : (
				<Link to="/login" className="text-[24px] hover:underline">
					로그인
				</Link>
			)}
		</header>
	);
}

export default Header;
