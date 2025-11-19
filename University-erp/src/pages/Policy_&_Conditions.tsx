import { useNavigate, useLocation } from 'react-router-dom';
import Policy from '@/components/policy_&_conditions/Privacy_Policy';
import Terms from '@/components/policy_&_conditions/Terms_&_Conditions';
import BG from '@/bg/BG2';
import './styles/Policy_&_Conditions.css';


/* ===== Main Function ===== */
export default function PolicyPage() {
	const navigate = useNavigate();
	const location = useLocation();

	const onPolicy = location.pathname == '/privacy-policy'; // check if user is on privacy-policy page if yes set onPolicy to true
	const onTerms = location.pathname == '/terms-&-conditions'; // check if user is on terms-&-conditions page if yes set onTerms to true


	/* === UI === */
	return (
		<div className="policy page">
			{/*** Background ***/}
			<BG />

			{/*** Logo ***/}
			<img className="logo" src="/images/mit-logo.png" />

			{/*** Footer Links ***/}
			<div className="footer-links">
				<a href="/privacy-policy">Privacy Policy</a>
				<p className="separator">|</p>
				<a href="/terms-&-conditions">Terms & Conditions</a>
			</div>

			{/*** Content Container ***/}
			<div className="container">
				{/* Back Button 1 */}
				<button className="back-btn a" onClick={() => navigate('/login')}>
					<span className="material-symbols-rounded">arrow_back_ios</span>
					Return
				</button>

				{/* Show Privacy Policy */}
				{onPolicy && <Policy />}

				{/* Show Terms & Conditions */}
				{onTerms && <Terms />}

				{/* Back Button 2 */}
				<button className="back-btn b" onClick={() => navigate('/login')}>
					<span className="material-symbols-rounded">arrow_back_ios</span>
					Return
				</button>
			</div>
		</div>
	);
}
