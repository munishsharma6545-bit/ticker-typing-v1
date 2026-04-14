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
    "The Indus Valley port city of Lothal features an artificial dockyard.",
    "Harsha-Vardhana was defeated by Pulakeshin II on the banks of Narmada.",
    "The Iqta System for military officers was introduced by Iltutmish.",
    "Din-i-Ilahi was a syncretic religion propounded by Akbar in 1582.",
    "Swaraj Party was formed in 1923 by C.R. Das and Motilal Nehru.",
    "Annie Besant and Tilak launched the Home Rule League Movement in 1916.",
    "Poona Pact (1932) was signed between Gandhi and Ambedkar.",
    "Fa-Hien visited during Chandragupta II and Hiuen Tsang during Harsha.",
    "Cabinet Mission (1946) discussed the transfer of power and framework.",
    "Subhash Chandra Bose took leadership of the INA in Singapore in 1943."
  ],
  GEOGRAPHY: [
    "Troposphere contains 99 percent water vapor and Stratosphere has Ozone.",
    "Mt. Everest is the highest Himalayan peak and K2 is highest in India.",
    "Indian Standard Time is five and a half hours ahead of Greenwich Mean Time.",
    "Regur soil is volcanic and best for cotton while Alluvial is most fertile.",
    "Brahmaputra is known as Tsangpo in Tibet and forms the largest delta.",
    "Nathu La and Shipki La are vital trade links between India and China.",
    "Palk Strait separates India and Sri Lanka and 10 Degree Channel separates Andaman.",
    "Tropical Evergreen forests in Western Ghats require high annual rainfall.",
    "Venus is the hottest planet and Jupiter has the shortest day-night cycle.",
    "Chota Nagpur Plateau is known as the Ruhr of India for mineral deposits.",
    "The Western Ghats are a UNESCO World Heritage site and biodiversity hotspot.",
    "El Nino describes unusual warming of surface waters in the eastern Pacific.",
    "The Tropic of Cancer passes through eight Indian states including Gujarat.",
    "Majuli in the Brahmaputra is the largest inhabited riverine island.",
    "Standard Deviation of rainfall is highest in Rajasthan causing droughts.",
    "The Equinox occurs twice a year when day and night are of equal duration.",
    "Jet Streams are high-altitude winds that influence the Indian Monsoon.",
    "Red Soil gets its color from iron oxide and is porous and friable.",
    "The Great Barrier Reef off Australia is the world largest coral reef system.",
    "Bhangar is old alluvial soil while Khadar is new flood-plain alluvium."
  ],
  ACCOUNTS: [
    "Real Accounts rule: debit what comes in and credit what goes out.",
    "Nominal Accounts rule: debit all expenses and credit all incomes.",
    "Double Entry system was documented by Luca Pacioli for every transaction.",
    "Depreciation is the systematic allocation of the cost of fixed assets.",
    "Accrual Concept recognizes revenue and costs as they are earned.",
    "Goodwill is an intangible asset valued during business sale or partnership.",
    "Bank Reconciliation identifies differences between Cash Book and Pass Book.",
    "Going Concern assumes that the enterprise will function for an indefinite period.",
    "Accounting standards value inventory at cost or net realizable value.",
    "Capital Expenditure increases earning capacity while revenue maintains it.",
    "Contingent Liabilities are potential obligations shown in footnotes.",
    "Consistency Principle states that accounting practices remain unchanged.",
    "Prudence principle suggests anticipating no profit but providing for losses.",
    "Tally software automates ledger posting and trial balance generation.",
    "Error of Principle occurs when capital transaction is recorded as revenue.",
    "Fictitious Assets have no realizable value but are shown on Balance Sheet.",
    "Drawings represent cash or goods taken by the owner for personal use.",
    "Journal Proper is used for transactions not in specialized subsidiary books."
  ],
  POLITICAL: [
    "Preamble is based on Objectives Resolution and amended only once.",
    "Article 17 abolishes Untouchability and Article 21 guarantees Right to Life.",
    "Article 32 and Article 226 empower the judiciary to issue writs.",
    "President is the nominal head while Prime Minister is the real executive.",
    "Rajya Sabha is the Upper House with a maximum of two hundred fifty members.",
    "The 44th Amendment removed Right to Property from Fundamental Rights.",
    "Constitutional status was given to Panchayats and Municipalities in 1992.",
    "Constitution provides for National, State, and Financial emergency.",
    "NITI Aayog replaced the Planning Commission to serve as a policy think tank.",
    "The 61st Amendment lowered the voting age from twenty one to eighteen years.",
    "Fundamental Duties were added on recommendation of Swaran Singh Committee.",
    "Joint Sitting is called by President but presided over by the Speaker.",
    "Directive Principles are non-justiciable but fundamental in governance.",
    "Comptroller and Auditor General is the Guardian of the Public Purse.",
    "Anti-Defection Law was added to the Constitution via Tenth Schedule.",
    "Governor holds office during the pleasure of the President for five years.",
    "Judicial Review allows Supreme Court to examine legislative acts.",
    "Attorney General is the highest law officer and can participate in Parliament.",
    "Pocket Veto allows President to keep a bill pending indefinitely.",
    "Sixth Schedule provides for administration of tribal areas in North East."
  ],
  SCIENCE: [
    "Mitochondria produce energy and Ribosomes are sites of protein synthesis.",
    "Newton laws include the law of inertia and the law of action and reaction.",
    "Refraction causes stars to twinkle and total internal reflection is in fibers.",
    "Mercury is liquid at room temperature while Sodium is soft enough to cut.",
    "Small Intestine is where digestion occurs and Liver is the largest gland.",
    "Vitamins deficiencies lead to night blindness, scurvy, or rickets.",
    "Sound waves are longitudinal waves that cannot travel in a vacuum.",
    "Myopia is corrected by Concave lenses and Hypermetropia by Convex.",
    "Global warming is caused by greenhouse gases like carbon dioxide.",
    "Enzymes are biological catalysts that break down starch and proteins.",
    "Archimedes Principle explains buoyancy and why objects float or sink.",
    "Xylem transports water and minerals while Phloem transports food.",
    "The pH Scale ranges from zero to fourteen where seven is neutral.",
    "DNA carries genetic information and its structure is a double helix.",
    "Galvanization is the process of applying a Zinc coating to prevent rusting.",
    "Doppler Effect is the change in frequency in relation to moving observer.",
    "Endocrine Glands secrete hormones directly into the bloodstream.",
    "Nuclear Fusion is the source of Sun energy while fission is in plants."
  ]
};

const beginnerLessons = {
  "HOME ROW": [
    "asdf jkl; ASDF JKL;", 
    "fghj fghj FGHJ FGHJ", 
    "asdf gh jkl; ASDF GH JKL;", 
    "aj sk dl f; AJ SK DL F;", 
    "fads glass flasks SALAD GLASS"
  ],
  "TOP ROW": [
    "qwer tpoi QWER TPOI", 
    "qwert yuiop QWERT YUIOP", 
    "qetuo qetuo QETUO QETUO", 
    "type writer TYPE WRITER", 
    "power quiet route POWER QUIET"
  ],
  "BOTTOM ROW": [
    "zxcv m,./ ZXCV M,./", 
    "zxcvb nm,./ ZXCVB NM,./", 
    "vbnm vbnm VBNM VBNM", 
    "zone civic music ZONE CIVIC", 
    "boxer vapor zebra BOXER VAPOR"
  ],
  "ALL ROWS": [
    "The Quick Brown Fox Jumps Over The Lazy Dog",
    "The Quick Brown Fox Jumps Over The Lazy Dog",
    "Typing Speed Is Key To Success In Exams",
    "Typing Speed Is Key To Success In Exams",
    "Practice Home Top And Bottom Rows Daily",
    "Practice Home Top And Bottom Rows Daily",
    "Keep Your Shoulders Relaxed And Back Straight",
    "Keep Your Shoulders Relaxed And Back Straight",
    "Consistency Beats Intensity In Typing Practice",
    "Consistency Beats Intensity In Typing Practice",
    "Mastering The Keyboard Takes Time And Effort",
    "Mastering The Keyboard Takes Time And Effort",
    "Use All Ten Fingers To Type Efficiently",
    "Use All Ten Fingers To Type Efficiently",
    "Watch The Screen Not The Keyboard While Typing",
    "Watch The Screen Not The Keyboard While Typing"
  ]
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
  const inputRef = useRef(null);

  const setRandomText = (cat, currentMode) => {
    const data = currentMode === "PRO" ? subjects[cat] : beginnerLessons[cat];
    if (data) {
      if (currentMode === "BEGINNER" && cat === "ALL ROWS" && totalCharsTyped === 0) {
        setCurrentText(data[0]);
      } else {
        const randomIndex = Math.floor(Math.random() * data.length);
        setCurrentText(data[randomIndex]);
      }
    }
  };

  useEffect(() => {
    if (!isWelcome && !isFinished) {
      setRandomText(category, mode);
    }
  }, [category, mode, isWelcome, isFinished]);

  useEffect(() => {
    if (currentText && inputRef.current && !isFinished) {
      inputRef.current.focus();
    }
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
      if (val[val.length - 1] === currentText[val.length - 1]) {
        setStreak((p) => p + 1);
      } else {
        setTotalErrors((p) => p + 1);
        setStreak(0);
      }
    }

    if (val.length === currentText.length) {
      setUserInput("");
      setRandomText(category, mode);
    } else {
      setUserInput(val);
    }

    if (startTime) {
      const elapsed = (Date.now() - startTime) / 60000;
      const curWpm = elapsed > 0 ? Math.round(totalCharsTyped / 5 / elapsed) : 0;
      const curAcc = totalCharsTyped > 0 ? Math.round(((totalCharsTyped - totalErrors) / totalCharsTyped) * 100) : 100;
      setWpm(curWpm);
      setAccuracy(curAcc);
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
  };

  const themeClass = mode === "GAME" ? "theme-purple" : mode === "BEGINNER" ? "theme-yellow" : "theme-green";

  if (isWelcome) {
    return (
      <div className="splash-screen">
        <div className="welcome-card">
          <div className="brand-hd welcome-hd-fix">
            <span className="nav-bolt-hd">⚡</span>
            <span className="logo-text-plain">TICKER - TYPING</span>
          </div>
          <div className="welcome-mode-select">
            <button className="theme-btn btn-yellow" onClick={() => resetGame("BEGINNER", "HOME ROW")}>BEGINNER</button>
            <button className="theme-btn btn-green" onClick={() => resetGame("PRO", "HISTORY")}>PRO MODE</button>
            <button className="theme-btn btn-purple" onClick={() => resetGame("GAME", "GAME")}>GAME</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`app-main ${themeClass}`}>
      <header className="nav-bar">
        <div className="brand-hd" onClick={() => setIsWelcome(true)} style={{ cursor: "pointer" }}>
          <span className="nav-bolt-hd">⚡</span>
          <span className="logo-text-plain">TICKER - TYPING</span>
        </div>
        <div className="mode-toggle">
          <button className={mode === "BEGINNER" ? "active-mode mode-yellow" : ""} onClick={() => resetGame("BEGINNER", "HOME ROW")}>BEGINNER</button>
          <button className={mode === "PRO" ? "active-mode mode-green" : ""} onClick={() => resetGame("PRO", "HISTORY")}>PRO</button>
          <button className={mode === "GAME" ? "active-mode mode-purple" : ""} onClick={() => resetGame("GAME", "GAME")}>GAME</button>
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
                <div className="res-stat-circle">WPM <span>{wpm}</span></div>
                <div className="res-stat-circle">ACC <span>{accuracy}%</span></div>
              </div>
              <button className="theme-btn restart-btn" onClick={() => resetGame(mode, category)}>TRY AGAIN</button>
            </div>
          </div>
        )}

        {mode !== "GAME" ? (
          <>
            <div className="stats-header">
              {mode === "PRO" && <div className="stat-item">TIME <span>{timeLeft}s</span></div>}
              <div className="stat-item">WPM <span>{wpm}</span></div>
              {mode !== "PRO" && <div className="stat-item">STREAK <span className="streak-val">{streak}</span></div>}
              <div className="stat-item">ACCURACY <span>{accuracy}%</span></div>
            </div>
            <div className="neon-card">
              <div className="text-display center-text">
                {currentText.split("").map((c, i) => (
                  <span key={i} className={i < userInput.length ? (userInput[i] === c ? "correct" : "wrong") : i === userInput.length ? "cursor" : "faded"}>{c}</span>
                ))}
              </div>
              <input ref={inputRef} type="text" value={userInput} onChange={handleInput} autoComplete="off" className="hidden-input" />
            </div>
            <div className="bottom-subject-bar">
              {Object.keys(mode === "PRO" ? subjects : beginnerLessons).map((s) => (
                <button key={s} className={category === s ? "active-subject" : ""} onClick={() => resetGame(mode, s)}>{s}</button>
              ))}
            </div>
          </>
        ) : (
          <div className="game-coming-soon">
            <h2 className="coming-soon-text">GAME MODE</h2>
            <p className="coming-soon-sub">COMING SOON - STAY TUNED</p>
          </div>
        )}
      </main>
      <footer className="footer-credits">Developed by MUNISH SHARMA (2026)</footer>
    </div>
  );
}
