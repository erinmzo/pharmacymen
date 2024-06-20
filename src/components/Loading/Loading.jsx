import Spinner from "/img/loading-spinner.gif";

const Loading = () => {
	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<p className="text-green-400 font-bold text-[26px]">하꼼만 이십서</p>
			<img src={Spinner} alt="로딩" width="10%" />
		</div>
	);
};

export default Loading;
