import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const subjects = {
  HISTORY: [
    "The Harappan Civilization was discovered in 1921 by Dayaram Sahni.",
    "The Third Battle of Panipat took place in 1761 between Marathas and Abdali.",
    "Raja Ram Mohan Roy is known as the Father of Indian Renaissance.",
    "The Battle of Plassey in 1757 marked the beginning of British rule in India.",
    "The Indus Valley people developed the first system of uniform weights.",
    "Kalhana wrote Rajatarangini in Sanskrit during the 12th century.",
    "Ashoka the Great converted to Buddhism after the Kalinga War.",
    "The Quit India Movement was launched by Mahatma Gandhi in August 1942.",
    "The First War of Independence started at Meerut on May 10, 1857.",
    "The Indian National Congress was founded in December 1885.",
    "The Champaran Satyagraha was Gandhi's first satyagraha movement.",
    "Chandragupta Maurya founded the Mauryan Empire with Chanakya's help.",
    "The Simon Commission arrived in British India in 1928.",
    "Sher Shah Suri introduced the Rupiya currency during his reign.",
    "The Mughal Empire reached its peak under Akbar the Great.",
    "The Dandi March by Gandhi started from Sabarmati Ashram in 1930.",
    "Bhagat Singh was executed on March 23, 1931.",
    "The Permanent Settlement of Bengal was introduced by Lord Cornwallis.",
    "Aryabhatta was the famous mathematician of the Gupta period.",
    "The Vedas are the oldest literary record of the Indo-Aryan civilization.",
    "Lala Lajpat Rai is known as the Lion of Punjab or Sher-e-Punjab.",
    "The Rowlatt Act of 1919 authorized the government to imprison people.",
    "Annie Besant was the first woman President of the Indian National Congress.",
    "The Battle of Buxar was fought in 1764 between British and allied forces.",
    "The Subsidiary Alliance system was introduced by Lord Wellesley.",
  ],
  ACCOUNTS: [
    "The Golden Rule of Real Account: Debit what comes in, Credit what goes out.",
    "Goodwill is an intangible asset representing the reputation of a business.",
    "The Trial Balance ensures the arithmetical accuracy of ledger accounts.",
    "Double Entry System was first documented by Luca Pacioli in 1494.",
    "Assets equal Liabilities plus Capital is the fundamental accounting equation.",
    "Depreciation is the systematic reduction in the cost of a fixed asset.",
    "Inventory valuation can be done using FIFO or Weighted Average methods.",
    "A Balance Sheet shows the financial position at a point in time.",
    "Current Assets are those convertible into cash within one year.",
    "Capital expenditure provides long term benefits to the organization.",
    "Outstanding expenses are treated as a liability in the final accounts.",
    "Petty cash book is maintained for recording small routine payments.",
    "Bank Reconciliation Statement matches cash book and pass book.",
    "Drawings reduce the capital of the owner in a sole proprietorship.",
    "Prepaid insurance is shown on the assets side of the balance sheet.",
    "Journal is known as the book of original entry in accounting.",
    "A credit note is issued by the seller for sales return.",
    "Profit and Loss account shows the net results of operations.",
    "Bad debts are written off when a debtor is unable to pay.",
    "Accrual concept states income is recorded when it is earned.",
    "Nominal accounts deal with expenses, losses, incomes and gains.",
    "The going concern concept assumes the business will continue forever.",
    "Contingent liabilities are shown as a footnote in the balance sheet.",
    "The matching principle ensures expenses match the revenue earned.",
    "Narration is a brief explanation of the transaction in a journal entry.",
  ],
  GEOGRAPHY: [
    "The Ozone layer is found in the Stratosphere and protects from UV radiation.",
    "Wular Lake in Jammu and Kashmir is one of the largest freshwater lakes in Asia.",
    "The Nile is traditionally considered the longest river in the world.",
    "Mount Everest is the highest peak on Earth reaching 8848 meters.",
    "The Amazon is the world's largest rainforest and regulates oxygen cycles.",
    "The Indian Standard Time is calculated on the basis of 82.5 degrees East.",
    "The Tropic of Cancer passes through eight states in India.",
    "The Deccan Plateau is the largest plateau in the Indian subcontinent.",
    "The Sundarbans are the largest mangrove forests in the world.",
    "Black soil is also known as Regur soil and is ideal for cotton.",
    "The Nathu La pass connects Sikkim with Tibet.",
    "The Richter scale measures the intensity of earthquakes.",
    "Tides are caused by the gravitational pull of the moon and sun.",
    "The atmosphere consists of seventy eight percent nitrogen gas.",
    "Ladakh is known as a cold desert in northern India.",
    "The Palk Strait separates India from Sri Lanka.",
    "Kaziranga National Park is famous for the one horned rhinoceros.",
    "Solar radiation is the primary source of energy for Earth.",
    "The longitudinal extent of India is approximately thirty degrees.",
    "The Luni river is the only major river in the Thar Desert.",
    "Earth completes its revolution around the sun in three hundred sixty five days.",
    "The layer of the earth on which we live is called the crust.",
    "Magma that reaches the earth's surface is known as lava.",
    "The study of maps and map-making is called cartography.",
    "The largest ocean on the earth is the Pacific Ocean.",
  ],
  POLITICAL: [
    "The Indian Constitution is the longest written constitution in the world.",
    "Fundamental Rights are enshrined in Part III of the Constitution.",
    "The Preamble declares India as a Sovereign Socialist Secular Republic.",
    "Article 32 is known as the Heart and Soul of the Constitution.",
    "Universal Adult Franchise means all citizens above 18 can vote.",
    "The President is the supreme commander of the armed forces.",
    "The Rajya Sabha is the upper house and a permanent body.",
    "The Supreme Court of India was established on January 26, 1950.",
    "Directive Principles are borrowed from the Irish Constitution.",
    "The Panchayati Raj system was first adopted in Rajasthan.",
    "Right to Education became a fundamental right in 2002.",
    "The Governor of a state is appointed by the President.",
    "Article 370 was revoked from Jammu and Kashmir in August 2019.",
    "The Speaker of Lok Sabha presides over the joint sitting.",
    "Fundamental Duties were added by the 42nd Amendment Act.",
    "Sovereignty means the state has power to legislate on any subject.",
    "The Election Commission conducts elections for the Parliament.",
    "The Finance Commission is constituted every five years.",
    "A Money Bill can only be introduced in the Lok Sabha.",
    "The Prime Minister is the real executive head of the government.",
    "The Rajya Sabha can have a maximum strength of two hundred fifty members.",
    "The tenure of a member of Rajya Sabha is six years.",
    "Article 360 of the constitution deals with Financial Emergency.",
    "The first Lok Sabha was constituted in the year 1952.",
    "The concept of Judicial Review is borrowed from the United States.",
  ],
  SCIENCE: [
    "Mitochondria are often referred to as the powerhouse of the cell.",
    "Newton's Third Law: For every action, there is an equal opposite reaction.",
    "Light travels at a speed of approximately 300,000 kilometers per second.",
    "The chemical symbol for Gold is Au, derived from the Latin word Aurum.",
    "Photosynthesis converts light energy into chemical energy.",
    "The human body contains two hundred and six bones.",
    "Water has maximum density at four degrees Celsius.",
    "Diamond is the hardest naturally occurring substance.",
    "Solid changing directly into gas is called sublimation.",
    "Vitamin C is essential for the repair of body tissues.",
    "The PH value of pure water is seven which is neutral.",
    "Sodium is a highly reactive metal stored under kerosene.",
    "Sound cannot travel through a vacuum medium.",
    "The Earth completes one rotation every twenty four hours.",
    "Chlorophyll allows plants to capture sunlight energy.",
    "The study of heredity and variation is known as genetics.",
    "Penicillin was the first antibiotic discovered by Alexander Fleming.",
    "Ohm is the unit used to measure electrical resistance.",
    "Carbon dioxide is the main gas responsible for global warming.",
    "The smallest unit of an element is called an atom.",
    "Mercury is the only metal that remains liquid at room temperature.",
    "The human brain is the command center for the nervous system.",
    "Inertia is the tendency of an object to resist changes in motion.",
    "The boiling point of water is one hundred degrees Celsius.",
    "Red blood cells are responsible for carrying oxygen through the body.",
  ],
};

export default function App() {
  const [isWelcome, setIsWelcome] = useState(true);
  const [category, setCategory] = useState("HISTORY");
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [usedIndexes, setUsedIndexes] = useState([]);
  const inputRef = useRef(null);

  const setRandomFact = (cat) => {
    const data = subjects[cat];
    let available = data
      .map((_, i) => i)
      .filter((i) => !usedIndexes.includes(i));
    if (available.length === 0) {
      available = data.map((_, i) => i);
      setUsedIndexes([]);
    }
    const randomIndex = available[Math.floor(Math.random() * available.length)];
    setCurrentText(data[randomIndex]);
    setUsedIndexes((prev) => [...prev, randomIndex]);
  };

  useEffect(() => {
    setRandomFact(category);
  }, [category]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    const start = (e) => {
      if (isWelcome && e.key.length === 1) setIsWelcome(false);
    };
    window.addEventListener("keydown", start);
    return () => window.removeEventListener("keydown", start);
  }, [isWelcome]);

  useEffect(() => {
    if (!isWelcome && inputRef.current && !isFinished) inputRef.current.focus();
  }, [isWelcome, currentText, isFinished]);

  const handleInput = (e) => {
    if (isFinished) return;
    const val = e.target.value.replace(/[\n\r]/g, "");

    if (!isActive && val.length > 0) {
      setIsActive(true);
      setStartTime(Date.now());
    }

    if (val.length === currentText.length) {
      setUserInput("");
      setRandomFact(category);
      return;
    }

    setUserInput(val);
    if (startTime) {
      const mins = (Date.now() - startTime) / 60000;
      let err = 0;
      val.split("").forEach((c, i) => {
        if (c !== currentText[i]) err++;
      });
      setWpm(Math.round(val.length / 5 / mins) || 0);
      setAccuracy(Math.round(((val.length - err) / (val.length || 1)) * 100));
    }
  };

  const timerClass =
    timeLeft > 20
      ? "timer-green"
      : timeLeft > 10
      ? "timer-yellow"
      : "timer-red blink";

  if (isWelcome)
    return (
      <div className="splash-screen">
        <div className="welcome-card">
          <div className="terminal-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <h1 className="main-logo">⚡ TICKER-TYPING</h1>
          <p className="system-ready">SYSTEM STATUS: READY TO BOOT</p>
          <div className="start-trigger">
            <span className="blink-arrow">></span> Press any key to start
            practice
          </div>
        </div>
      </div>
    );

  return (
    <div className="app-main">
      {isActive && (
        <div
          className={`timer-bar ${timerClass}`}
          style={{ width: `${(timeLeft / 60) * 100}%` }}
        ></div>
      )}
      <header className="nav-bar">
        <div className="brand">⚡ TICKER-TYPING</div>
        <div className="tabs">
          {Object.keys(subjects).map((s) => (
            <button
              key={s}
              className={category === s ? "active" : ""}
              onClick={() => {
                setCategory(s);
                setTimeLeft(60);
                setIsFinished(false);
                setIsActive(false);
                setUserInput("");
                setWpm(0);
                setUsedIndexes([]);
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </header>
      <main className="typing-zone">
        <div className="stats-header">
          <div className={`stat-item ${timerClass}`}>
            TIME <span>{timeLeft}s</span>
          </div>
          <div className="stat-item">
            WPM <span>{wpm}</span>
          </div>
          <div className="stat-item">
            ACCURACY <span>{accuracy}%</span>
          </div>
        </div>
        {isFinished ? (
          <div className="result-card">
            <h2>FINISHED!</h2>
            <p>
              Speed: {wpm} WPM | Accuracy: {accuracy}%
            </p>
            <button
              className="restart-btn"
              onClick={() => {
                setTimeLeft(60);
                setIsFinished(false);
                setUserInput("");
                setWpm(0);
                setStartTime(null);
                setUsedIndexes([]);
                setRandomFact(category);
              }}
            >
              RESTART TERMINAL
            </button>
          </div>
        ) : (
          <div className="neon-card" onClick={() => inputRef.current.focus()}>
            <div className="text-display">
              {currentText.split("").map((c, i) => {
                let s =
                  i < userInput.length
                    ? userInput[i] === c
                      ? "correct"
                      : "wrong"
                    : i === userInput.length
                    ? "cursor"
                    : "";
                return (
                  <span key={i} className={s}>
                    {c}
                  </span>
                );
              })}
            </div>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>
        )}
      </main>
      <footer className="footer-credits">
        DEVELOPED BY MUNISH SHARMA • 2026
      </footer>
    </div>
  );
}
