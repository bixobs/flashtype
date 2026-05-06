import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import s from "./Leaderboard.module.css";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/leaderboard")
      .then((res) => setLeaders(res.data))
      .catch((err) => {
        console.log(err);
        alert("Failed to load leaderboard");
      });
  }, []);

  const medals = ["🥇", "🥈", "🥉"];

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

      <div className={s.heading}>
        <p className={s.eyebrow}>Global rankings</p>
        <h1 className={s.title}>Leaderboard</h1>
        <p className={s.sub}>The fastest fingers in the world</p>
      </div>

      {leaders.length >= 3 && (
        <div className={s.podium}>
          {[1, 0, 2].map((i) => (
            <div
              key={i}
              className={`${s.podiumCard} ${i === 0 ? s.podiumCardFirst : ""}`}
            >
              {i === 0 && <div className={s.podiumShimmer} />}

              <div className={s.podiumMedal}>{medals[i]}</div>

              <div
                className={`${s.podiumAvatar} ${
                  i === 0 ? s.podiumAvatarFirst : ""
                }`}
              >
                {leaders[i].user?.username?.charAt(0).toUpperCase() ?? "?"}
              </div>

              <p className={s.podiumName}>
                {leaders[i].user?.username ?? "Unknown"}
              </p>

              <p className={`${s.podiumWpm} ${i === 0 ? s.podiumWpmGold : ""}`}>
                {leaders[i].bestWpm}
              </p>

              <p className={s.podiumWpmLabel}>wpm</p>
            </div>
          ))}
        </div>
      )}

      <div className={s.listPanel}>
        <div className={s.listHeader}>
          <span className={s.listHeaderCell}>Rank</span>
          <span className={`${s.listHeaderCell} ${s.listHeaderCellFlex}`}>
            Player
          </span>
          <span className={s.listHeaderCell}>Best WPM</span>
        </div>

        {leaders.length === 0 ? (
          <p className={s.emptyText}>No scores yet — be the first!</p>
        ) : (
          leaders.map((player, index) => (
            <div
              key={index}
              className={`${s.listRow} ${index === 0 ? s.listRowFirst : ""}`}
            >
              <span className={s.rank}>
                {index < 3 ? medals[index] : `#${index + 1}`}
              </span>

              <div className={s.playerCell}>
                <div
                  className={`${s.rowAvatar} ${
                    index === 0 ? s.rowAvatarFirst : ""
                  }`}
                >
                  {player.user?.username?.charAt(0).toUpperCase() ?? "?"}
                </div>
                <span className={s.playerName}>
                  {player.user?.username ?? "Unknown"}
                </span>
              </div>

              <div className={s.wpmCell}>
                <span
                  className={`${s.wpmValue} ${
                    index === 0 ? s.wpmValueGold : ""
                  }`}
                >
                  {player.bestWpm}
                </span>
                <span className={s.wpmLabel}>wpm</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
