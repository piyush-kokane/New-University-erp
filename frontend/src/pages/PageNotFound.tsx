import { Link } from 'react-router-dom';
import Searchbar from '@/components/Searchbar';
import './styles/PageNotFound.css';



/* ===================== MAIN FUNCTION ===================== */
export default function PageNotFound() {
	return (
		<main className="pnf page-container">		
			<div className="page">

				{/*** SEARCHBAR ***/}
				<div className="searchbar-holder">
					<Searchbar forceTheme="dark"/>
				</div>

				{/*** TEXT ***/}
				<div className="text">
					<h1>404</h1>
					<h2>Page Not Found</h2>
				</div>

				{/*** FOOTER LINKS ***/}
				<div className="footer-links text-[18px]!">
					<div className="footer-line" />
					<p className="head">Go to:</p>
					
					<Link to="/" replace>Home</Link>
					<p className="separator">|</p>

					<Link to="/dashboard" replace>Dashboard</Link>
					<p className="separator">|</p>

					<Link to="/e-library" replace>E-Library</Link>
				</div>
				
			</div>
		</main>
	);
}
