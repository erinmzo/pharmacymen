import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PharmacyList from "./PharmacyList";
import backIcon from "/img/icon_back.png";
import iconClose from "/img/icon_close.png";
import iconOpen from "/img/icon_open.png";
import "./ListPageStyle.css";

function ListPageToggle({ menuItems: pharmacies, selectedMarkerId }) {
	const [isToggled, setIsToggled] = useState(true);
	const navigate = useNavigate();
	const refs = useRef([]);

	const handleToggle = () => {
		setIsToggled(!isToggled);
	};

	const handleBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		if (selectedMarkerId && refs.current[selectedMarkerId]) {
			refs.current[selectedMarkerId].scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}, [selectedMarkerId]);

	return (
		<>
			<div
				className={`fixed left-0 top-0 z-[100] h-full max-w-lg flex ${
					isToggled ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-1000 delay-200`}
			>
				<div className="w-full overflow-y-auto custom-scrollbar bg-gray-50 ">
					<div className="fixed w-full px-4 py-7 bg-green-400 text-white flex items-center z-10">
						<button onClick={handleBack} className="mr-2">
							<img src={backIcon} alt="Back Icon" />
						</button>
					</div>
					<nav className="mt-4">
						<ul>
							<div className="px-8 py-2 flex items-center h-full">
								<p className="text-[34px] font-bold text-green-400 inline-block">
									{pharmacies.length > 0 && pharmacies[0]["place-area"].slice(0, -1)}
								</p>
								<p className="text-[18px] inline-block px-2">총 검색 결과는 {pharmacies.length}개입니다.</p>
							</div>

							{pharmacies.map((pharmacy, index) => (
								<li key={index} className="px-4">
									<div
										ref={(el) => (refs.current[pharmacy.id] = el)}
										className={`block px-4 py-6 border-b-2 border-gray-200 ${
											selectedMarkerId === pharmacy.id
												? "bg-yellow-100 hover:bg-yellow-200"
												: "bg-gray-50 hover:bg-gray-100"
										}`}
									>
										<PharmacyList pharmacy={pharmacy} />
									</div>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<div className="absolute right-[-48px] top-0 z-[101] h-full flex items-center">
					<button
						onClick={handleToggle}
						className="bg-green-400 text-white w-12 h-12 rounded-r-full flex items-center justify-center"
					>
						<img src={isToggled ? iconClose : iconOpen} alt="Toggle Icon" />
					</button>
				</div>
			</div>
		</>
	);
}

export default ListPageToggle;
