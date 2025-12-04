import { useState } from 'react';
import './styles/Dashboard.css';



/* ===================== MAIN FUNCTION ===================== */
export default function Dashboard() {
  const [loading, setLoading] = useState(false);


  /* ====== UI ====== */
  return (
    <div className="dashboard page-container">
      {loading && (
        <p className="_loading">Loading</p>
      )}

      {!loading && (
        <div className="page">

          {/*** PAGE CONTENT ***/}
          <div className="content">
            <div className="container"><h1>Dashboard page</h1></div>
            <div className="container"></div>
            <div className="container"></div>
          </div>

          {/*** FOOTER ***/}
          <div className="page-footer">
            <p>© 2025 All Rights Reservedㅤ-ㅤWebsite Designed and Developed by MIT-WPU</p>
            <a>Service Request<span className="material-icons">construction</span></a>
          </div>

        </div>
      )}
    </div>
  );
}
