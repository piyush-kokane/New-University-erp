import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Policy from '@/components/policy_&_conditions/Privacy_Policy';
import Terms from '@/components/policy_&_conditions/Terms_&_Conditions';

import './styles/Policy_&_Conditions.css';



/* ===================== MAIN FUNCTION ===================== */
export default function PolicyPage() {
	const navigate = useNavigate();
	const location = useLocation();

	const onPolicy = location.pathname == '/privacy-policy'; // check if user is on privacy-policy page if yes set onPolicy to true
	const onTerms = location.pathname == '/terms-&-conditions'; // check if user is on terms-&-conditions page if yes set onTerms to true


	/* ___ Dynamically Change Title ___ */
	useEffect(() => {
		// Change document title
		if (onPolicy) document.title = 'Privacy Policy';
		if (onTerms) document.title = 'Terms & Conditions';

		// Scroll to top 
		const page = document.querySelector('.page-container') as HTMLElement | null;
		if (page) {
			page.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}
	}, [location.pathname]);


	/* ====== UI ====== */
	return (
		<div className="policy page-container">		
			<div className="page">

				{/*** LOGO ***/}
				<img className="logo" src="/images/mit-logo.png" />

				{/*** FOOTER LINKS ***/}
				<div className="footer-links">
					<Link to="/privacy-policy">Privacy Policy</Link>
					<p className="separator">|</p>
					<Link to="/terms-&-conditions">Terms & Conditions</Link>
				</div>

				{/*** CONTENT CONTAINER ***/}
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
					<Link to="/login" className="back-btn b">
						<span className="material-symbols-rounded">arrow_back_ios</span>
						Return
					</Link>

				</div>

			</div>
		</div>
	);
}
