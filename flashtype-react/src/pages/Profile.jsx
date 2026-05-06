import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import s from "./Profile.module.css";

// Computes the accuracy bar gradient based on score threshold.
// Width is a runtime value so it stays inline — but the gradient
// logic is extracted here so the JSX stays clean.
function getAccuracyBarStyle(accuracy) {
  const background =
    accuracy >= 95
      ? "linear-gradient(90deg, #6ee7b7, #34d399)"
      : accuracy >= 80
      ? "linear-gradient(90deg, #d4af5f, #c49a3c)"
      : "linear-gradient(90deg, #f87171, #ef4444)";

  return { width: `${accuracy}%`, background };
}

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/me")
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.log(err);
        alert("Failed to load profile");
      });
  }, []);

  if (!user) {
    return (
      <div className={s.loadingWrap}>
        <span className={s.loadingDot} />
        <p className={s.loadingText}>Loading profile…</p>
      </div>
    );
  }

  return (
    <div className={s.page}>
      <div className={s.glowTR} />
      <div className={s.glowBL} />

      <div className={s.topBar}>
        <div className={s.logo}>
          <div className={s.logoIcon}>⌨️</div>
          TypeMaster
        </div>
        <button className={s.btnGhost} onClick={() => navigate("/dashboard")}>
          ← Dashboard
        </button>
      </div>


      <div className={s.heroCard}>
        <div className={s.heroShimmer} />
        <div className={s.avatarWrap}>
          <div className={s.avatar}>
            {user.username?.charAt(0).toUpperCase()}
          </div>
          <div className={s.avatarGlow} />
        </div>
        <div>
          <p className={s.eyebrow}>Typist profile</p>
          <h1 className={s.heroName}>{user.username}</h1>
          <p className={s.heroSub}>Your typing performance overview</p>
        </div>
      </div>

      <div className={s.statGrid}>
        <div className={s.statCard}>
          <div className={s.statShimmer} />
          <p className={s.statLabel}>Total Tests</p>
          <p className={s.statValue}>{user.totalTests ?? "—"}</p>
          <span className={s.statBadge}>All time</span>
        </div>

        <div className={s.statCard}>
          <div className={s.statShimmer} />
          <p className={s.statLabel}>Average WPM</p>
          <p className={s.statValue}>{user.avgWpm ?? "—"}</p>
          <span className={s.statBadge}>Rolling avg</span>
        </div>

        <div className={s.statCard}>
          <div className={s.statShimmer} />
          <p className={s.statLabel}>Personal Best</p>
          <p className={`${s.statValue} ${s.statValueGold}`}>
            {user.bestWpm ?? "—"}
          </p>
          <span className={s.statBadge}>Peak WPM</span>
        </div>
      </div>

      <div className={s.historyPanel}>
        <div className={s.historyHeader}>
          <h2 className={s.historyTitle}>Recent history</h2>
          <span className={s.historyCount}>
            {user.history?.length ?? 0} tests
          </span>
        </div>

        {!user.history?.length ? (
          <p className={s.emptyText}>No typing history yet — go take a test!</p>
        ) : (
          <div className={s.historyList}>
            {user.history.slice(0, 5).map((test, index) => (
              <div key={index} className={s.historyRow}>
                <div className={s.historyIndex}>#{index + 1}</div>

                <div className={s.historyMeta}>
                  <span className={s.historyWpm}>{test.wpm}</span>
                  <span className={s.historyWpmLabel}>wpm</span>
                </div>

                <div className={s.historyAccWrap}>
                  <div
                    className={s.historyAccBar}
                    style={getAccuracyBarStyle(test.accuracy)}
                  />
                </div>

                <span className={s.historyAcc}>{test.accuracy}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
