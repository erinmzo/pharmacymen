import { useState } from "react";
import { Link } from "react-router-dom";

function PharmacyList({ pharmacy }) {
	const [isBookmark, setIsBookmark] = useState(false);
	const style = {
		backgroundImage: isBookmark ? "url(/img/icon_bookmark_on.png)" : "url(/img/icon_bookmark_off.png)"
	};
	const handleBookmark = () => {
		setIsBookmark((prev) => !prev);
	};

	return (
		<div className="relative">
			<Link to={`/list/detail/${pharmacy.id}`}>
				<div className="text-[28px] font-bold ">{pharmacy["place-name"]}</div>
				<div className="text-[18px]">{pharmacy.address}</div>
				<div className="text-[18px]">{pharmacy["phone-number"]}</div>
			</Link>
			<button
				onClick={handleBookmark}
				className="absolute right-0 top-[5px] w-[20px] h-[22px] bg-cover"
				style={style}
			></button>
		</div>
	);
}

export default PharmacyList;
