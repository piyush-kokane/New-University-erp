import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import BG from '@/bg/BG2'
import "./Login.css"



export default function LoginPage() {
  const { login } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");



  // Handle login logic here
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Set user with JWT token
      login(data.token);
    }
    catch (error: any) {
      setError(error.message);
      toast.error(error.message);
      console.error("Login error:", error);
    }
  };



  return (
    <div className="login-page">
      <BG/>

      <img src="/images/mit-logo-banner1.png" alt="MIT WPU" className="logo" />

      <div className="footer-links">
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> {/* Opens link in new tab with security*/}
        <p className="separator">|</p>
        <a href="/terms-&-conditions" target="_blank" rel="noopener noreferrer">Terms & Conditions</a> {/* Opens link in new tab with security*/}
      </div>

      <div className="login-container">
        <h1>Login to MIT-WPU</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="material-icons input-icon">person</span>
          </div>

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="material-icons password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>

          {error && <p className="error">{error}</p>}

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

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
