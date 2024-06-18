import { Link } from "react-router-dom";

function SelectRegion() {
	return (
		<main className="bg-green-400">
			<div className="w-[1000px] mx-auto py-[160px]">
				<ul className="relative py-[275px] bg-contain bg-center bg-no-repeat bg-[url('/img/bg-jeju-map.png')]">
					<li className="absolute font-bold text-[28px] left-[90px] top-[260px]">
						<Link to="/list/1001">한경면</Link>
					</li>
					<li className="absolute font-bold text-[28px] left-[190px] top-[200px] hover:text-green-400 hover:underline">
						<Link to="/list/1002">한림읍</Link>
					</li>
					<li className="absolute font-bold text-[28px] left-[290px] top-[120px] hover:text-green-400 hover:underline">
						<Link to="/list/1003">애월읍</Link>
					</li>
					<li className="absolute font-bold text-[28px] left-[460px] top-[85px] hover:text-green-400 hover:underline">
						<Link to="/list/1004">제주시</Link>
					</li>
					<li className="absolute font-bold text-[28px] left-[600px] top-[50px] hover:text-green-400 hover:underline">
						<Link to="/list/1005">조천읍</Link>
					</li>
					<li className="absolute font-bold text-[28px] left-[730px] top-[60px] hover:text-green-400 hover:underline">
						<Link to="/list/1006">구좌읍</Link>
					</li>
					<li className="absolute font-bold text-[28px] left-[780px] top-[140px] hover:text-green-400 hover:underline">
						<Link to="/list/1007">성산읍</Link>
					</li>
					<li className="absolute font-bold text-[28px] left-[700px] top-[230px] hover:text-green-400 hover:underline">
						<Link to="/list/1008">표선면</Link>
					</li>
					<li className="absolute font-bold text-[28px] left-[590px] top-[270px] hover:text-green-400 hover:underline">
						<Link to="/list/1009">남원읍</Link>
					</li>
					<li className="absolute font-bold text-[28px] left-[470px] top-[310px] hover:text-green-400 hover:underline">
						<Link to="/list/1010">서귀포</Link>
					</li>
					<li className="absolute font-bold text-[28px] left-[290px] top-[310px] hover:text-green-400 hover:underline">
						<Link to="/list/1011">안덕면</Link>
					</li>
					<li className="absolute font-bold text-[28px] left-[150px] top-[330px] hover:text-green-400 hover:underline">
						<Link to="/list/1012">대정읍</Link>
					</li>
				</ul>
			</div>
		</main>
	);
}

export default SelectRegion;
