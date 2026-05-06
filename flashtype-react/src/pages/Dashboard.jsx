import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import s from "./Dashboard.module.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    API.get("/me")
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.log(err);
        alert("Failed to load dashboard");
      });
  }, []);

  if (!user) {
    return (
      <div className={s.loadingWrap}>
        <span className={s.loadingDot} />
        <p className={s.loadingText}>Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className={s.container}>
      <div className={s.glowTopRight} />
      <div className={s.glowBottomLeft} />

      <div className={s.topBar}>
        <div className={s.logo}>
          <div className={s.logoIcon}>⌨️</div>
          TypeMaster
        </div>
        <div className={s.topBarActions}>
          <button className={s.btnGhost} onClick={() => navigate("/profile")}>
            View Profile
          </button>
          <button className={s.btnDanger} onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>

      <div className={s.hero}>
        <p className={s.eyebrow}>Welcome back</p>
        <h1 className={s.heroTitle}>{user.username || "User"}</h1>
        <p className={s.heroSub}>
          Track your speed · Beat your best · Climb the leaderboard
        </p>
      </div>

      <div className={s.statGrid}>
        <div className={s.statCard}>
          <div className={s.statShimmer} />
          <p className={s.statLabel}>Total Tests</p>
          <p className={s.statValue}>{user.totalTests ?? "—"}</p>
          <span className={s.statBadge}>↑ This session</span>
        </div>

        <div className={s.statCard}>
          <div className={s.statShimmer} />
          <p className={s.statLabel}>Average WPM</p>
          <p className={s.statValue}>{user.avgWpm ?? "—"}</p>
          <span className={s.statBadge}>↑ 4 pts</span>
        </div>

        <div className={s.statCard}>
          <div className={s.statShimmer} />
          <p className={s.statLabel}>Personal Best</p>
          <p className={s.statValue}>{user.bestWpm ?? "—"}</p>
          <span className={s.statBadge}>Top tier</span>
        </div>
      </div>

      <div className={s.divider} />

      <div className={s.actionGrid}>
        <button className={s.btnPrimary} onClick={() => navigate("/test")}>
          <span>
            Start Typing Test
            <span className={s.btnSubLabel}>30 · 60 · 120 second modes</span>
          </span>
          <span className={s.arrow}>→</span>
        </button>

        <button
          className={s.btnSecondary}
          onClick={() => navigate("/leaderboard")}
        >
          <span>
            Leaderboard
            <span className={s.btnSubLabel}>See global rankings</span>
          </span>
          <span className={s.btnSecondaryArrow}>↗</span>
        </button>
      </div>

      <div className={s.activityRow}>
        <div className={`${s.activityDot} ${s.activityDotPulse}`} />
        <div className={s.activityDot} />
        <div className={s.activityDot} />
        <div className={s.activityBar}>
          <div className={s.activityFill} />
        </div>
        <span className={s.activityText}>Progress to next rank</span>
      </div>
    </div>
  );
} 
