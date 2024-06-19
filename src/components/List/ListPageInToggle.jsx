import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backIcon from "/img/icon_back.png";
import iconClose from "/img/icon_close.png";
import iconOpen from "/img/icon_open.png";

function ListPageInToggle({ menuItems, selectedMarkerId }) {
	const [isToggled, setIsToggled] = useState(true);
	const navigate = useNavigate();

	const handleToggle = () => {
		setIsToggled(!isToggled);
	};

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<>
			<div
				className={`fixed left-0 top-0 z-[100] h-full max-w-lg flex ${
					isToggled ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-1000 delay-200`}
			>
				<div className="w-full overflow-y-auto custom-scrollbar bg-gray-50">
					<div className="w-full px-4 py-7 bg-green-400 text-white flex items-center">
						<button onClick={handleBack} className="mr-2">
							<img src={backIcon} alt="Back Icon" />
						</button>
					</div>
					<nav className={`mt-4 ${isToggled ? "block" : "hidden"}`}>
						<ul className="">
							<div className="px-4 py-2">
								<p className="text-[34px] font-bold text-green-400 inline-block">
									{menuItems.length > 0 && menuItems[0]["place-area"].slice(0, 2)}
								</p>
								<p className="text-[18px] inline-block px-2">총 검색 결과는 {menuItems.length}개 입니다.</p>
							</div>

							{menuItems.map((item, index) => (
								<li key={index}>
									<Link to={`/list/detail/${item.id}`}>
										<div
											className={`block px-4 py-6 border-b border-gray-200 ${
												selectedMarkerId === item.id
													? "bg-yellow-100 hover:bg-yellow-200"
													: "bg-gray-50 hover:bg-gray-100"
											}`}
										>
											<div className="text-[28px] font-bold ">{item["place-name"]}</div>
											<div className="text-[18px]">{item.address}</div>
											<div className="text-[18px]">{item["phone-number"]}</div>
										</div>
									</Link>
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

export default ListPageInToggle;
