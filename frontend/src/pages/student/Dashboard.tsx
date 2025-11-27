import { useState } from 'react'
import Loading from '@/components/Loading';
import './styles/Dashboard.css';


/* ===== Main Function ===== */
export default function Dashboard() {
  const [isLoading, setLoading] = useState(false);

	/* === Loading Page === */
	if (isLoading) {
		return <Loading />
	}

	/* === UI === */
	return (
		<div className="dashboard page-container">
			<div className="page">
				<div className="content">
					<div className="container"><h1>Dashboard page</h1></div>
					<div className="container"></div>
					<div className="container"></div>
					
				</div>

				<div className="page-footer">
					<p>© 2025 All Rights Reservedㅤ-ㅤWebsite Designed and Developed by MIT-WPU</p>
					<a>Service Request<span className="material-icons">construction</span></a>
				</div>
			</div>


		</div>
	);
}
