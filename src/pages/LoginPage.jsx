import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        
        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Basic password length validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        
        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="app-title">Soccer Tournament Manager</h2>

        {/* Tabs */}
        <div className="tab-container">
          <button
            className={activeTab === "login" ? "tab active" : "tab"}
            onClick={() => {
              setActiveTab("login");
              setError("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            }}
          >
            Login
          </button>
          <button
            className={activeTab === "register" ? "tab active" : "tab"}
            onClick={() => {
              setActiveTab("register");
              setError("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
            }}
          >
            Register
          </button>
        </div>

        {/* Error message */}
        {error && <div className="error-message">{error}</div>}

        {/* Login Form */}
        {activeTab === "login" && (
          <form className="form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === "register" && (
          <form className="form" onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        )}

        <p className="description">
          Create and manage soccer tournaments, view tournament details and
          notify players from the palm of your hand!
        </p>
      </div>
    </div>
  );
}

export default LoginPage;