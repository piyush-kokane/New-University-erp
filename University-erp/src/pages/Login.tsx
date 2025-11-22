import { Link } from "react-router-dom";
import { useRef, useEffect, useState, type FormEvent } from 'react';
import { useUser } from '@/hooks/useUser';
import './styles/Login.css';


/* ===== Main Function ===== */
export default function LoginPage() {
	const { login, loggingIn, setLoggingOut } = useUser();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | null>(null);


	/* === Ref for input fields === */
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);


	/* === Reset logout flag when Login page loads === */
	useEffect(() => {
		setLoggingOut(false);
	}, []);

	
	/* === Handle login logic === */
	const handleLogin = async (e: FormEvent) => {
		e.preventDefault(); // Prevent page refresh

		setError(null);

		// check if username or password is empty
		if (username.trim() === '') {
			setError('Username cannot be empty');
			usernameRef.current?.focus();
			return;
		}
		if (password.trim() === '') {
			setError('Password cannot be empty');
			passwordRef.current?.focus();
			return;
		}

		// call login fron useUser
		const error = await login(username, password);
		if (error) setError(error); // setError only if login failed
	};


	/* === UI === */
	return (
		<div className="login page-container">	
			<div className="page">
				{/*** Logo ***/}
				<img src="/images/mit-logo-banner1.png" alt="MIT WPU" className="logo" />

				{/*** Footer Links ***/}
				<div className="footer-links">
					<Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> {/* open link in new tab with security*/}
					<p className="separator">|</p>
					<Link to="/terms-&-conditions" target="_blank" rel="noopener noreferrer">Terms & Conditions</Link> {/* open link in new tab with security*/}
				</div>

				{/*** Login Form ***/}
				<form className="login-container" onSubmit={handleLogin}>
					{/* Header */}
					<h1>Login to MIT-WPU</h1>

					{/* Username Input */}
					<div className="input-group">
						<input
							ref={usernameRef}
							type="text"
							placeholder="Username"
							className="input-field"
							value={username}
							onChange={e => setUsername(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									passwordRef.current?.focus(); // move focus to password input
								}
							}}
						/>
						<span className="material-icons input-icon">person</span>
					</div>

					{/* Password Input */}
					<div className="input-group">
						<input
							ref={passwordRef}
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
						<label className="remember-me">
							<input
								type="checkbox"
								checked={rememberMe}
								onChange={() => setRememberMe(!rememberMe)}
							/>
							<p>Remember me</p>
						</label>
						<Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
					</div>

					{/* Login Button */}
					{!loggingIn && (
						<button type="submit" className="login-btn">
							Login
						</button>
					)}

					{/* Logging in */}
					{loggingIn && (
						<div className="login-btn logging-in">
							Logging in
							<span className="material-symbols-rounded">progress_activity</span>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}
