import Header from "../components/Header/Header";
import LoginForm from "../components/Login/LoginForm";

function LoginPage() {
	return (
		<>
			<Header />
			<h2 className="text-[48px] text-center pt-[100px] font-bold">로그인</h2>
			<LoginForm />
		</>
	);
}

export default LoginPage;
