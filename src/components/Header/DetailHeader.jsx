import { useNavigate } from "react-router-dom";
import HeaderLogin from "./HeaderLogin";

function DetailHeader() {
	const navigate = useNavigate();
	const handleBack = () => navigate(-1);
	return (
		<header className="flex justify-between items-center p-[15px] bg-green-400">
			<button onClick={handleBack}>
				<img src="/img/icon_back.png" alt="뒤로가기" />
			</button>
			<HeaderLogin />
		</header>
	);
}

export default DetailHeader;
