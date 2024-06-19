import { useNavigate } from "react-router-dom";

function DetailHeader() {
	const navigate = useNavigate();
	const handleBack = () => navigate(-1);
	return (
		<header className="p-[15px] bg-green-400">
			<button onClick={handleBack}>
				<img src="/img/icon_back.png" alt="뒤로가기" />
			</button>
		</header>
	);
}

export default DetailHeader;
