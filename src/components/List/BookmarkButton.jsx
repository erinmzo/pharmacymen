function BookmarkButton({ pharmacy, handleBookmark, isBookmark }) {
	const style = {
		backgroundImage: isBookmark ? "url(/img/icon_bookmark_on.png)" : "url(/img/icon_bookmark_off.png)"
	};
	return (
		<button
			onClick={() => handleBookmark(pharmacy.id)}
			className="absolute right-0 top-[5px] w-[20px] h-[22px] bg-cover"
			style={style}
		></button>
	);
}

export default BookmarkButton;
