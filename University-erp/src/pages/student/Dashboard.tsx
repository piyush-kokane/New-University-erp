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
				<h1>Dashboard page</h1>
			</div>
		</div>
	);
}
