import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import s from "./auth.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("SERVER RESPONSE:", err.response?.data);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.page}>
      <div className={s.glowTR} />
      <div className={s.glowBL} />

      <div className={s.logoWrap}>
        <div className={s.logoIcon}>⌨️</div>
        <span className={s.logoText}>TypeMaster</span>
      </div>

      <div className={s.card}>
        <div className={s.cardShimmer} />

        <div className={s.cardHead}>
          <p className={s.eyebrow}>Welcome back</p>
          <h1 className={s.title}>Sign in</h1>
          <p className={s.sub}>Track your speed. Beat your best.</p>
        </div>

        <form onSubmit={handleLogin} className={s.form}>
          <div className={s.fieldGroup}>
            <label className={s.label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={s.input}
              required
            />
          </div>

          <div className={s.fieldGroup}>
            <label className={s.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={s.input}
              required
            />
          </div>

          {error && (
            <div className={s.errorBox}>
              <span className={s.errorDot} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className={s.btn}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>

        <p className={s.footerText}>
          No account?{" "}
          <Link to="/signup" className={s.link}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
