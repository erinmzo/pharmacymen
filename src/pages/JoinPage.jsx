import Header from "../components/Header/Header";
import JoinForm from "../components/Join/JoinForm";
function JoinPage() {
	return (
		<div>
			<Header />
			<h2 className="text-[48px] text-center pt-[100px] font-bold">회원가입</h2>
			<JoinForm />
		</div>
	);
}

export default JoinPage;
