import './styles/Landing.css';
import bannerVideo from '/videos/banner-video.mp4';



/* ===================== MAIN FUNCTION ===================== */
export default function Landing() {
  return (
    <div className="landing page-container">
      <video autoPlay loop muted playsInline>
        <source src={bannerVideo} type="video/mp4" />
      </video>
    </div>
  );
}
