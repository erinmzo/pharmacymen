import { Link } from "react-router-dom";
import HeaderLogin from "./HeaderLogin";

function Header() {
	return (
		<header className="flex justify-between items-center bg-gray-50 p-[32px]">
			<h1 className="flex justify-center items-center text-[42px] font-bold text-green-400">
				<Link to="/" className="flex justify-center items-center">
					<img src="/img/logo-pharmacymen.png" />
					<span className="ml-[10px]">약국 어디 가멘</span>
				</Link>
			</h1>
			<HeaderLogin />
		</header>
	);
}

export default Header;
