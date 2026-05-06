function Stats({ timeLeft, wpm, accuracy }) {
  return (
    <div style={{ display: "flex", gap: "2rem", fontSize: "1.2rem", margin: "1rem 0" }}>
      <span>Time: {timeLeft}</span>
      <span>WPM: {wpm}</span>
      <span>Accuracy: {accuracy}%</span>
    </div>
  );
}

export default Stats;