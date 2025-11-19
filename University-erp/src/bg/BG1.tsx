import './styles/BG.css';

export default function BG() {
	return (
		<div className="bg">
			{/* Background image */}
			<img src="/images/bg.png" className="bg-image invertable" />

			{/* Background Overlay */}
			<div className="bg-overlay"></div>
		</div>
	);
}
