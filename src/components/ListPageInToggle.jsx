import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchMenuItems from "../api/pharmacy";
import iconClose from "../../public/img/icon_close.png";
import iconOpen from "../../public/img/icon_open.png";
import backIcon from "../../public/img/icon_back.png";

function ListPageInToggle() {
	const [isToggled, setIsToggled] = useState(true);
	const location = useLocation();
	const navigate = useNavigate();

	const lastFourDigits = location.pathname.slice(-4);

	const {
		data: menuItems,
		error,
		isLoading
	} = useQuery({
		queryKey: ["menuItems", lastFourDigits],
		queryFn: () => fetchMenuItems(lastFourDigits),
		enabled: !!lastFourDigits
	});

	const handleToggle = () => {
		setIsToggled(!isToggled);
	};

	const handleBack = () => {
		navigate(-1);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<>
			<div
				className={`fixed left-0 top-0 z-[100] h-full max-w-lg flex ${
					isToggled ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-1000 delay-200`}
			>
				<div className="w-full overflow-y-auto custom-scrollbar bg-gray-50">
					<div className="w-full px-4 py-4 bg-green-400 text-white flex items-center">
						<button onClick={handleBack} className="mr-2">
							<img src={backIcon} alt="Back Icon" className="w-6 h-6" />
						</button>
					</div>
					<nav className={`mt-4 ${isToggled ? "block" : "hidden"}`}>
						<ul className="">
							{menuItems.map((item, index) => (
								<li key={index}>
									<Link to={`/list/detail/${item.id}`}>
										<div className="block px-4 py-4 bg-gray-50 hover:bg-gray-100 border-b border-gray-200">
											<div className="font-bold">{item["place-name"]}</div>
											<div>{item.address}</div>
											<div>{item["phone-number"]}</div>
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
						<img src={isToggled ? iconClose : iconOpen} alt="Toggle Icon" className="w-6 h-6" />
					</button>
				</div>
			</div>
		</>
	);
}

export default ListPageInToggle;
