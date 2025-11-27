import { Link } from "react-router-dom";
import Searchbar from '@/components/Searchbar';
import './styles/PageNotFound.css';


/* ===== Main Function ===== */
export default function PageNotFound() {
	return (
		<main className="pnf page-container">		
			<div className="page">
				{/*** Searchbar ***/}
				<div className="searchbar-holder">
					<Searchbar />
				</div>

				{/*** Text ***/}
				<div className="text">
					<h1>404</h1>
					<h2>Page Not Found</h2>
				</div>

				{/*** Footer Links ***/}
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
