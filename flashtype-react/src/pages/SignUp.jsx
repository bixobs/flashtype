import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import s from "./auth.module.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/signup", { username, email, password });
      setSuccess(true);
      setTimeout(() => navigate("/"), 1800);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Sign up failed. Please try again.");
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

        {success ? (
          <div className={s.successWrap}>
            <div className={s.successIcon}>✓</div>
            <h2 className={s.successTitle}>You're in!</h2>
            <p className={s.successSub}>Account created. Redirecting to login…</p>
          </div>
        ) : (
          <>
            <div className={s.cardHead}>
              <p className={s.eyebrow}>Join TypeMaster</p>
              <h1 className={s.title}>Create account</h1>
              <p className={s.sub}>Start tracking your speed today.</p>
            </div>

            <form onSubmit={handleSignup} className={s.form}>
              <div className={s.fieldGroup}>
                <label className={s.label}>Username</label>
                <input
                  type="text"
                  placeholder="speedster42"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={s.input}
                  required
                />
              </div>

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
                {loading ? "Creating account…" : "Create account →"}
              </button>
            </form>

            <p className={s.footerText}>
              Already have an account?{" "}
              <Link to="/" className={s.link}>
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
