import Header from "../components/Header/Header";
import BookmarkList from "../components/Mypage/BookmarkList";

function Mypage() {
	return (
		<>
			<Header />
			<h2 className="text-[48px] text-center pt-[100px] font-bold">마이페이지</h2>
			<BookmarkList />
		</>
	);
}

export default Mypage;
