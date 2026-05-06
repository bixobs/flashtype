import { useState, useEffect, useRef } from "react";
import { WORDS } from "../Data/words";
import WordDisplay from "../assets/components/WordDisplay";
import TypingBox from "../assets/components/TypingBox";
import s from "./TypingTest.module.css";

function TypingTest() {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState("");
  const [duration, setDuration] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [wrongChars, setWrongChars] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [bestWPM, setBestWPM] = useState(
    Number(localStorage.getItem("bestWPM")) || 0
  );

  const correctCharsRef = useRef(0);
  const hasFinished = useRef(false);

  useEffect(() => {
    generateWords();
  }, []);

  const sendResult = async (wpm, accuracy) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ wpm, accuracy }),
      });
      const data = await res.json();
      console.log("Results saved:", data);
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };

  function generateWords() {
    const newWords = [];
    for (let i = 0; i < 80; i++) {
      newWords.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
    }
    setWords(newWords);
  }

  function resetGame(newDuration) {
    const d = newDuration ?? duration;
    setInput("");
    setTimeLeft(d);
    setIsRunning(false);
    setIsFinished(false);
    setStartTime(null);
    setCorrectChars(0);
    setWrongChars(0);
    correctCharsRef.current = 0;
    generateWords();
  }

  useEffect(() => {
    if (!isRunning) return;
    hasFinished.current = false;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft !== 0) return;
    if (isFinished || hasFinished.current) return;

    hasFinished.current = true;
    setIsFinished(true);
    setIsRunning(false);

    const finalWPM = Math.round(correctCharsRef.current / 5 / (duration / 60));
    const totalTyped = correctCharsRef.current + wrongChars;
    const finalAccuracy = totalTyped > 0
      ? Math.round((correctCharsRef.current / totalTyped) * 100)
      : 100;

    sendResult(finalWPM, finalAccuracy);

    if (finalWPM > bestWPM) {
      localStorage.setItem("bestWPM", finalWPM);
      setBestWPM(finalWPM);
    }
  }, [timeLeft]);   

    function handleInputChange(value) {
      if (isFinished) return;
      if (!isRunning) {
        setIsRunning(true);
        setStartTime(Date.now());
      }
      setInput(value);
      const allChars = words.join(" ").split("");
      let correct = 0;
      let wrong = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] === allChars[i]) correct++;
        else wrong++;
      }
      setCorrectChars(correct);
      setWrongChars(wrong);
      correctCharsRef.current = correct;
    }

  const wpm = startTime
    ? Math.round(correctChars / 5 / ((Date.now() - startTime) / 60000))
    : 0;

  const totalTyped = correctChars + wrongChars;
  const accuracy =
    totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;
    
  if (isFinished) {
    const totalChars = input.length;
    const wrongCharsCount = totalChars - correctChars;
    const isNewBest = wpm >= bestWPM;

    return (
      <div className={s.page}>
        <div className={s.glowTR} />
        <div className={s.glowBL} />

        <div className={s.topBar}>
          <div className={s.logo}>
            <div className={s.logoIcon}>⌨️</div>
            TypeMaster
          </div>
        </div>

        <div className={s.resultsWrap}>
          {isNewBest && (
            <div className={s.newBestBanner}>✦ New personal best!</div>
          )}

          <h2 className={s.resultsHeading}>Test complete</h2>
          <p className={s.resultsSub}>Here's how you did</p>

          <div className={s.resultsGrid}>
            <div className={`${s.resultCard} ${s.resultCardLarge}`}>
              <span className={s.resultLabel}>WPM</span>
              <span className={`${s.resultValue} ${s.resultValueLarge} ${s.resultValueGold}`}>
                {wpm}
              </span>
            </div>

            <div className={`${s.resultCard} ${s.resultCardLarge}`}>
              <span className={s.resultLabel}>Accuracy</span>
              <span className={`${s.resultValue} ${s.resultValueLarge}`}>
                {accuracy}%
              </span>
            </div>

            <div className={s.resultCard}>
              <span className={s.resultLabel}>Correct</span>
              <span className={`${s.resultValue} ${s.resultValueGreen}`}>
                {correctChars}
              </span>
            </div>

            <div className={s.resultCard}>
              <span className={s.resultLabel}>Incorrect</span>
              <span className={`${s.resultValue} ${s.resultValueRed}`}>
                {wrongCharsCount}
              </span>
            </div>

            <div className={s.resultCard}>
              <span className={s.resultLabel}>Best WPM</span>
              <span className={s.resultValue}>{bestWPM}</span>
            </div>
          </div>

          <div className={s.resultsActions}>
            <button className={s.btnPrimary} onClick={() => resetGame()}>
              Try Again →
            </button>
          </div>
        </div>
      </div>
    );
  }


  const timerClass = timeLeft <= 5
    ? `${s.liveStatValue} ${s.liveStatValueRed}`
    : `${s.liveStatValue} ${s.liveStatValueGold}`;

  return (
    <div className={s.page}>
      <div className={s.glowTR} />
      <div className={s.glowBL} />

      <div className={s.topBar}>
        <div className={s.logo}>
          <div className={s.logoIcon}>⌨️</div>
          TypeMaster
        </div>

        <div className={s.topBarRight}>
          <div className={s.durationPills}>
            {[15, 30, 60].map((t) => (
              <button
                key={t}
                className={duration === t ? s.pillActive : s.pill}
                onClick={() => {
                  setDuration(t);
                  resetGame(t);
                }}
              >
                {t}s
              </button>
            ))}
          </div>

          <button className={s.btnGhost} onClick={() => resetGame()}>
            Restart
          </button>
        </div>
      </div>

      <div className={s.liveStats}>
        <div className={s.liveStat}>
          <span className={s.liveStatLabel}>Time</span>
          <span className={timerClass}>{timeLeft}s</span>
        </div>
        <div className={s.liveStatDivider} />
        <div className={s.liveStat}>
          <span className={s.liveStatLabel}>WPM</span>
          <span className={s.liveStatValue}>{isRunning ? wpm : "—"}</span>
        </div>
        <div className={s.liveStatDivider} />
        <div className={s.liveStat}>
          <span className={s.liveStatLabel}>Accuracy</span>
          <span className={s.liveStatValue}>
            {isRunning ? `${accuracy}%` : "—"}
          </span>
        </div>
        <div className={s.liveStatDivider} />
        <div className={s.liveStat}>
          <span className={s.liveStatLabel}>Best</span>
          <span className={s.liveStatValue}>{bestWPM} wpm</span>
        </div>
      </div>

      <div className={s.typingArea}>
        <WordDisplay words={words} input={input} />
        <TypingBox
          input={input}
          onChange={handleInputChange}
          disabled={isFinished}
        />
      </div>

      {!isRunning && <p className={s.hint}>Start typing to begin the test</p>}
    </div>
  );
}

export default TypingTest;
