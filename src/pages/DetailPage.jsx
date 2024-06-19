import Detail from "../components/Detail/Detail";
import Review from "../components/Detail/Review";
import Footer from "../components/Footer/Footer";
import DetailHeader from "../components/Header/DetailHeader";

function DetailPage() {
	return (
		<>
			<DetailHeader />
			<Detail />
			<Review />
			<Footer />
		</>
	);
}

export default DetailPage;
