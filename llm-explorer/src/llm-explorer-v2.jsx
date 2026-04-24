import { useState, useEffect, useRef } from "react";

const CHAPTERS = [
  { id: "intro", title: "What is an LLM?", icon: "🧠" },
  { id: "neural", title: "Neural Networks", icon: "🔮" },
  { id: "tokens", title: "Tokens", icon: "🧩" },
  { id: "embeddings", title: "Embeddings", icon: "📐" },
  { id: "transformer", title: "The Transformer", icon: "⚡" },
  { id: "attention", title: "Attention", icon: "👁" },
  { id: "generation", title: "Text Generation", icon: "✍️" },
  { id: "temperature", title: "Temperature", icon: "🌡" },
  { id: "context", title: "Context Windows", icon: "📦" },
  { id: "training", title: "Training", icon: "🏋️" },
  { id: "hallucination", title: "Hallucinations", icon: "🫧" },
  { id: "prompting", title: "Prompt Engineering", icon: "🎯" },
  { id: "cot", title: "Chain of Thought", icon: "🔗" },
  { id: "rag", title: "RAG & Tools", icon: "🔧" },
  { id: "wrapup", title: "The Full Picture", icon: "🗺" },
];

const P = {
  bg: "#0a0e17", surface: "#121826", surfaceAlt: "#1a2235",
  border: "#2a3550", text: "#e2e8f0", muted: "#8892a8",
  accent: "#38bdf8", accentDim: "#1e3a5f", green: "#4ade80",
  orange: "#fb923c", pink: "#f472b6", purple: "#a78bfa",
  yellow: "#fbbf24", red: "#f87171", teal: "#2dd4bf",
};

const Card = ({ children, color, style }) => (
  <div style={{
    padding: 16, borderRadius: 12, background: P.surfaceAlt,
    border: `1px solid ${(color || P.border) + "33"}`, ...style,
  }}>{children}</div>
);

const Label = ({ children, color }) => (
  <p style={{ color: color || P.accent, fontWeight: 700, fontSize: 13, marginBottom: 6, letterSpacing: 0.5 }}>{children}</p>
);

const Body = ({ children, style }) => (
  <p style={{ color: P.text, fontSize: 14, lineHeight: 1.65, margin: 0, ...style }}>{children}</p>
);

const Intro = ({ children, style }) => (
  <p style={{ color: P.muted, fontSize: 15, marginBottom: 20, lineHeight: 1.6, ...style }}>{children}</p>
);

/* ═══════════════════ CH 1: INTRO ═══════════════════ */
function IntroChapter() {
  const [revealed, setRevealed] = useState(0);
  const lines = [
    { text: "LLM stands for Large Language Model.", color: P.accent },
    { text: 'It\'s a program that has "read" enormous amounts of text from the internet.', color: P.text },
    { text: "From all that reading, it learned patterns in language.", color: P.text },
    { text: "When you give it a prompt, it predicts what text should come next.", color: P.green },
    { text: "That's it. At its core, an LLM is a next-word prediction machine.", color: P.orange },
  ];
  return (
    <div>
      <Intro>Tap each card to reveal the next idea. Build your understanding layer by layer.</Intro>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {lines.map((line, i) => (
          <div key={i} onClick={() => { if (i === revealed) setRevealed(r => r + 1); }}
            style={{
              padding: "16px 20px", borderRadius: 12,
              background: i < revealed ? P.surfaceAlt : P.surface,
              border: `1px solid ${i === revealed ? P.accent : i < revealed ? P.border : "#1a2030"}`,
              cursor: i === revealed ? "pointer" : "default",
              opacity: i <= revealed ? 1 : 0.3, transition: "all 0.4s ease",
            }}>
            {i < revealed ? <span style={{ color: line.color, fontSize: 16, lineHeight: 1.5 }}>{line.text}</span>
              : i === revealed ? <span style={{ color: P.accent, fontSize: 14, letterSpacing: 1 }}>TAP TO REVEAL</span>
              : <span style={{ color: P.muted, fontSize: 14 }}>...</span>}
          </div>
        ))}
      </div>
      {revealed >= lines.length && (
        <Card color={P.accent} style={{ marginTop: 24, background: `linear-gradient(135deg, ${P.accentDim}, #1a1535)` }}>
          <Label>KEY INSIGHT</Label>
          <Body>An LLM doesn't "think" or "understand" the way humans do. It's incredibly good at predicting plausible next words based on patterns it learned from training data. But that simple mechanism produces surprisingly intelligent-seeming behavior.</Body>
        </Card>
      )}
    </div>
  );
}

/* ═══════════════════ CH 2: NEURAL NETWORKS ═══════════════════ */
function NeuralChapter() {
  const [activeNeuron, setActiveNeuron] = useState(null);
  const [weights, setWeights] = useState([0.7, -0.3, 0.5]);
  const inputs = [1.0, 0.8, 0.2];
  const sum = inputs.reduce((acc, inp, i) => acc + inp * weights[i], 0);
  const output = 1 / (1 + Math.exp(-sum));

  const layers = [
    { label: "Input", neurons: 3, color: P.accent },
    { label: "Hidden 1", neurons: 4, color: P.purple },
    { label: "Hidden 2", neurons: 4, color: P.orange },
    { label: "Output", neurons: 2, color: P.green },
  ];

  return (
    <div>
      <Intro>Neural networks are the foundation of LLMs. They're built from simple units called <strong style={{ color: P.purple }}>neurons</strong> that are stacked into layers.</Intro>

      <Card color={P.purple} style={{ marginBottom: 16 }}>
        <Label color={P.purple}>INTERACTIVE NEURON</Label>
        <Body style={{ marginBottom: 16 }}>A single neuron takes inputs, multiplies each by a weight, adds them up, and squashes the result. Drag the weight sliders to see how the output changes:</Body>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {weights.map((w, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: P.accent, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, width: 70 }}>
                in={inputs[i].toFixed(1)}
              </span>
              <span style={{ color: P.muted, fontSize: 12 }}>x</span>
              <input type="range" min="-1" max="1" step="0.1" value={w}
                onChange={e => { const nw = [...weights]; nw[i] = parseFloat(e.target.value); setWeights(nw); }}
                style={{ flex: 1, accentColor: P.purple }} />
              <span style={{ color: P.purple, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, width: 50, textAlign: "right" }}>
                w={w.toFixed(1)}
              </span>
              <span style={{ color: P.muted, fontSize: 12 }}>=</span>
              <span style={{ color: P.text, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, width: 50 }}>
                {(inputs[i] * w).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: P.bg, textAlign: "center" }}>
          <span style={{ color: P.muted, fontSize: 13 }}>Sum = {sum.toFixed(2)} → Activation → </span>
          <span style={{ color: output > 0.5 ? P.green : P.red, fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700 }}>
            {output.toFixed(3)}
          </span>
          <div style={{ marginTop: 6 }}>
            <div style={{ height: 6, background: P.surface, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${output * 100}%`, background: output > 0.5 ? P.green : P.red, borderRadius: 3, transition: "all 0.3s" }} />
            </div>
          </div>
        </div>
      </Card>

      <Card color={P.orange}>
        <Label color={P.orange}>NETWORK = LAYERS OF NEURONS</Label>
        <Body style={{ marginBottom: 16 }}>Stack thousands of neurons into layers and connect them. Each layer learns different patterns, from simple features to complex concepts:</Body>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "16px 0" }}>
          {layers.map((layer, li) => (
            <div key={li} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              {Array.from({ length: layer.neurons }).map((_, ni) => (
                <div key={ni}
                  onMouseEnter={() => setActiveNeuron(`${li}-${ni}`)}
                  onMouseLeave={() => setActiveNeuron(null)}
                  style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: activeNeuron === `${li}-${ni}` ? layer.color : `${layer.color}33`,
                    border: `2px solid ${layer.color}`,
                    transition: "all 0.2s", cursor: "pointer",
                  }} />
              ))}
              <span style={{ color: layer.color, fontSize: 11, fontWeight: 600, marginTop: 4 }}>{layer.label}</span>
            </div>
          ))}
        </div>
        <Body>An LLM like GPT-4 or Claude has billions of these weight parameters organized into dozens of layers. The "large" in Large Language Model refers to this massive scale.</Body>
      </Card>
    </div>
  );
}

/* ═══════════════════ CH 3: TOKENS ═══════════════════ */
function TokensChapter() {
  const [input, setInput] = useState("Hello, how are you doing today?");
  const tokenize = (text) => {
    if (!text) return [];
    const parts = []; let i = 0;
    while (i < text.length) {
      if (text[i] === " ") { let sp = ""; while (i < text.length && text[i] === " ") { sp += text[i]; i++; } parts.push(sp); }
      else if (/[.,!?;:'"()\-]/.test(text[i])) { parts.push(text[i]); i++; }
      else {
        let word = "";
        while (i < text.length && text[i] !== " " && !/[.,!?;:'"()\-]/.test(text[i])) { word += text[i]; i++; }
        if (word.length > 5) { const mid = Math.ceil(word.length * 0.6); parts.push(word.slice(0, mid)); parts.push(word.slice(mid)); }
        else parts.push(word);
      }
    }
    return parts;
  };
  const colors = [P.accent, P.green, P.orange, P.pink, P.purple, P.yellow];
  const tokens = tokenize(input);
  return (
    <div>
      <Intro>LLMs don't read letters or whole words. They break text into <strong style={{ color: P.accent }}>tokens</strong>, which are chunks of text, often parts of words. Type something below:</Intro>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type anything here..."
        style={{ width: "100%", padding: "14px 16px", borderRadius: 10, background: P.surface, border: `1px solid ${P.border}`, color: P.text, fontSize: 16, outline: "none", boxSizing: "border-box", fontFamily: "'JetBrains Mono', monospace" }} />
      <div style={{ marginTop: 16, padding: 20, borderRadius: 12, background: P.surface, border: `1px solid ${P.border}`, minHeight: 60, display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
        {tokens.map((t, i) => (
          <span key={i} style={{ display: "inline-block", padding: "4px 8px", borderRadius: 6, background: t.trim() ? `${colors[i % colors.length]}22` : "transparent", border: t.trim() ? `1px solid ${colors[i % colors.length]}55` : "none", color: t.trim() ? colors[i % colors.length] : P.muted, fontFamily: "'JetBrains Mono', monospace", fontSize: 14, whiteSpace: "pre" }}>
            {t.trim() ? t : "⎵"}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
        <span style={{ color: P.muted, fontSize: 13 }}>{tokens.length} tokens</span>
        <span style={{ color: P.muted, fontSize: 13 }}>{input.length} characters</span>
      </div>
      <Card color={P.yellow} style={{ marginTop: 20 }}>
        <Label color={P.yellow}>WHY TOKENS?</Label>
        <Body>Tokens are the fundamental unit an LLM works with. Common words like "the" are usually one token. Longer or rarer words get split into pieces. The word "unbelievable" might become ["un", "believ", "able"]. This is a simplification, but the real idea is the same!</Body>
      </Card>
    </div>
  );
}

/* ═══════════════════ CH 4: EMBEDDINGS ═══════════════════ */
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
      <Intro>Computers don't understand words; they understand numbers. Each token becomes a list of numbers called an <strong style={{ color: P.purple }}>embedding</strong>. Similar meanings get similar numbers. Tap a pair:</Intro>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {wordPairs.map((pair, i) => {
          const isOpen = selected === i;
          const barColor = pair.similarity > 0.7 ? P.green : pair.similarity > 0.3 ? P.orange : P.pink;
          return (
            <div key={i} onClick={() => setSelected(isOpen ? null : i)}
              style={{ padding: "16px 20px", borderRadius: 12, cursor: "pointer", background: isOpen ? P.surfaceAlt : P.surface, border: `1px solid ${isOpen ? barColor + "66" : P.border}`, transition: "all 0.3s ease" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: isOpen ? 12 : 0 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ color: P.accent, fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 600 }}>{pair.words[0]}</span>
                  <span style={{ color: P.muted, fontSize: 13 }}>vs</span>
                  <span style={{ color: P.pink, fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 600 }}>{pair.words[1]}</span>
                </div>
                <span style={{ color: barColor, fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>{Math.round(pair.similarity * 100)}%</span>
              </div>
              {isOpen && (
                <div>
                  <div style={{ height: 8, borderRadius: 4, background: P.bg, overflow: "hidden", marginBottom: 12 }}>
                    <div style={{ height: "100%", width: `${pair.similarity * 100}%`, background: `linear-gradient(90deg, ${barColor}, ${barColor}88)`, borderRadius: 4, transition: "width 0.6s ease" }} />
                  </div>
                  <Body>{pair.explanation}</Body>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Card color={P.purple} style={{ marginTop: 20 }}>
        <Label color={P.purple}>THE BIG PICTURE</Label>
        <Body>Each token becomes a vector (a list of hundreds or thousands of numbers). Similar meanings = similar vectors. This mathematical representation of meaning is the foundation everything else builds on.</Body>
      </Card>
    </div>
  );
}

/* ═══════════════════ CH 5: TRANSFORMER ═══════════════════ */
function TransformerChapter() {
  const [activeBlock, setActiveBlock] = useState(null);
  const blocks = [
    { id: "input", label: "Input Embedding", color: P.accent, icon: "📥", desc: "Your text gets tokenized and each token is converted into an embedding vector. Positional information is added so the model knows word order." },
    { id: "attention", label: "Multi-Head Attention", color: P.orange, icon: "👁", desc: "The model looks at all tokens simultaneously and figures out which ones are relevant to each other. 'Multi-head' means it does this from multiple perspectives at once (e.g., syntax, semantics, coreference)." },
    { id: "ffn", label: "Feed-Forward Network", color: P.purple, icon: "🔮", desc: "After attention figures out relationships, this dense network processes each token's updated representation. Think of it as 'thinking about' what attention found." },
    { id: "norm", label: "Layer Norm + Residuals", color: P.teal, icon: "⚖️", desc: "Normalization keeps numbers stable. Residual connections (skip connections) let information flow directly through layers, preventing the 'vanishing gradient' problem in deep networks." },
    { id: "repeat", label: "Repeat x N Layers", color: P.yellow, icon: "🔁", desc: "The attention + feed-forward block is stacked many times. GPT-3 has 96 layers. Each layer refines understanding, from basic syntax in early layers to abstract reasoning in later ones." },
    { id: "output", label: "Output Probabilities", color: P.green, icon: "📤", desc: "The final layer projects the representation into a probability distribution over the entire vocabulary (50,000+ tokens). The highest probability token becomes the prediction." },
  ];

  return (
    <div>
      <Intro>The <strong style={{ color: P.yellow }}>Transformer</strong> is the architecture behind every modern LLM. Published in 2017 in the paper "Attention Is All You Need", it revolutionized AI. Tap each block to explore:</Intro>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {blocks.map((b, i) => (
          <div key={b.id}>
            <div onClick={() => setActiveBlock(activeBlock === b.id ? null : b.id)}
              style={{
                padding: "14px 18px", borderRadius: 10, cursor: "pointer",
                background: activeBlock === b.id ? `${b.color}15` : P.surface,
                border: `1px solid ${activeBlock === b.id ? b.color + "66" : P.border}`,
                transition: "all 0.3s",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>{b.icon}</span>
                <span style={{ color: b.color, fontWeight: 600, fontSize: 15, flex: 1 }}>{b.label}</span>
                <span style={{ color: P.muted, fontSize: 18, transform: activeBlock === b.id ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>v</span>
              </div>
              {activeBlock === b.id && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${b.color}22` }}>
                  <Body>{b.desc}</Body>
                </div>
              )}
            </div>
            {i < blocks.length - 1 && (
              <div style={{ textAlign: "center", color: P.muted, fontSize: 14, padding: "2px 0" }}>↓</div>
            )}
          </div>
        ))}
      </div>
      <Card color={P.yellow} style={{ marginTop: 20 }}>
        <Label color={P.yellow}>WHY TRANSFORMERS WON</Label>
        <Body>Before Transformers, models (RNNs/LSTMs) read text one word at a time, left to right. Transformers read everything at once using attention, making them massively parallelizable on GPUs. This is what enabled scaling to billions of parameters.</Body>
      </Card>
    </div>
  );
}

/* ═══════════════════ CH 6: ATTENTION ═══════════════════ */
function AttentionChapter() {
  const [hoveredWord, setHoveredWord] = useState(null);
  const sentence = ["The", "cat", "sat", "on", "the", "mat", "because", "it", "was", "tired"];
  const attentionMap = {
    "it": { "cat": 0.65, "mat": 0.12, "The": 0.03, "sat": 0.05, "on": 0.02, "the": 0.03, "because": 0.04, "it": 0.01, "was": 0.03, "tired": 0.02 },
    "tired": { "cat": 0.45, "sat": 0.15, "it": 0.2, "was": 0.08, "The": 0.02, "on": 0.02, "the": 0.02, "mat": 0.03, "because": 0.02, "tired": 0.01 },
    "sat": { "cat": 0.55, "The": 0.1, "on": 0.15, "mat": 0.08, "sat": 0.02, "the": 0.03, "because": 0.02, "it": 0.02, "was": 0.02, "tired": 0.01 },
    "mat": { "on": 0.3, "the": 0.25, "sat": 0.15, "cat": 0.1, "The": 0.05, "mat": 0.05, "because": 0.03, "it": 0.03, "was": 0.02, "tired": 0.02 },
  };
  const getAtt = (target) => hoveredWord && attentionMap[hoveredWord] ? (attentionMap[hoveredWord][target] || 0) : 0;

  return (
    <div>
      <Intro>When reading a sentence, some words are more relevant to each other. <strong style={{ color: P.orange }}>Attention</strong> is how the model figures out which words to "focus on". Hover/tap a <span style={{ color: P.yellow, textDecoration: "underline dotted" }}>highlighted word</span>:</Intro>
      <div style={{ padding: 24, borderRadius: 12, background: P.surface, border: `1px solid ${P.border}`, textAlign: "center" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {sentence.map((word, i) => {
            const isSource = attentionMap[word];
            const att = getAtt(word);
            return (
              <span key={i}
                onMouseEnter={() => isSource && setHoveredWord(word)}
                onMouseLeave={() => setHoveredWord(null)}
                onClick={() => isSource && setHoveredWord(hoveredWord === word ? null : word)}
                style={{
                  display: "inline-block", padding: "10px 14px", borderRadius: 8,
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 17,
                  cursor: isSource ? "pointer" : "default",
                  background: hoveredWord === word ? `${P.yellow}33` : att > 0 ? `rgba(251,146,60,${Math.max(att * 1.2, 0.1)})` : "transparent",
                  color: hoveredWord === word ? P.yellow : isSource ? P.yellow : P.text,
                  border: isSource ? `1px dashed ${P.yellow}55` : `1px solid transparent`,
                  textDecoration: isSource ? "underline" : "none", textDecorationStyle: "dotted",
                  transition: "all 0.3s ease", position: "relative",
                }}>
                {word}
                {att > 0.1 && hoveredWord && <span style={{ position: "absolute", top: -8, right: -4, fontSize: 10, color: P.orange, fontWeight: 700, background: P.bg, padding: "1px 4px", borderRadius: 4 }}>{Math.round(att * 100)}%</span>}
              </span>
            );
          })}
        </div>
        {hoveredWord && <p style={{ color: P.muted, fontSize: 13, marginTop: 16 }}>"{hoveredWord}" attends most to "{Object.entries(attentionMap[hoveredWord]).sort((a, b) => b[1] - a[1])[0][0]}"</p>}
      </div>
      <Card color={P.orange} style={{ marginTop: 20 }}>
        <Label color={P.orange}>WHY THIS MATTERS</Label>
        <Body>When the model sees "it was tired", attention lets it look back and determine "it" refers to "cat". Real LLMs use multi-head attention with 32-128 heads running in parallel, each learning different types of relationships (syntax, semantics, coreference, etc.).</Body>
      </Card>
    </div>
  );
}

/* ═══════════════════ CH 7: GENERATION ═══════════════════ */
function GenerationChapter() {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const timerRef = useRef(null);
  const seq = [
    { text: "The", candidates: null, chosen: null, explanation: "We start with a prompt. The user typed 'The'." },
    { text: "The", candidates: [{ word: "cat", prob: 0.25 }, { word: "dog", prob: 0.18 }, { word: "sun", prob: 0.12 }, { word: "old", prob: 0.1 }], chosen: "cat", explanation: "The model calculates probabilities for every possible next token. 'cat' wins." },
    { text: "The cat", candidates: [{ word: "sat", prob: 0.30 }, { word: "was", prob: 0.22 }, { word: "ran", prob: 0.11 }, { word: "is", prob: 0.09 }], chosen: "sat", explanation: "Given 'The cat', 'sat' is predicted as the most probable next token." },
    { text: "The cat sat", candidates: [{ word: "on", prob: 0.55 }, { word: "down", prob: 0.18 }, { word: "in", prob: 0.08 }, { word: "by", prob: 0.06 }], chosen: "on", explanation: "'on' has very high probability. 'The cat sat on' is a strong pattern." },
    { text: "The cat sat on", candidates: [{ word: "the", prob: 0.60 }, { word: "a", prob: 0.15 }, { word: "my", prob: 0.08 }, { word: "its", prob: 0.05 }], chosen: "the", explanation: "Almost certainly 'the' comes next. The model is very confident here." },
    { text: "The cat sat on the", candidates: [{ word: "mat", prob: 0.28 }, { word: "floor", prob: 0.15 }, { word: "bed", prob: 0.12 }, { word: "table", prob: 0.09 }], chosen: "mat", explanation: "'The cat sat on the mat' is a very common phrase, so 'mat' wins!" },
    { text: "The cat sat on the mat", candidates: null, chosen: null, explanation: "Done! The model generated a sentence, one token at a time, always predicting the most likely next word." },
  ];
  const cur = seq[step];
  useEffect(() => {
    if (autoPlay && step < seq.length - 1) timerRef.current = setTimeout(() => setStep(s => s + 1), 1800);
    else setAutoPlay(false);
    return () => clearTimeout(timerRef.current);
  }, [step, autoPlay]);

  return (
    <div>
      <Intro>LLMs generate text <strong style={{ color: P.green }}>one token at a time</strong>. At each step, they calculate probabilities for every possible next token, then pick one. Watch it happen:</Intro>
      <div style={{ padding: 24, borderRadius: 12, background: P.surface, border: `1px solid ${P.border}`, marginBottom: 16 }}>
        <div style={{ minHeight: 44, marginBottom: 16 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, color: P.text }}>{cur.text}</span>
          {step < seq.length - 1 && <span style={{ display: "inline-block", width: 3, height: 26, background: P.accent, marginLeft: 2, animation: "blink 1s infinite", verticalAlign: "middle" }} />}
        </div>
        {cur.candidates && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {cur.candidates.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: c.word === cur.chosen ? P.green : P.muted, width: 60, textAlign: "right", fontWeight: c.word === cur.chosen ? 700 : 400 }}>{c.word}</span>
                <div style={{ flex: 1, height: 20, background: P.bg, borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${c.prob * 150}%`, background: c.word === cur.chosen ? `linear-gradient(90deg, ${P.green}, ${P.green}88)` : `${P.muted}33`, borderRadius: 6, transition: "width 0.5s ease" }} />
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: c.word === cur.chosen ? P.green : P.muted, width: 40 }}>{Math.round(c.prob * 100)}%</span>
              </div>
            ))}
          </div>
        )}
        <p style={{ color: P.accent, fontSize: 14, lineHeight: 1.5, margin: 0, minHeight: 42 }}>{cur.explanation}</p>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: `1px solid ${P.border}`, background: P.surface, color: step === 0 ? P.muted : P.text, cursor: step === 0 ? "not-allowed" : "pointer", fontSize: 14, fontFamily: "'Outfit', sans-serif" }}>Back</button>
        <button onClick={() => step < seq.length - 1 && setStep(s => s + 1)} disabled={step >= seq.length - 1}
          style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", background: step >= seq.length - 1 ? P.surfaceAlt : P.accent, color: step >= seq.length - 1 ? P.muted : P.bg, cursor: step >= seq.length - 1 ? "not-allowed" : "pointer", fontSize: 14, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Next Step</button>
        <button onClick={() => { setStep(0); setAutoPlay(true); }}
          style={{ padding: "12px 20px", borderRadius: 10, border: `1px solid ${P.border}`, background: P.surface, color: P.yellow, cursor: "pointer", fontSize: 14, fontFamily: "'Outfit', sans-serif" }}>▶ Auto</button>
      </div>
    </div>
  );
}

/* ═══════════════════ CH 8: TEMPERATURE ═══════════════════ */
function TemperatureChapter() {
  const [temp, setTemp] = useState(0.7);
  const baseProbs = [
    { word: "mat", base: 0.35 }, { word: "floor", base: 0.25 },
    { word: "bed", base: 0.18 }, { word: "couch", base: 0.12 },
    { word: "roof", base: 0.06 }, { word: "moon", base: 0.04 },
  ];

  const adjustedProbs = (() => {
    const logits = baseProbs.map(p => Math.log(p.base));
    const scaled = logits.map(l => l / Math.max(temp, 0.01));
    const maxS = Math.max(...scaled);
    const exps = scaled.map(s => Math.exp(s - maxS));
    const sum = exps.reduce((a, b) => a + b, 0);
    return baseProbs.map((p, i) => ({ ...p, adjusted: exps[i] / sum }));
  })();

  const tempLabel = temp < 0.3 ? "Very Focused" : temp < 0.6 ? "Focused" : temp < 0.9 ? "Balanced" : temp < 1.3 ? "Creative" : "Wild";
  const tempColor = temp < 0.3 ? P.accent : temp < 0.6 ? P.green : temp < 0.9 ? P.yellow : temp < 1.3 ? P.orange : P.red;

  return (
    <div>
      <Intro><strong style={{ color: P.orange }}>Temperature</strong> controls how random or focused the model's choices are. Low temperature = predictable. High temperature = creative (or chaotic). Drag the slider:</Intro>
      <div style={{ padding: 24, borderRadius: 12, background: P.surface, border: `1px solid ${P.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ color: P.muted, fontSize: 14 }}>Prompt: "The cat sat on the ___"</span>
          <span style={{ color: tempColor, fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700 }}>{tempLabel}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <span style={{ color: P.accent, fontSize: 12 }}>0.0</span>
          <input type="range" min="0.05" max="2.0" step="0.05" value={temp}
            onChange={e => setTemp(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: tempColor }} />
          <span style={{ color: P.red, fontSize: 12 }}>2.0</span>
          <span style={{ color: tempColor, fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, width: 48, textAlign: "right" }}>
            {temp.toFixed(2)}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {adjustedProbs.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: i === 0 ? P.green : P.text, width: 60, textAlign: "right" }}>{p.word}</span>
              <div style={{ flex: 1, height: 24, background: P.bg, borderRadius: 6, overflow: "hidden", position: "relative" }}>
                <div style={{
                  height: "100%", width: `${Math.min(p.adjusted * 100, 100)}%`,
                  background: `linear-gradient(90deg, ${tempColor}, ${tempColor}66)`,
                  borderRadius: 6, transition: "width 0.4s ease",
                }} />
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: P.muted, width: 48, textAlign: "right" }}>{(p.adjusted * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
      <Card color={P.orange} style={{ marginTop: 20 }}>
        <Label color={P.orange}>WHAT'S HAPPENING</Label>
        <Body>At temperature 0, the model always picks the highest-probability word ("mat"). As temperature rises, lower-probability words get a bigger share, making surprising choices like "moon" possible. Most chatbots use 0.7 to 1.0 for a good balance of coherence and creativity.</Body>
      </Card>
      <Card color={P.teal} style={{ marginTop: 12 }}>
        <Label color={P.teal}>ALSO: TOP-K AND TOP-P</Label>
        <Body>Temperature isn't the only control. Top-K sampling only considers the K most likely tokens. Top-P (nucleus sampling) considers tokens whose cumulative probability exceeds P. These prevent the model from picking extremely unlikely tokens even at high temperatures.</Body>
      </Card>
    </div>
  );
}

/* ═══════════════════ CH 9: CONTEXT WINDOW ═══════════════════ */
function ContextChapter() {
  const [model, setModel] = useState(0);
  const models = [
    { name: "GPT-2 (2019)", tokens: 1024, color: P.muted, pages: 1.5 },
    { name: "GPT-3 (2020)", tokens: 4096, color: P.accent, pages: 6 },
    { name: "GPT-4 (2023)", tokens: 128000, color: P.green, pages: 200 },
    { name: "Claude 3.5 (2024)", tokens: 200000, color: P.orange, pages: 350 },
    { name: "Gemini 1.5 (2024)", tokens: 1000000, color: P.purple, pages: 1500 },
  ];
  const maxTokens = 1000000;

  return (
    <div>
      <Intro>The <strong style={{ color: P.accent }}>context window</strong> is the model's "working memory": the maximum amount of text it can consider at once. Everything (your prompt + the response) must fit inside it. Tap a model:</Intro>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {models.map((m, i) => {
          const isActive = model === i;
          const barWidth = Math.max((m.tokens / maxTokens) * 100, 2);
          return (
            <div key={i} onClick={() => setModel(i)}
              style={{ padding: "14px 18px", borderRadius: 10, cursor: "pointer", background: isActive ? `${m.color}15` : P.surface, border: `1px solid ${isActive ? m.color + "66" : P.border}`, transition: "all 0.3s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ color: isActive ? m.color : P.text, fontWeight: 600, fontSize: 14 }}>{m.name}</span>
                <span style={{ color: m.color, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{m.tokens.toLocaleString()} tokens</span>
              </div>
              <div style={{ height: 10, background: P.bg, borderRadius: 5, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${barWidth}%`, background: `linear-gradient(90deg, ${m.color}, ${m.color}88)`, borderRadius: 5, transition: "width 0.5s" }} />
              </div>
              {isActive && (
                <p style={{ color: P.muted, fontSize: 13, marginTop: 8 }}>
                  Roughly {m.pages} pages of text, or about {Math.round(m.tokens * 0.75).toLocaleString()} English words
                </p>
              )}
            </div>
          );
        })}
      </div>
      <Card color={P.yellow} style={{ marginTop: 20 }}>
        <Label color={P.yellow}>WHY CONTEXT SIZE MATTERS</Label>
        <Body>A bigger context window means the model can consider more information at once: longer documents, more conversation history, more examples. But bigger isn't always better since processing long contexts is slower and more expensive, and models can lose focus on important details buried in the middle of very long inputs (the "lost in the middle" problem).</Body>
      </Card>
    </div>
  );
}

/* ═══════════════════ CH 10: TRAINING ═══════════════════ */
function TrainingChapter() {
  const [phase, setPhase] = useState(0);
  const phases = [
    { title: "1. Pre-training", color: P.accent, icon: "📚", desc: "The model reads MASSIVE amounts of text from books, websites, code, and more. It learns to predict the next word. This phase is incredibly expensive, using thousands of GPUs for weeks or months.", stats: ["Trillions of words", "Thousands of GPUs", "Weeks to months", "$10M to $100M+"] },
    { title: "2. Fine-tuning", color: P.green, icon: "🎯", desc: "The raw model is refined on curated, high-quality examples. It learns to follow instructions, be helpful, answer questions properly, and format responses nicely.", stats: ["Curated examples", "Instruction following", "Quality responses", "Days to weeks"] },
    { title: "3. RLHF", color: P.pink, icon: "🤝", desc: "Human raters judge the model's responses, and this feedback trains the model further. Reinforcement Learning from Human Feedback is what makes LLMs safe, helpful, and honest.", stats: ["Human feedback", "Safety training", "Helpfulness", "Honesty"] },
  ];
  return (
    <div>
      <Intro>Building an LLM happens in stages. Tap each phase to learn about it:</Intro>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {phases.map((p, i) => (
          <button key={i} onClick={() => setPhase(i)}
            style={{ flex: 1, padding: "12px 8px", borderRadius: 10, background: phase === i ? `${p.color}22` : P.surface, border: `1px solid ${phase === i ? p.color : P.border}`, color: phase === i ? p.color : P.muted, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
            <span style={{ fontSize: 20, display: "block", marginBottom: 4 }}>{p.icon}</span>
            {p.title.split(". ")[1]}
          </button>
        ))}
      </div>
      <div style={{ padding: 24, borderRadius: 12, background: P.surface, border: `1px solid ${phases[phase].color}33` }}>
        <h3 style={{ color: phases[phase].color, margin: "0 0 12px 0", fontSize: 18, fontFamily: "'Outfit', sans-serif" }}>{phases[phase].icon} {phases[phase].title}</h3>
        <Body style={{ marginBottom: 16 }}>{phases[phase].desc}</Body>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {phases[phase].stats.map((s, i) => (
            <div key={i} style={{ padding: "8px 12px", borderRadius: 8, background: `${phases[phase].color}11`, border: `1px solid ${phases[phase].color}22`, color: phases[phase].color, fontSize: 13, fontWeight: 500, textAlign: "center" }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ CH 11: HALLUCINATIONS ═══════════════════ */
function HallucinationChapter() {
  const [revealed, setRevealed] = useState({});
  const examples = [
    { claim: '"The Great Wall of China is visible from space with the naked eye."', verdict: "HALLUCINATION", color: P.red, truth: "This is a common myth. Astronauts have confirmed it's not visible from space without aid. But an LLM trained on millions of web pages that repeat this myth will confidently state it as fact." },
    { claim: '"Python was created by Guido van Rossum in 1991."', verdict: "CORRECT", color: P.green, truth: "This is factually correct. LLMs do get many things right, especially well-documented facts that appear frequently in training data." },
    { claim: '"The 2023 Nobel Prize in Literature was awarded to Jon Fosse."', verdict: "CORRECT (but risky)", color: P.yellow, truth: "This is correct, but the model might have been trained before this event. For recent facts, LLMs can guess wrong or mix up details. They have no way to distinguish between 'I know this' and 'I'm guessing.'" },
    { claim: '"The paper \'Attention Dynamics in Recursive Networks\' by Zhang et al. (2022) showed that..."', verdict: "LIKELY HALLUCINATED", color: P.red, truth: "LLMs frequently invent paper titles, authors, and findings that sound plausible but don't exist. They're pattern-matching 'academic citation' format, not retrieving real papers." },
  ];

  return (
    <div>
      <Intro><strong style={{ color: P.red }}>Hallucinations</strong> happen when an LLM generates text that sounds confident and plausible but is factually wrong. Tap each claim to check:</Intro>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {examples.map((ex, i) => (
          <div key={i} onClick={() => setRevealed(r => ({ ...r, [i]: !r[i] }))}
            style={{ padding: "16px 20px", borderRadius: 12, cursor: "pointer", background: revealed[i] ? `${ex.color}10` : P.surface, border: `1px solid ${revealed[i] ? ex.color + "66" : P.border}`, transition: "all 0.3s" }}>
            <p style={{ color: P.text, fontSize: 15, lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>{ex.claim}</p>
            {revealed[i] ? (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${ex.color}33` }}>
                <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 6, background: `${ex.color}22`, color: ex.color, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{ex.verdict}</span>
                <Body>{ex.truth}</Body>
              </div>
            ) : (
              <p style={{ color: P.accent, fontSize: 12, marginTop: 8, marginBottom: 0, letterSpacing: 0.5 }}>TAP TO VERIFY</p>
            )}
          </div>
        ))}
      </div>
      <Card color={P.red} style={{ marginTop: 20 }}>
        <Label color={P.red}>WHY THEY HAPPEN</Label>
        <Body>LLMs don't have a database of facts. They predict plausible-sounding text. If a pattern looks right ("Author et al. (year) found that..."), the model will generate it regardless of whether it's real. The model has no mechanism to say "I don't know" unless specifically trained to.</Body>
      </Card>
    </div>
  );
}

/* ═══════════════════ CH 12: PROMPT ENGINEERING ═══════════════════ */
function PromptChapter() {
  const [activeTip, setActiveTip] = useState(0);
  const tips = [
    { title: "Be Specific", color: P.accent, bad: "Write something about dogs.", good: "Write a 200-word informative paragraph about the health benefits of owning a dog, aimed at senior citizens considering adopting a pet.", why: "Vague prompts give vague results. Specifying length, topic, audience, and format gives the model clear constraints to work within." },
    { title: "Give Examples", color: P.green, bad: "Classify these reviews as positive or negative.", good: "Classify each review as positive or negative.\n\nExample: 'Loved it!' -> Positive\nExample: 'Terrible service' -> Negative\n\nNow classify: 'Pretty good overall'", why: "This is called 'few-shot prompting'. Showing examples is far more effective than explaining what you want, because the model can pattern-match from concrete examples." },
    { title: "Assign a Role", color: P.purple, bad: "Explain quantum computing.", good: "You are a physics professor explaining quantum computing to a curious 10-year-old. Use simple analogies and avoid jargon.", why: "Giving the model a persona constrains its output style, vocabulary level, and approach. It activates different 'patterns' from training data." },
    { title: "Think Step by Step", color: P.orange, bad: "What's 15% tip on $47.50?", good: "What's 15% tip on $47.50? Show your reasoning step by step.", why: "Asking for step-by-step reasoning activates 'chain of thought' patterns that dramatically improve accuracy on math, logic, and complex reasoning tasks." },
    { title: "Set Constraints", color: P.pink, bad: "Summarize this article.", good: "Summarize this article in exactly 3 bullet points, each under 20 words, focusing only on the financial implications.", why: "Constraints (format, length, focus area) prevent the model from rambling or including irrelevant information. They act as guardrails on the output." },
  ];
  const tip = tips[activeTip];
  return (
    <div>
      <Intro><strong style={{ color: P.yellow }}>Prompt engineering</strong> is the art of writing inputs that get the best outputs from an LLM. Small changes in how you ask can dramatically change the quality of answers.</Intro>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto" }}>
        {tips.map((t, i) => (
          <button key={i} onClick={() => setActiveTip(i)}
            style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${activeTip === i ? t.color : P.border}`, background: activeTip === i ? `${t.color}22` : "transparent", color: activeTip === i ? t.color : P.muted, cursor: "pointer", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", fontFamily: "'Outfit', sans-serif" }}>
            {t.title}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ padding: 16, borderRadius: 10, background: `${P.red}10`, border: `1px solid ${P.red}33` }}>
          <span style={{ color: P.red, fontSize: 11, fontWeight: 700 }}>WEAK PROMPT</span>
          <p style={{ color: P.text, fontSize: 13, marginTop: 8, lineHeight: 1.5, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "pre-wrap", margin: "8px 0 0 0" }}>{tip.bad}</p>
        </div>
        <div style={{ padding: 16, borderRadius: 10, background: `${P.green}10`, border: `1px solid ${P.green}33` }}>
          <span style={{ color: P.green, fontSize: 11, fontWeight: 700 }}>STRONG PROMPT</span>
          <p style={{ color: P.text, fontSize: 13, marginTop: 8, lineHeight: 1.5, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "pre-wrap", margin: "8px 0 0 0" }}>{tip.good}</p>
        </div>
      </div>
      <Card color={tip.color}>
        <Label color={tip.color}>WHY IT WORKS</Label>
        <Body>{tip.why}</Body>
      </Card>
    </div>
  );
}

/* ═══════════════════ CH 13: CHAIN OF THOUGHT ═══════════════════ */
function CoTChapter() {
  const [showSteps, setShowSteps] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const problem = "A store sells apples for $2 each. Sarah buys 3 apples and pays with a $20 bill. The cashier accidentally gives her change for $10 instead of $20. How much change did Sarah actually receive vs how much she should have received?";
  const directAnswer = '"Sarah should get $14 back but got $4 back." (Sometimes wrong, no verification possible)';
  const steps = [
    { thought: "Cost of apples: 3 apples x $2 = $6", color: P.accent },
    { thought: "Sarah paid with: $20", color: P.green },
    { thought: "Correct change: $20 - $6 = $14", color: P.purple },
    { thought: "Cashier calculated change from $10 instead: $10 - $6 = $4", color: P.orange },
    { thought: "So Sarah received $4, but should have received $14", color: P.yellow },
    { thought: "Difference: $14 - $4 = $10 (she was shortchanged by $10)", color: P.pink },
  ];

  useEffect(() => {
    if (showSteps && stepIdx < steps.length) {
      const t = setTimeout(() => setStepIdx(s => s + 1), 800);
      return () => clearTimeout(t);
    }
  }, [showSteps, stepIdx]);

  return (
    <div>
      <Intro><strong style={{ color: P.teal }}>Chain of Thought</strong> (CoT) is a technique where the model "thinks out loud" step by step instead of jumping to an answer. This dramatically improves accuracy on reasoning tasks.</Intro>
      <div style={{ padding: 16, borderRadius: 10, background: P.surface, border: `1px solid ${P.border}`, marginBottom: 16 }}>
        <Label color={P.muted}>THE PROBLEM</Label>
        <Body>{problem}</Body>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ padding: 16, borderRadius: 10, background: `${P.red}10`, border: `1px solid ${P.red}33` }}>
          <span style={{ color: P.red, fontSize: 11, fontWeight: 700 }}>WITHOUT CoT</span>
          <p style={{ color: P.muted, fontSize: 13, marginTop: 8, lineHeight: 1.5, fontStyle: "italic", margin: "8px 0 0 0" }}>{directAnswer}</p>
        </div>
        <div style={{ padding: 16, borderRadius: 10, background: `${P.green}10`, border: `1px solid ${P.green}33`, cursor: "pointer" }}
          onClick={() => { setShowSteps(true); setStepIdx(0); }}>
          <span style={{ color: P.green, fontSize: 11, fontWeight: 700 }}>WITH CoT {!showSteps && "(tap to run)"}</span>
          {showSteps && (
            <div style={{ marginTop: 8 }}>
              {steps.slice(0, stepIdx).map((s, i) => (
                <p key={i} style={{ color: s.color, fontSize: 13, lineHeight: 1.5, marginTop: 4, fontFamily: "'JetBrains Mono', monospace", margin: i > 0 ? "4px 0 0 0" : 0 }}>
                  {i + 1}. {s.thought}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <Card color={P.teal}>
        <Label color={P.teal}>WHY CoT WORKS</Label>
        <Body>When a model "thinks out loud", each intermediate step provides context for the next step. It's like the difference between doing math in your head versus writing it down. Modern techniques include "Let's think step by step" prompting, Tree of Thought (exploring multiple reasoning paths), and internal reasoning (where models think before responding, like Claude's extended thinking).</Body>
      </Card>
    </div>
  );
}

/* ═══════════════════ CH 14: RAG & TOOLS ═══════════════════ */
function RAGChapter() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      title: "RAG", icon: "📚", color: P.accent,
      desc: "Retrieval-Augmented Generation lets an LLM search a knowledge base before answering. Instead of relying solely on training data, it retrieves relevant documents and uses them as context.",
      flow: ["User asks a question", "System searches a document database", "Relevant chunks are retrieved", "LLM reads chunks + question", "LLM generates an answer with citations"],
      benefit: "Reduces hallucinations, keeps knowledge up-to-date, and provides verifiable sources."
    },
    {
      title: "Tool Use", icon: "🔧", color: P.green,
      desc: "LLMs can be given access to external tools: calculators, web search, code execution, APIs, databases. The model decides when and how to use each tool.",
      flow: ["User asks: 'What's the weather?'", "LLM decides to call weather API", "API returns: 'Berlin, 18C, cloudy'", "LLM formats a natural response", "User sees: 'It's 18C and cloudy in Berlin'"],
      benefit: "Extends LLMs beyond text generation. They can take actions, access real-time data, and perform precise computations."
    },
    {
      title: "Agents", icon: "🤖", color: P.purple,
      desc: "AI agents combine LLMs with tools, memory, and planning. They can break down complex tasks into steps, execute them, observe results, and adjust their approach.",
      flow: ["User: 'Book me a flight to NYC'", "Agent plans: search flights, compare, book", "Calls flight search API", "Evaluates options against preferences", "Calls booking API, confirms with user"],
      benefit: "Enables multi-step autonomous workflows. Still an active research area with challenges around reliability and safety."
    },
  ];
  const tab = tabs[activeTab];

  return (
    <div>
      <Intro>LLMs on their own have limitations: they can't access current info, do precise math, or take actions. These techniques extend what's possible:</Intro>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActiveTab(i)}
            style={{ flex: 1, padding: "12px 8px", borderRadius: 10, background: activeTab === i ? `${t.color}22` : P.surface, border: `1px solid ${activeTab === i ? t.color : P.border}`, color: activeTab === i ? t.color : P.muted, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
            <span style={{ display: "block", fontSize: 20, marginBottom: 4 }}>{t.icon}</span>{t.title}
          </button>
        ))}
      </div>
      <div style={{ padding: 20, borderRadius: 12, background: P.surface, border: `1px solid ${tab.color}33`, marginBottom: 16 }}>
        <Body style={{ marginBottom: 16 }}>{tab.desc}</Body>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {tab.flow.map((step, i) => (
            <div key={i}>
              <div style={{ padding: "10px 14px", borderRadius: 8, background: `${tab.color}10`, border: `1px solid ${tab.color}22`, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: tab.color, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                <span style={{ color: P.text, fontSize: 13 }}>{step}</span>
              </div>
              {i < tab.flow.length - 1 && <div style={{ textAlign: "center", color: P.muted, fontSize: 12, padding: "1px 0" }}>↓</div>}
            </div>
          ))}
        </div>
      </div>
      <Card color={tab.color}>
        <Label color={tab.color}>KEY BENEFIT</Label>
        <Body>{tab.benefit}</Body>
      </Card>
    </div>
  );
}

/* ═══════════════════ CH 15: WRAP UP ═══════════════════ */
function WrapUpChapter() {
  const sections = [
    { title: "Foundation", color: P.accent, items: [
      { icon: "🔮", label: "Neural Networks", desc: "Layers of neurons with weights" },
      { icon: "🧩", label: "Tokens", desc: "Text split into processable chunks" },
      { icon: "📐", label: "Embeddings", desc: "Words as number vectors" },
    ]},
    { title: "Architecture", color: P.purple, items: [
      { icon: "⚡", label: "Transformers", desc: "Parallel attention-based architecture" },
      { icon: "👁", label: "Attention", desc: "Words focusing on relevant words" },
      { icon: "📦", label: "Context Window", desc: "The model's working memory" },
    ]},
    { title: "Generation", color: P.green, items: [
      { icon: "✍️", label: "Next-Token Prediction", desc: "One word at a time" },
      { icon: "🌡", label: "Temperature", desc: "Controlling randomness" },
      { icon: "🫧", label: "Hallucinations", desc: "Confident but wrong outputs" },
    ]},
    { title: "Making It Work", color: P.orange, items: [
      { icon: "🏋️", label: "Training Pipeline", desc: "Pre-training, fine-tuning, RLHF" },
      { icon: "🎯", label: "Prompt Engineering", desc: "Crafting effective inputs" },
      { icon: "🔗", label: "Chain of Thought", desc: "Step-by-step reasoning" },
      { icon: "🔧", label: "RAG, Tools, Agents", desc: "Extending beyond text" },
    ]},
  ];

  return (
    <div>
      <Intro>You've covered all the fundamental concepts. Here's how everything connects:</Intro>
      {sections.map((section, si) => (
        <div key={si} style={{ marginBottom: 16 }}>
          <h3 style={{ color: section.color, fontSize: 14, fontWeight: 700, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase", fontFamily: "'Outfit', sans-serif" }}>{section.title}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {section.items.map((item, i) => (
              <div key={i} style={{ padding: "12px 16px", borderRadius: 10, background: P.surface, border: `1px solid ${section.color}22`, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <span style={{ color: section.color, fontWeight: 600, fontSize: 14 }}>{item.label}</span>
                  <span style={{ color: P.muted, fontSize: 13, marginLeft: 8 }}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Card color={P.accent} style={{ background: `linear-gradient(135deg, ${P.accentDim}, #1a1535)` }}>
        <Label>CONGRATULATIONS!</Label>
        <Body style={{ fontSize: 15 }}>You now understand the core concepts behind every modern LLM, from GPT to Claude to Gemini. These aren't surface-level buzzwords anymore. You understand what's actually happening under the hood when you talk to an AI. Keep experimenting, stay curious, and remember: the best way to learn is to use these tools and push their limits.</Body>
      </Card>
    </div>
  );
}

/* ═══════════════════ MAIN APP ═══════════════════ */
const chapterMap = {
  intro: IntroChapter, neural: NeuralChapter, tokens: TokensChapter,
  embeddings: EmbeddingsChapter, transformer: TransformerChapter, attention: AttentionChapter,
  generation: GenerationChapter, temperature: TemperatureChapter, context: ContextChapter,
  training: TrainingChapter, hallucination: HallucinationChapter, prompting: PromptChapter,
  cot: CoTChapter, rag: RAGChapter, wrapup: WrapUpChapter,
};

export default function App() {
  const [current, setCurrent] = useState(0);
  const Chapter = chapterMap[CHAPTERS[current].id];
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [current]);

  const progress = ((current + 1) / CHAPTERS.length) * 100;

  return (
    <div ref={scrollRef} style={{ minHeight: "100vh", background: P.bg, color: P.text, fontFamily: "'Outfit', 'Segoe UI', sans-serif", overflowY: "auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: ${P.border}; border-radius: 3px; }
        input[type="range"] { height: 6px; }
      `}</style>

      {/* Progress bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: P.bg }}>
        <div style={{ height: 3, background: P.surface }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${P.accent}, ${P.purple})`, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: "20px 24px 0", borderBottom: `1px solid ${P.border}`, paddingBottom: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, background: `linear-gradient(135deg, ${P.accent}, ${P.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 4 }}>
          LLM Explorer
        </h1>
        <p style={{ color: P.muted, fontSize: 13 }}>Chapter {current + 1} of {CHAPTERS.length} &#x2022; {CHAPTERS[current].title}</p>
      </div>

      {/* Chapter Nav */}
      <div style={{ display: "flex", gap: 2, padding: "10px 24px", overflowX: "auto", borderBottom: `1px solid ${P.border}` }}>
        {CHAPTERS.map((ch, i) => (
          <button key={ch.id} onClick={() => setCurrent(i)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "6px 10px", borderRadius: 6, border: "none",
              background: current === i ? P.surfaceAlt : "transparent",
              color: current === i ? P.text : i < current ? P.accent : P.muted,
              cursor: "pointer", fontSize: 16, minWidth: 36,
              fontFamily: "'Outfit', sans-serif", transition: "all 0.2s",
            }}>
            <span>{ch.icon}</span>
          </button>
        ))}
      </div>

      {/* Title */}
      <div style={{ padding: "20px 24px 6px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: P.text, fontFamily: "'Outfit', sans-serif" }}>
          {CHAPTERS[current].icon} {CHAPTERS[current].title}
        </h2>
      </div>

      {/* Content */}
      <div style={{ padding: "8px 24px 24px" }}>
        <Chapter />
      </div>

      {/* Bottom Nav */}
      <div style={{ display: "flex", gap: 10, padding: "16px 24px 32px" }}>
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
          style={{ flex: 1, padding: "14px 0", borderRadius: 12, border: `1px solid ${P.border}`, background: P.surface, color: current === 0 ? P.muted : P.text, cursor: current === 0 ? "not-allowed" : "pointer", fontSize: 15, fontFamily: "'Outfit', sans-serif" }}>
          ← Previous
        </button>
        <button onClick={() => setCurrent(c => Math.min(CHAPTERS.length - 1, c + 1))} disabled={current >= CHAPTERS.length - 1}
          style={{ flex: 1, padding: "14px 0", borderRadius: 12, border: "none", background: current >= CHAPTERS.length - 1 ? P.surfaceAlt : `linear-gradient(135deg, ${P.accent}, ${P.purple})`, color: current >= CHAPTERS.length - 1 ? P.muted : "#fff", cursor: current >= CHAPTERS.length - 1 ? "not-allowed" : "pointer", fontSize: 15, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
          Next Chapter →
        </button>
      </div>
    </div>
  );
}
