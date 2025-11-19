import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import BG from '@/bg/BG2';
import './styles/Login.css';


/* ===== Main Function ===== */
export default function LoginPage() {
	const { login, isLoading } = useUser();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | null>(null);


	/* === Handle login logic here === */
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevent page refresh

		setError(null);
		const error = await login(username, password);
		if (error) setError(error); // setError only if login failed
	};


	/* === UI === */
	return (
		<div className="login page">
			{/*** Background ***/}
			<BG />

			{/*** Logo ***/}
			<img src="/images/mit-logo-banner1.png" alt="MIT WPU" className="logo" />

			{/*** Footer Links ***/}
			<div className="footer-links">
				<a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> {/* open link in new tab with security*/}
				<p className="separator">|</p>
				<a href="/terms-&-conditions" target="_blank" rel="noopener noreferrer">Terms & Conditions</a> {/* open link in new tab with security*/}
			</div>

			{/*** Login Form ***/}
			<form className="login-container" onSubmit={handleSubmit}>
				{/* Header */}
				<h1>Login to MIT-WPU</h1>

				{/* Username Input */}
				<div className="input-group">
					<input
						type="text"
						placeholder="Username"
						className="input-field"
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<span className="material-icons input-icon">person</span>
				</div>

				{/* Password Input */}
				<div className="input-group">
					<input
						type={showPassword ? 'text' : 'password'}
						placeholder="Password"
						className="input-field"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<span
						className="material-icons password-toggle"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? 'visibility_off' : 'visibility'}
					</span>
				</div>

				{/* Error Message */}
				{error && <p className="error">{error}</p>}

				{/* Remember me & Forgot Password */}
				<div className="actions-flex">
					<div className="remember-me">
						<input
							type="checkbox"
							checked={rememberMe}
							onChange={() => setRememberMe(!rememberMe)}
						/>
						<p>Remember me</p>
					</div>
					<a href="/forgot-password" className="forgot-password">Forgot Password?</a>
				</div>

				{/* Login Button */}
				{!isLoading && (
					<button type="submit" className="login-btn">
						Login
					</button>
				)}

				{/* Logging in */}
				{isLoading && (
					<div className="login-btn logging-in">
						Logging in
						<span className="material-symbols-rounded">progress_activity</span>
					</div>
				)}
			</form>
		</div>
	);
}
