import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import supabase from "../supabase/supabase";

function ListPageInToggle() {
	const [isToggled, setIsToggled] = useState(true);
	const [menuItems, setMenuItems] = useState([]);
	const location = useLocation();

	useEffect(() => {
		fetchMenuItems();
	}, [location.pathname]);

	const fetchMenuItems = async () => {
		try {
			// URL 경로에서 마지막 4자리 숫자 추출
			const lastFourDigits = location.pathname.substr(-4);

			// place-code가 일치하는 데이터를 가져오는 쿼리
			const { data, error } = await supabase
				.from("pharmacy")
				.select("id, place-name, address, phone-number")
				.eq("place-code", Number(lastFourDigits));

			if (error) {
				throw error;
			} else {
				setMenuItems(data);
			}
		} catch (error) {
			console.error("메뉴 항목을 가져오는 중 오류 발생:", error.message);
		}
	};

	const handleToggle = () => {
		setIsToggled(!isToggled);
	};

	return (
		<div
			className={`fixed right-0 top-0 z-[100] h-full max-w-lg flex ${
				isToggled ? "translate-x-0" : "translate-x-[calc(100%-3rem)]"
			} transition-transform duration-1000 delay-200`}
		>
			<div className="flex items-center">
				<button
					onClick={handleToggle}
					className=" bg-green-400 text-white w-12 h-12 rounded-l-full flex items-center justify-center"
				>
					<i className="text-2xl">{isToggled ? ">" : "<"}</i>
				</button>
			</div>
			<div className="w-full overflow-y-auto custom-scrollbar bg-gray-50">
				<button onClick={handleToggle} className="w-full px-4 py-4 bg-green-400 text-white">
					{isToggled ? "메뉴 숨기기" : "메뉴 보이기"}
				</button>
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
		</div>
	);
}

export default ListPageInToggle;
