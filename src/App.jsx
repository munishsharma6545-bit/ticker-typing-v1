import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const subjects = {
  HISTORY: [
    "First site of Harappan Civilization discovered in 1921 by Dayaram Sahni.",
    "Third Battle of Panipat (1761) saw the Marathas defeated by Ahmad Shah Abdali.",
    "Raja Ram Mohan Roy founded Brahmo Samaj and campaigned against Sati.",
    "Battles of Plassey and Buxar established British foundations in India.",
    "Chandragupta Maurya defeated the Nandas and Chanakya wrote Arthashastra.",
    "The 1857 Revolt started in Meerut on May 10 as the First War of Independence.",
    "Dandi March in 1930 broke the Salt Law and started Civil Disobedience.",
    "Indian National Congress was founded by A.O. Hume in 1885.",
    "Permanent Settlement was introduced by Cornwallis and Ryotwari by Munro.",
    "Bhagat Singh, Rajguru, and Sukhdev were executed on March 23, 1931.",
    "The Swaraj Party was formed in 1923 by C.R. Das and Motilal Nehru.",
    "Subhash Chandra Bose took leadership of the INA in Singapore in 1943.",
  ],
  GEOGRAPHY: [
    "Troposphere contains 99 percent water vapor and Stratosphere has Ozone.",
    "Mt. Everest is the highest Himalayan peak and K2 is highest in India.",
    "Indian Standard Time is five and a half hours ahead of Greenwich Mean Time.",
    "Regur soil is volcanic and best for cotton while Alluvial is most fertile.",
    "Brahmaputra is known as Tsangpo in Tibet and forms the largest delta.",
    "Nathu La and Shipki La are vital trade links between India and China.",
    "Palk Strait separates India and Sri Lanka and 10 Degree Channel separates Andaman.",
  ],
  ACCOUNTS: [
    "Real Accounts rule: debit what comes in and credit what goes out.",
    "Nominal Accounts rule: debit all expenses and credit all incomes.",
    "Double Entry system was documented by Luca Pacioli for every transaction.",
    "Depreciation is the systematic allocation of the cost of fixed assets.",
    "Accrual Concept recognizes revenue and costs as they are earned.",
    "Goodwill is an intangible asset valued during business sale or partnership.",
    "Capital Expenditure increases earning capacity while revenue maintains it.",
  ],
  POLITICAL: [
    "Preamble is based on Objectives Resolution and amended only once.",
    "Article 17 abolishes Untouchability and Article 21 guarantees Right to Life.",
    "Article 32 and Article 226 empower the judiciary to issue writs.",
    "The 61st Amendment lowered the voting age from twenty one to eighteen years.",
    "Fundamental Duties were added on recommendation of Swaran Singh Committee.",
  ],
  SCIENCE: [
    "Mitochondria produce energy and Ribosomes are sites of protein synthesis.",
    "Newton laws include the law of inertia and the law of action and reaction.",
    "Refraction causes stars to twinkle and total internal reflection is in fibers.",
    "DNA carries genetic information and its structure is a double helix.",
    "Nuclear Fusion is the source of Sun energy while fission is in plants.",
  ],
};

const rawHomeRowLines = [
  "asdf jkl; ASDF JKL;",
  "fghj fghj FGHJ FGHJ",
  "aj sk dl f; AJ SK DL F;",
  "Aj Sk Dl f: aJ sK dL f;",
  "Glass Flasks Salad Glass",
  "Flask Has Lag Ad Add Dash",
  "Hall Glad Flash Slash Fall",
];
const rawTopRowLines = [
  "qwert yuiop QWERT YUIOP",
  "qWeR tPoI QwEr TpOi",
  "QWer tpOI QR UP",
  "qetuo qetuo QETUO QETUO",
  "Type Writer Type Writer Tire Wire Prior",
  "Power Quiet Route Power Quiet Type",
  "Up To It Or We You Out Toe",
  "Top Toy Pot Tree Write Tower Route",
  "Proprieter Priorty Prettier Typewriter",
  "Territory True Wipe Prior Equip Wet",
];
const rawBottomRowLines = [
  "zxcv m,./ ZXCV M,./",
  ".,mnb vcxz .,MNB VCXZ",
  "zZ xX Cc Vv Bb Nn Mm ,< >.",
  "zxcvb nm,./ ZXCVB NM,./",
  "vbnm vbnm VBNM VBNM",
  "Zzzzzz Bnb CVV Mmmm",
  "x v z m n b x v z m n b",
  "m n b v c x z m n b v c x z",
];

const beginnerLessons = {
  "HOME ROW": rawHomeRowLines.flatMap((line) => [line, line]),
  "TOP ROW": rawTopRowLines.flatMap((line) => [line, line]),
  "BOTTOM ROW": rawBottomRowLines.flatMap((line) => [line, line]),
  "ALL ROWS": [
    "The Quick Brown Fox Jumps Over The Lazy Dog",
    "The Quick Brown Fox Jumps Over The Lazy Dog",
    "Typing Speed Is Key To Success In Exams",
    "Typing Speed Is Key To Success In Exams",
    "Practice Home Top And Bottom Rows Daily",
    "Practice Home Top And Bottom Rows Daily",
  ],
};

const typeSound = new Audio("https://www.fesliyanstudios.com/play-mp3/6");

export default function App() {
  const [isWelcome, setIsWelcome] = useState(true);
  const [mode, setMode] = useState("PRO");
  const [category, setCategory] = useState("HISTORY");
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [currentLessonSet, setCurrentLessonSet] = useState([]);
  const inputRef = useRef(null);

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const setNextText = (cat, currentMode) => {
    if (currentMode === "PRO") {
      const data = subjects[cat];
      setCurrentText(data[Math.floor(Math.random() * data.length)]);
    } else if (currentMode === "BEGINNER") {
      let data =
        currentLessonSet.length > 0 ? currentLessonSet : beginnerLessons[cat];

      if (lessonIndex >= data.length) {
        // Shuffle after one full cycle
        const newlyShuffled = shuffleArray(beginnerLessons[cat]);
        setCurrentLessonSet(newlyShuffled);
        setCurrentText(newlyShuffled[0]);
        setLessonIndex(1);
      } else {
        setCurrentText(data[lessonIndex]);
        setLessonIndex((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (!isWelcome && !isFinished && mode !== "GAME") {
      const initialData =
        mode === "PRO" ? subjects[category] : beginnerLessons[category];
      setCurrentText(initialData[0]);
      setCurrentLessonSet(initialData);
      setLessonIndex(1);
    }
  }, [category, mode, isWelcome, isFinished]);

  useEffect(() => {
    if (currentText && inputRef.current && !isFinished)
      inputRef.current.focus();
  }, [currentText, isFinished]);

  useEffect(() => {
    let timer;
    if (mode === "PRO" && isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, mode, timeLeft]);

  const handleInput = (e) => {
    if (isFinished || mode === "GAME" || !currentText) return;
    const val = e.target.value;
    if (!isActive && val.length === 1) {
      setIsActive(true);
      setStartTime(Date.now());
    }
    if (mode === "BEGINNER" && val.length > userInput.length) {
      typeSound.currentTime = 0;
      typeSound.play();
    }

    if (val.length > userInput.length) {
      setTotalCharsTyped((p) => p + 1);
      if (val[val.length - 1] === currentText[val.length - 1])
        setStreak((p) => p + 1);
      else {
        setTotalErrors((p) => p + 1);
        setStreak(0);
      }
    }

    if (val.length === currentText.length) {
      setUserInput("");
      setNextText(category, mode);
    } else setUserInput(val);

    if (startTime) {
      const elapsed = (Date.now() - startTime) / 60000;
      setWpm(elapsed > 0 ? Math.round(totalCharsTyped / 5 / elapsed) : 0);
      setAccuracy(
        totalCharsTyped > 0
          ? Math.round(
              ((totalCharsTyped - totalErrors) / totalCharsTyped) * 100
            )
          : 100
      );
    }
  };

  const resetGame = (m, c) => {
    setMode(m);
    setCategory(c);
    setIsWelcome(false);
    setIsFinished(false);
    setIsActive(false);
    setTimeLeft(120);
    setUserInput("");
    setWpm(0);
    setAccuracy(100);
    setTotalCharsTyped(0);
    setTotalErrors(0);
    setStartTime(null);
    setStreak(0);
    setLessonIndex(0);
    setCurrentText("");
    setCurrentLessonSet([]);
  };

  const themeClass =
    mode === "GAME"
      ? "theme-purple"
      : mode === "BEGINNER"
      ? "theme-yellow"
      : "theme-green";

  if (isWelcome)
    return (
      <div className="splash-screen">
        <div className="welcome-card">
          <div className="brand-hd welcome-hd-fix">
            <span className="nav-bolt-hd">⚡</span>
            <span className="logo-text-plain">TICKER - TYPING</span>
          </div>
          <div className="welcome-mode-select">
            <button
              className="theme-btn btn-yellow"
              onClick={() => resetGame("BEGINNER", "HOME ROW")}
            >
              BEGINNER
            </button>
            <button
              className="theme-btn btn-green"
              onClick={() => resetGame("PRO", "HISTORY")}
            >
              PRO MODE
            </button>
            <button
              className="theme-btn btn-purple"
              onClick={() => resetGame("GAME", "GAME")}
            >
              GAME
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className={`app-main ${themeClass}`}>
      <header className="nav-bar">
        <div
          className="brand-hd"
          onClick={() => setIsWelcome(true)}
          style={{ cursor: "pointer" }}
        >
          <span className="nav-bolt-hd">⚡</span>
          <span className="logo-text-plain">TICKER - TYPING</span>
        </div>
        <div className="mode-toggle">
          <button
            className={mode === "BEGINNER" ? "active-mode mode-yellow" : ""}
            onClick={() => resetGame("BEGINNER", "HOME ROW")}
          >
            BEGINNER
          </button>
          <button
            className={mode === "PRO" ? "active-mode mode-green" : ""}
            onClick={() => resetGame("PRO", "HISTORY")}
          >
            PRO
          </button>
          <button
            className={mode === "GAME" ? "active-mode mode-purple" : ""}
            onClick={() => resetGame("GAME", "GAME")}
          >
            GAME
          </button>
        </div>
      </header>
      <main className="typing-zone">
        {isFinished && (
          <div className="result-pop-out">
            <div className="glass-overlay"></div>
            <div className="result-card-modal">
              <h2>TYPING REPORT</h2>
              <div className="result-divider"></div>
              <div className="result-main-stats">
                <div className="res-stat-circle">
                  WPM <span>{wpm}</span>
                </div>
                <div className="res-stat-circle">
                  ACC <span>{accuracy}%</span>
                </div>
              </div>
              <button
                className="theme-btn restart-btn"
                onClick={() => resetGame(mode, category)}
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        )}
        {mode !== "GAME" ? (
          <>
            <div className="stats-header">
              {mode === "PRO" && (
                <div className="stat-item">
                  TIME <span>{timeLeft}s</span>
                </div>
              )}
              <div className="stat-item">
                WPM <span>{wpm}</span>
              </div>
              {mode !== "PRO" && (
                <div className="stat-item">
                  STREAK <span className="streak-val">{streak}</span>
                </div>
              )}
              <div className="stat-item">
                ACCURACY <span>{accuracy}%</span>
              </div>
            </div>
            <div className="neon-card">
              <div className="text-display center-text">
                {currentText.split("").map((c, i) => (
                  <span
                    key={i}
                    className={
                      i < userInput.length
                        ? userInput[i] === c
                          ? "correct"
                          : "wrong"
                        : i === userInput.length
                        ? "cursor"
                        : "faded"
                    }
                  >
                    {c}
                  </span>
                ))}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInput}
                autoComplete="off"
                className="hidden-input"
              />
            </div>
            <div className="bottom-subject-bar">
              {Object.keys(mode === "PRO" ? subjects : beginnerLessons).map(
                (s) => (
                  <button
                    key={s}
                    className={category === s ? "active-subject" : ""}
                    onClick={() => resetGame(mode, s)}
                  >
                    {s}
                  </button>
                )
              )}
            </div>
          </>
        ) : (
          <div className="game-coming-soon">
            <h2 className="coming-soon-text">GAME MODE</h2>
            <p className="coming-soon-sub">COMING SOON - STAY TUNED</p>
          </div>
        )}
      </main>
      <footer className="footer-credits">
        Developed by MUNISH SHARMA (2026)
      </footer>
    </div>
  );
}
