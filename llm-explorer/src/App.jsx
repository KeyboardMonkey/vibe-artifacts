import { useState, useEffect, useRef, useCallback } from "react";

const CHAPTERS = [
  { id: "intro", title: "What is an LLM?", icon: "🧠" },
  { id: "tokens", title: "Tokens", icon: "🧩" },
  { id: "embeddings", title: "Embeddings", icon: "📐" },
  { id: "attention", title: "Attention", icon: "👁" },
  { id: "generation", title: "Text Generation", icon: "✍️" },
  { id: "training", title: "Training", icon: "🏋️" },
  { id: "wrapup", title: "Putting It Together", icon: "🎯" },
];

const palette = {
  bg: "#0a0e17",
  surface: "#121826",
  surfaceAlt: "#1a2235",
  border: "#2a3550",
  text: "#e2e8f0",
  muted: "#8892a8",
  accent: "#38bdf8",
  accentDim: "#1e3a5f",
  green: "#4ade80",
  orange: "#fb923c",
  pink: "#f472b6",
  purple: "#a78bfa",
  yellow: "#fbbf24",
};

function IntroChapter() {
  const [revealed, setRevealed] = useState(0);
  const lines = [
    { text: "LLM stands for Large Language Model.", color: palette.accent },
    { text: 'It\'s a program that has "read" enormous amounts of text from the internet.', color: palette.text },
    { text: "From all that reading, it learned patterns in language.", color: palette.text },
    { text: "When you give it a prompt, it predicts what text should come next.", color: palette.green },
    { text: "That's it. At its core, an LLM is a next-word prediction machine.", color: palette.orange },
  ];

  return (
    <div>
      <p style={{ color: palette.muted, fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
        Tap each card to reveal the next idea. Build your understanding layer by layer.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {lines.map((line, i) => (
          <div
            key={i}
            onClick={() => { if (i === revealed) setRevealed(r => r + 1); }}
            style={{
              padding: "16px 20px",
              borderRadius: 12,
              background: i < revealed ? palette.surfaceAlt : palette.surface,
              border: `1px solid ${i === revealed ? palette.accent : i < revealed ? palette.border : "#1a2030"}`,
              cursor: i === revealed ? "pointer" : "default",
              opacity: i <= revealed ? 1 : 0.3,
              transition: "all 0.4s ease",
              transform: i < revealed ? "translateX(0)" : i === revealed ? "translateX(0)" : "translateX(8px)",
            }}
          >
            {i < revealed ? (
              <span style={{ color: line.color, fontSize: 16, lineHeight: 1.5 }}>{line.text}</span>
            ) : i === revealed ? (
              <span style={{ color: palette.accent, fontSize: 14, letterSpacing: 1 }}>TAP TO REVEAL</span>
            ) : (
              <span style={{ color: palette.muted, fontSize: 14 }}>...</span>
            )}
          </div>
        ))}
      </div>
      {revealed >= lines.length && (
        <div style={{
          marginTop: 24, padding: 20, borderRadius: 12,
          background: `linear-gradient(135deg, ${palette.accentDim}, #1a1535)`,
          border: `1px solid ${palette.accent}33`,
          animation: "fadeIn 0.5s ease",
        }}>
          <p style={{ color: palette.accent, fontWeight: 700, marginBottom: 6, fontSize: 15 }}>KEY INSIGHT</p>
          <p style={{ color: palette.text, lineHeight: 1.6, fontSize: 15, margin: 0 }}>
            An LLM doesn't "think" or "understand" the way humans do. It's incredibly good at predicting plausible next words based on patterns it learned from training data. But that simple mechanism produces surprisingly intelligent-seeming behavior.
          </p>
        </div>
      )}
    </div>
  );
}

function TokensChapter() {
  const [input, setInput] = useState("Hello, how are you doing today?");
  const tokenize = (text) => {
    if (!text) return [];
    const parts = [];
    let i = 0;
    while (i < text.length) {
      if (text[i] === " ") {
        let sp = "";
        while (i < text.length && text[i] === " ") { sp += text[i]; i++; }
        parts.push(sp);
      } else if (/[.,!?;:'"()\-]/.test(text[i])) {
        parts.push(text[i]);
        i++;
      } else {
        let word = "";
        while (i < text.length && text[i] !== " " && !/[.,!?;:'"()\-]/.test(text[i])) {
          word += text[i]; i++;
        }
        if (word.length > 5) {
          const mid = Math.ceil(word.length * 0.6);
          parts.push(word.slice(0, mid));
          parts.push(word.slice(mid));
        } else {
          parts.push(word);
        }
      }
    }
    return parts;
  };
  const colors = [palette.accent, palette.green, palette.orange, palette.pink, palette.purple, palette.yellow];
  const tokens = tokenize(input);

  return (
    <div>
      <p style={{ color: palette.muted, fontSize: 15, marginBottom: 8, lineHeight: 1.6 }}>
        LLMs don't read letters or whole words. They break text into <strong style={{ color: palette.accent }}>tokens</strong>, which are chunks of text, often parts of words.
      </p>
      <p style={{ color: palette.muted, fontSize: 15, marginBottom: 20, lineHeight: 1.6 }}>
        Type something below and see how it gets split into tokens:
      </p>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type anything here..."
        style={{
          width: "100%", padding: "14px 16px", borderRadius: 10,
          background: palette.surface, border: `1px solid ${palette.border}`,
          color: palette.text, fontSize: 16, outline: "none", boxSizing: "border-box",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      />
      <div style={{
        marginTop: 16, padding: 20, borderRadius: 12,
        background: palette.surface, border: `1px solid ${palette.border}`,
        minHeight: 60, display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center",
      }}>
        {tokens.map((t, i) => (
          <span key={i} style={{
            display: "inline-block",
            padding: "4px 8px", borderRadius: 6,
            background: t.trim() ? `${colors[i % colors.length]}22` : "transparent",
            border: t.trim() ? `1px solid ${colors[i % colors.length]}55` : "none",
            color: t.trim() ? colors[i % colors.length] : palette.muted,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
            whiteSpace: "pre",
          }}>
            {t.trim() ? t : "⎵"}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
        <span style={{ color: palette.muted, fontSize: 13 }}>{tokens.length} tokens</span>
        <span style={{ color: palette.muted, fontSize: 13 }}>{input.length} characters</span>
      </div>
      <div style={{
        marginTop: 20, padding: 16, borderRadius: 10,
        background: palette.surfaceAlt, border: `1px solid ${palette.border}`,
      }}>
        <p style={{ color: palette.yellow, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>WHY TOKENS?</p>
        <p style={{ color: palette.text, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
          Tokens are the fundamental unit an LLM works with. Common words like "the" are usually one token. Longer or rarer words get split into pieces. The word "unbelievable" might become ["un", "believ", "able"]. This is a simplification, but the real idea is the same!
        </p>
      </div>
    </div>
  );
}

function EmbeddingsChapter() {
  const [selected, setSelected] = useState(null);
  const wordPairs = [
    { words: ["king", "queen"], similarity: 0.85, explanation: "Both are royalty, so they live close together in embedding space." },
    { words: ["cat", "dog"], similarity: 0.72, explanation: "Both are pets/animals, so they're fairly close but not identical in meaning." },
    { words: ["cat", "democracy"], similarity: 0.08, explanation: "Almost nothing in common, so they're very far apart in embedding space." },
    { words: ["happy", "joyful"], similarity: 0.93, explanation: "Nearly synonyms! They occupy almost the same spot in embedding space." },
    { words: ["bank", "river"], similarity: 0.45, explanation: "Some connection (river bank), but also quite different. The model captures this ambiguity." },
  ];

  return (
    <div>
      <p style={{ color: palette.muted, fontSize: 15, marginBottom: 8, lineHeight: 1.6 }}>
        Computers don't understand words; they understand numbers. So each token gets converted into a long list of numbers called an <strong style={{ color: palette.purple }}>embedding</strong>.
      </p>
      <p style={{ color: palette.muted, fontSize: 15, marginBottom: 20, lineHeight: 1.6 }}>
        Words with similar meanings get similar numbers, putting them "close together" in a mathematical space. Tap a pair to explore:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {wordPairs.map((pair, i) => {
          const isOpen = selected === i;
          const barColor = pair.similarity > 0.7 ? palette.green : pair.similarity > 0.3 ? palette.orange : palette.pink;
          return (
            <div
              key={i}
              onClick={() => setSelected(isOpen ? null : i)}
              style={{
                padding: "16px 20px", borderRadius: 12, cursor: "pointer",
                background: isOpen ? palette.surfaceAlt : palette.surface,
                border: `1px solid ${isOpen ? barColor + "66" : palette.border}`,
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isOpen ? 12 : 0 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ color: palette.accent, fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 600 }}>{pair.words[0]}</span>
                  <span style={{ color: palette.muted, fontSize: 13 }}>vs</span>
                  <span style={{ color: palette.pink, fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 600 }}>{pair.words[1]}</span>
                </div>
                <span style={{ color: barColor, fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>{Math.round(pair.similarity * 100)}%</span>
              </div>
              {isOpen && (
                <div>
                  <div style={{
                    height: 8, borderRadius: 4, background: palette.bg, overflow: "hidden", marginBottom: 12,
                  }}>
                    <div style={{
                      height: "100%", width: `${pair.similarity * 100}%`,
                      background: `linear-gradient(90deg, ${barColor}, ${barColor}88)`,
                      borderRadius: 4, transition: "width 0.6s ease",
                    }} />
                  </div>
                  <p style={{ color: palette.text, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{pair.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{
        marginTop: 20, padding: 16, borderRadius: 10,
        background: palette.surfaceAlt, border: `1px solid ${palette.border}`,
      }}>
        <p style={{ color: palette.purple, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>THE BIG PICTURE</p>
        <p style={{ color: palette.text, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
          Embeddings are how an LLM "understands" meaning. Each token becomes a vector (a list of hundreds or thousands of numbers). Similar meanings = similar vectors. This is the foundation everything else builds on.
        </p>
      </div>
    </div>
  );
}

function AttentionChapter() {
  const [hoveredWord, setHoveredWord] = useState(null);
  const sentence = ["The", "cat", "sat", "on", "the", "mat", "because", "it", "was", "tired"];
  const attentionMap = {
    "it": { "cat": 0.65, "mat": 0.12, "The": 0.03, "sat": 0.05, "on": 0.02, "the": 0.03, "because": 0.04, "it": 0.01, "was": 0.03, "tired": 0.02 },
    "tired": { "cat": 0.45, "sat": 0.15, "it": 0.2, "was": 0.08, "The": 0.02, "on": 0.02, "the": 0.02, "mat": 0.03, "because": 0.02, "tired": 0.01 },
    "sat": { "cat": 0.55, "The": 0.1, "on": 0.15, "mat": 0.08, "sat": 0.02, "the": 0.03, "because": 0.02, "it": 0.02, "was": 0.02, "tired": 0.01 },
    "mat": { "on": 0.3, "the": 0.25, "sat": 0.15, "cat": 0.1, "The": 0.05, "mat": 0.05, "because": 0.03, "it": 0.03, "was": 0.02, "tired": 0.02 },
  };

  const getAttention = (target) => {
    if (!hoveredWord || !attentionMap[hoveredWord]) return 0;
    return attentionMap[hoveredWord][target] || 0;
  };

  return (
    <div>
      <p style={{ color: palette.muted, fontSize: 15, marginBottom: 8, lineHeight: 1.6 }}>
        When reading a sentence, some words are more relevant to each other. <strong style={{ color: palette.orange }}>Attention</strong> is how the model figures out which words to "focus on" when processing each word.
      </p>
      <p style={{ color: palette.muted, fontSize: 15, marginBottom: 20, lineHeight: 1.6 }}>
        Hover over (or tap) a <span style={{ color: palette.yellow, textDecoration: "underline" }}>highlighted word</span> to see what it "pays attention to":
      </p>
      <div style={{
        padding: 24, borderRadius: 12, background: palette.surface,
        border: `1px solid ${palette.border}`, textAlign: "center",
      }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {sentence.map((word, i) => {
            const isSource = attentionMap[word];
            const att = getAttention(word);
            const bgOpacity = att > 0 ? Math.max(att * 1.2, 0.1) : 0;
            return (
              <span
                key={i}
                onMouseEnter={() => isSource && setHoveredWord(word)}
                onMouseLeave={() => setHoveredWord(null)}
                onClick={() => isSource && setHoveredWord(hoveredWord === word ? null : word)}
                style={{
                  display: "inline-block", padding: "10px 14px", borderRadius: 8,
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 17,
                  cursor: isSource ? "pointer" : "default",
                  background: hoveredWord === word
                    ? `${palette.yellow}33`
                    : att > 0
                    ? `rgba(251, 146, 60, ${bgOpacity})`
                    : "transparent",
                  color: hoveredWord === word ? palette.yellow : isSource ? palette.yellow : palette.text,
                  border: isSource ? `1px dashed ${palette.yellow}55` : `1px solid transparent`,
                  textDecoration: isSource ? "underline" : "none",
                  textDecorationStyle: "dotted",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
              >
                {word}
                {att > 0.1 && hoveredWord && (
                  <span style={{
                    position: "absolute", top: -8, right: -4,
                    fontSize: 10, color: palette.orange, fontWeight: 700,
                    background: palette.bg, padding: "1px 4px", borderRadius: 4,
                  }}>{Math.round(att * 100)}%</span>
                )}
              </span>
            );
          })}
        </div>
        {hoveredWord && (
          <p style={{ color: palette.muted, fontSize: 13, marginTop: 16, margin: "16px 0 0 0" }}>
            "{hoveredWord}" is paying the most attention to "{Object.entries(attentionMap[hoveredWord]).sort((a,b) => b[1] - a[1])[0][0]}"
          </p>
        )}
      </div>
      <div style={{
        marginTop: 20, padding: 16, borderRadius: 10,
        background: palette.surfaceAlt, border: `1px solid ${palette.border}`,
      }}>
        <p style={{ color: palette.orange, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>WHY THIS MATTERS</p>
        <p style={{ color: palette.text, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
          When the model sees "it was tired", it needs to figure out what "it" refers to. Attention lets it look back at the whole sentence and determine that "it" most likely refers to "cat". This mechanism is the core of the Transformer architecture that powers every modern LLM.
        </p>
      </div>
    </div>
  );
}

function GenerationChapter() {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const timerRef = useRef(null);

  const sequence = [
    { text: "The", candidates: null, chosen: null, explanation: "We start with a prompt. The user typed 'The'." },
    { text: "The", candidates: [{ word: "cat", prob: 0.25 }, { word: "dog", prob: 0.18 }, { word: "sun", prob: 0.12 }, { word: "old", prob: 0.1 }], chosen: "cat", explanation: "The model looks at probabilities for what comes next. 'cat' is most likely here." },
    { text: "The cat", candidates: [{ word: "sat", prob: 0.30 }, { word: "was", prob: 0.22 }, { word: "ran", prob: 0.11 }, { word: "is", prob: 0.09 }], chosen: "sat", explanation: "Given 'The cat', it predicts 'sat' as the most probable next token." },
    { text: "The cat sat", candidates: [{ word: "on", prob: 0.55 }, { word: "down", prob: 0.18 }, { word: "in", prob: 0.08 }, { word: "by", prob: 0.06 }], chosen: "on", explanation: "'on' has a very high probability here. 'The cat sat on' is a strong pattern." },
    { text: "The cat sat on", candidates: [{ word: "the", prob: 0.60 }, { word: "a", prob: 0.15 }, { word: "my", prob: 0.08 }, { word: "its", prob: 0.05 }], chosen: "the", explanation: "Almost certainly 'the' comes next. The model is very confident here." },
    { text: "The cat sat on the", candidates: [{ word: "mat", prob: 0.28 }, { word: "floor", prob: 0.15 }, { word: "bed", prob: 0.12 }, { word: "table", prob: 0.09 }], chosen: "mat", explanation: "'The cat sat on the mat' is a very common phrase, so 'mat' wins!" },
    { text: "The cat sat on the mat", candidates: null, chosen: null, explanation: "Done! The model generated a complete sentence, one token at a time, always predicting the most likely next word." },
  ];

  const cur = sequence[step];

  useEffect(() => {
    if (autoPlay && step < sequence.length - 1) {
      timerRef.current = setTimeout(() => setStep(s => s + 1), 1800);
    } else {
      setAutoPlay(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [step, autoPlay]);

  return (
    <div>
      <p style={{ color: palette.muted, fontSize: 15, marginBottom: 20, lineHeight: 1.6 }}>
        LLMs generate text <strong style={{ color: palette.green }}>one token at a time</strong>. At each step, they calculate probabilities for every possible next token, then pick one. Watch it happen:
      </p>
      <div style={{
        padding: 24, borderRadius: 12, background: palette.surface,
        border: `1px solid ${palette.border}`, marginBottom: 16,
      }}>
        <div style={{ minHeight: 44, marginBottom: 16 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, color: palette.text }}>
            {cur.text}
          </span>
          {step < sequence.length - 1 && (
            <span style={{
              display: "inline-block", width: 3, height: 26,
              background: palette.accent, marginLeft: 2,
              animation: "blink 1s infinite",
              verticalAlign: "middle",
            }} />
          )}
        </div>
        {cur.candidates && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {cur.candidates.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 14,
                  color: c.word === cur.chosen ? palette.green : palette.muted,
                  width: 60, textAlign: "right", fontWeight: c.word === cur.chosen ? 700 : 400,
                }}>{c.word}</span>
                <div style={{ flex: 1, height: 20, background: palette.bg, borderRadius: 6, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${c.prob * 100 * 1.5}%`,
                    background: c.word === cur.chosen
                      ? `linear-gradient(90deg, ${palette.green}, ${palette.green}88)`
                      : `linear-gradient(90deg, ${palette.muted}44, ${palette.muted}22)`,
                    borderRadius: 6, transition: "width 0.5s ease",
                  }} />
                </div>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                  color: c.word === cur.chosen ? palette.green : palette.muted,
                  width: 40,
                }}>{Math.round(c.prob * 100)}%</span>
              </div>
            ))}
          </div>
        )}
        <p style={{ color: palette.accent, fontSize: 14, lineHeight: 1.5, margin: 0, minHeight: 42 }}>
          {cur.explanation}
        </p>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          style={{
            flex: 1, padding: "12px 0", borderRadius: 10, border: `1px solid ${palette.border}`,
            background: palette.surface, color: step === 0 ? palette.muted : palette.text,
            cursor: step === 0 ? "not-allowed" : "pointer", fontSize: 14, fontFamily: "'Outfit', sans-serif",
          }}>Back</button>
        <button onClick={() => { if (step < sequence.length - 1) setStep(s => s + 1); }}
          disabled={step >= sequence.length - 1}
          style={{
            flex: 1, padding: "12px 0", borderRadius: 10, border: "none",
            background: step >= sequence.length - 1 ? palette.surfaceAlt : palette.accent,
            color: step >= sequence.length - 1 ? palette.muted : palette.bg,
            cursor: step >= sequence.length - 1 ? "not-allowed" : "pointer",
            fontSize: 14, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
          }}>Next Step</button>
        <button onClick={() => { setStep(0); setAutoPlay(true); }}
          style={{
            padding: "12px 20px", borderRadius: 10, border: `1px solid ${palette.border}`,
            background: palette.surface, color: palette.yellow, cursor: "pointer", fontSize: 14, fontFamily: "'Outfit', sans-serif",
          }}>▶ Auto</button>
      </div>
    </div>
  );
}

function TrainingChapter() {
  const [phase, setPhase] = useState(0);
  const phases = [
    {
      title: "1. Pre-training",
      color: palette.accent,
      icon: "📚",
      desc: "The model reads MASSIVE amounts of text from books, websites, code, and more. It learns to predict the next word. This phase is incredibly expensive, using thousands of GPUs for weeks or months.",
      stats: ["Trillions of words", "Thousands of GPUs", "Weeks to months", "$10M to $100M+"],
    },
    {
      title: "2. Fine-tuning",
      color: palette.green,
      icon: "🎯",
      desc: "The raw model is then refined on curated, high-quality examples. It learns to follow instructions, be helpful, answer questions properly, and format responses nicely.",
      stats: ["Curated examples", "Instruction following", "Quality responses", "Days to weeks"],
    },
    {
      title: "3. Alignment (RLHF)",
      color: palette.pink,
      icon: "🤝",
      desc: "Human raters judge the model's responses, and this feedback is used to further train the model. This is called Reinforcement Learning from Human Feedback. It's what makes LLMs safe, helpful, and honest.",
      stats: ["Human feedback", "Safety training", "Helpfulness", "Honesty"],
    },
  ];

  return (
    <div>
      <p style={{ color: palette.muted, fontSize: 15, marginBottom: 20, lineHeight: 1.6 }}>
        Building an LLM happens in stages. Tap each phase to learn about it:
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {phases.map((p, i) => (
          <button key={i} onClick={() => setPhase(i)}
            style={{
              flex: 1, padding: "12px 8px", borderRadius: 10,
              background: phase === i ? `${p.color}22` : palette.surface,
              border: `1px solid ${phase === i ? p.color : palette.border}`,
              color: phase === i ? p.color : palette.muted,
              cursor: "pointer", fontSize: 13, fontWeight: 600,
              transition: "all 0.3s ease", fontFamily: "'Outfit', sans-serif",
            }}>
            <span style={{ fontSize: 20, display: "block", marginBottom: 4 }}>{p.icon}</span>
            {p.title.split(". ")[1]}
          </button>
        ))}
      </div>
      <div style={{
        padding: 24, borderRadius: 12,
        background: palette.surface, border: `1px solid ${phases[phase].color}33`,
        transition: "all 0.3s ease",
      }}>
        <h3 style={{ color: phases[phase].color, margin: "0 0 12px 0", fontSize: 18, fontFamily: "'Outfit', sans-serif" }}>
          {phases[phase].icon} {phases[phase].title}
        </h3>
        <p style={{ color: palette.text, lineHeight: 1.7, fontSize: 15, margin: "0 0 16px 0" }}>
          {phases[phase].desc}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {phases[phase].stats.map((s, i) => (
            <div key={i} style={{
              padding: "8px 12px", borderRadius: 8,
              background: `${phases[phase].color}11`,
              border: `1px solid ${phases[phase].color}22`,
              color: phases[phase].color, fontSize: 13, fontWeight: 500,
              textAlign: "center",
            }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WrapUpChapter() {
  const flow = [
    { label: "Your Prompt", icon: "💬", color: palette.accent, desc: "You type a question or instruction" },
    { label: "Tokenization", icon: "🧩", color: palette.yellow, desc: "Text is split into tokens" },
    { label: "Embeddings", icon: "📐", color: palette.purple, desc: "Tokens become number vectors" },
    { label: "Attention x N", icon: "👁", color: palette.orange, desc: "Layers of attention process meaning" },
    { label: "Predict Next", icon: "🎲", color: palette.green, desc: "Model picks the next token" },
    { label: "Repeat!", icon: "🔁", color: palette.pink, desc: "Loop until the response is complete" },
  ];

  return (
    <div>
      <p style={{ color: palette.muted, fontSize: 15, marginBottom: 20, lineHeight: 1.6 }}>
        Here's the full pipeline of what happens every time you talk to an LLM:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {flow.map((f, i) => (
          <div key={i}>
            <div style={{
              padding: "16px 20px", borderRadius: 12,
              background: palette.surface, border: `1px solid ${f.color}33`,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <span style={{ fontSize: 24 }}>{f.icon}</span>
              <div>
                <div style={{ color: f.color, fontWeight: 700, fontSize: 15 }}>{f.label}</div>
                <div style={{ color: palette.muted, fontSize: 13 }}>{f.desc}</div>
              </div>
            </div>
            {i < flow.length - 1 && (
              <div style={{ textAlign: "center", color: palette.muted, fontSize: 18, padding: "2px 0" }}>↓</div>
            )}
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 24, padding: 20, borderRadius: 12,
        background: `linear-gradient(135deg, ${palette.accentDim}, #1a1535)`,
        border: `1px solid ${palette.accent}33`,
      }}>
        <p style={{ color: palette.accent, fontWeight: 700, marginBottom: 6, fontSize: 15 }}>YOU DID IT!</p>
        <p style={{ color: palette.text, lineHeight: 1.6, fontSize: 15, margin: 0 }}>
          You now understand the core concepts behind every LLM, from ChatGPT to Claude. Tokens, embeddings, attention, next-token prediction, and training. Everything else (context windows, hallucinations, reasoning, tool use) builds on these fundamentals.
        </p>
      </div>
    </div>
  );
}

const chapters = { intro: IntroChapter, tokens: TokensChapter, embeddings: EmbeddingsChapter, attention: AttentionChapter, generation: GenerationChapter, training: TrainingChapter, wrapup: WrapUpChapter };

export default function App() {
  const [current, setCurrent] = useState(0);
  const Chapter = chapters[CHAPTERS[current].id];

  return (
    <div style={{
      minHeight: "100vh", background: palette.bg, color: palette.text,
      fontFamily: "'Outfit', 'Segoe UI', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: ${palette.border}; border-radius: 3px; }
      `}</style>

      <div style={{
        padding: "24px 24px 0", borderBottom: `1px solid ${palette.border}`,
        paddingBottom: 16,
      }}>
        <h1 style={{
          fontSize: 22, fontWeight: 800, letterSpacing: -0.5,
          background: `linear-gradient(135deg, ${palette.accent}, ${palette.purple})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: 4,
        }}>
          LLM Explorer
        </h1>
        <p style={{ color: palette.muted, fontSize: 13 }}>
          Chapter {current + 1} of {CHAPTERS.length}
        </p>
      </div>

      <div style={{
        display: "flex", gap: 4, padding: "12px 24px", overflowX: "auto",
        borderBottom: `1px solid ${palette.border}`,
      }}>
        {CHAPTERS.map((ch, i) => (
          <button key={ch.id} onClick={() => setCurrent(i)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 12px", borderRadius: 8, border: "none",
              background: current === i ? palette.surfaceAlt : "transparent",
              color: current === i ? palette.text : palette.muted,
              cursor: "pointer", fontSize: 13, whiteSpace: "nowrap",
              fontWeight: current === i ? 600 : 400,
              fontFamily: "'Outfit', sans-serif",
            }}>
            <span>{ch.icon}</span>
            <span style={{ display: i === current ? "inline" : "none" }}>{ch.title}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: "24px 24px 8px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: palette.text, marginBottom: 4, fontFamily: "'Outfit', sans-serif" }}>
          {CHAPTERS[current].icon} {CHAPTERS[current].title}
        </h2>
      </div>

      <div style={{ padding: "8px 24px 24px" }}>
        <Chapter />
      </div>

      <div style={{
        display: "flex", gap: 10, padding: "16px 24px 32px",
      }}>
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
          style={{
            flex: 1, padding: "14px 0", borderRadius: 12,
            border: `1px solid ${palette.border}`,
            background: palette.surface,
            color: current === 0 ? palette.muted : palette.text,
            cursor: current === 0 ? "not-allowed" : "pointer",
            fontSize: 15, fontFamily: "'Outfit', sans-serif",
          }}>
          ← Previous
        </button>
        <button onClick={() => setCurrent(c => Math.min(CHAPTERS.length - 1, c + 1))}
          disabled={current >= CHAPTERS.length - 1}
          style={{
            flex: 1, padding: "14px 0", borderRadius: 12, border: "none",
            background: current >= CHAPTERS.length - 1 ? palette.surfaceAlt : `linear-gradient(135deg, ${palette.accent}, ${palette.purple})`,
            color: current >= CHAPTERS.length - 1 ? palette.muted : "#fff",
            cursor: current >= CHAPTERS.length - 1 ? "not-allowed" : "pointer",
            fontSize: 15, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
          }}>
          Next Chapter →
        </button>
      </div>
    </div>
  );
}
