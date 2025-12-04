import { useRef, useEffect, useState, type FormEvent, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';

import './styles/Login.css';



/* ===================== MAIN FUNCTION ===================== */
export default function LoginPage() {
  const { login, loggingIn, setLoggingOut } = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);


  /* ___ Reset Logout Flag on Mount ___ */
  useEffect(() => {
    setLoggingOut(false);
  }, []);

  
  /* ___ Set Error Fields + Input Focus + Toast ___ */
  const setErrorFields = (
    msg: string,
    ref: RefObject<HTMLInputElement | null>,
    setter: (v: boolean) => void
  ) => {
    setErrorMsg(msg);
    ref.current?.focus();
    setter(true);
    toast.error(msg);
  };


  /* ___ Handle Login Logic ___ */
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();	// prevent page refresh

    // Reset error flags
    setUsernameError(false);
    setPasswordError(false);
    setErrorMsg(null);

    // Check if username or password is empty
    if (username.trim() === '') {
      setErrorFields('Username cannot be empty', usernameRef, setUsernameError);
      return;
    }
    if (password.trim() === '') {
      setErrorFields('Password cannot be empty', passwordRef, setPasswordError);
      return;
    }

    // Call login from useUser
    const loginError = await login(username, password);

    // If error
    if (loginError) {
      if (loginError.status === 400) {
        setErrorFields(loginError.message, usernameRef, setUsernameError);
      }
      if (loginError.status === 401) {
        setErrorFields(loginError.message, passwordRef, setPasswordError);
      }
    }
  };


  /* ====== UI ====== */
  return (
    <div className="login page-container">	
      <div className="page">
        
        {/*** LOGO ***/}
        <img src="/images/mit-logo-banner.png" alt="MIT WPU" className="logo" />

        {/*** FOOTER LINKS ***/}
        <div className="footer-links">
          <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> {/* open link in new tab with security */}
          <p className="separator">|</p>
          <Link to="/terms-&-conditions" target="_blank" rel="noopener noreferrer">Terms & Conditions</Link> {/* open link in new tab with security */}
        </div>

        {/*** LOGIN FORM ***/}
        <form className="login-container" onSubmit={handleLogin}>

          {/* Header */}
          <h1>Login to MIT-WPU</h1>

          {/* Username Input */}
          <div className={`input-group ${usernameError ? 'error' : ''}`}>
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
          <div className={`input-group ${passwordError ? 'error' : ''}`}>
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
          {errorMsg && <p className="error-msg">{errorMsg}</p>}

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
              <span className="material-symbols-rounded spin">progress_activity</span>
            </div>
          )}

        </form>

      </div>
    </div>
  );
}
