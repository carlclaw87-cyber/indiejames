"use client";
import { useMemo, useState, useEffect, useRef } from "react";

const VIDEOS = [
  { id: "v1",  title: "Count to 10 Song",                  channel: "Super Simple Songs",   emoji: "🔢", ytid: "e0dJWfQHF8Y", duration: "3:12", tags: "counting" },
  { id: "v2",  title: "Five Little Ducks",                  channel: "Super Simple Songs",   emoji: "🦆", ytid: "pZw9veQ76fo", duration: "2:58", tags: "counting" },
  { id: "v3",  title: "Ten in the Bed",                     channel: "Super Simple Songs",   emoji: "🛏️", ytid: "TdDypyS_5zE", duration: "3:04", tags: "counting" },
  { id: "v4",  title: "Count and Move 1 to 20",             channel: "Dream English Kids",   emoji: "🦘", ytid: "0VLxWIHRD4E", duration: "4:15", tags: "counting" },
  { id: "v5",  title: "The ABC Song",                       channel: "KidsTV123",            emoji: "🔤", ytid: "75p-N9YKqNo", duration: "3:01", tags: "abcs" },
  { id: "v6",  title: "ABC Song Nursery Rhymes",            channel: "Mega Fun Kids Songs",  emoji: "🎵", ytid: "ezmsrB59mj8", duration: "3:44", tags: "abcs" },
  { id: "v7",  title: "Phonics Song A-Z",                   channel: "Patty Shukla",         emoji: "🗣️", ytid: "1btvnID6Z_A", duration: "5:22", tags: "phonics" },
  { id: "v8",  title: "Rhyming Words for Kids",             channel: "Jack Hartmann",        emoji: "🎤", ytid: "3JZi2oDvPs4", duration: "3:55", tags: "phonics" },
  { id: "v9",  title: "What's Your Favorite Color?",        channel: "Super Simple Songs",   emoji: "🎨", ytid: "zxIpA5nF_LY", duration: "2:47", tags: "colors" },
  { id: "v10", title: "Colors Vocabulary Song",             channel: "English Singsing",     emoji: "🔵", ytid: "ybt2jhCQ3lA", duration: "3:10", tags: "colors" },
  { id: "v11", title: "Shapes Song for Kids",               channel: "The Singing Walrus",   emoji: "🟡", ytid: "OEbRDtCAFdU", duration: "4:02", tags: "shapes" },
  { id: "v12", title: "Big Numbers Song",                   channel: "KidsTV123",            emoji: "🔢", ytid: "e0dJWfQHF8Y", duration: "3:12", tags: "math" },
  { id: "v13", title: "From Caterpillar to Butterfly",      channel: "It's AumSum Time",     emoji: "🦋", ytid: "O1S8WzwLPlM", duration: "4:52", tags: "science" },
  { id: "v14", title: "How a Seed Grows",                   channel: "SciShow Kids",         emoji: "🌱", ytid: "tkFPyue5X3Q", duration: "4:38", tags: "science" },
  { id: "v15", title: "The Feelings Song",                  channel: "KidsTV123",            emoji: "😊", ytid: "UsISd1AMNYU", duration: "3:28", tags: "social" },
  { id: "v16", title: "Old MacDonald Had a Farm",           channel: "Super Simple Songs",   emoji: "🐄", ytid: "_6HzoUcx3eo", duration: "3:44", tags: "social" },
  { id: "v17", title: "Twinkle Twinkle Little Star",        channel: "Super Simple Songs",   emoji: "⭐", ytid: "yCjJyiqpAuU", duration: "3:02", tags: "world" },
  { id: "v18", title: "Head Shoulders Knees & Toes",        channel: "ChuChu TV",            emoji: "🙋", ytid: "h4eueDYPTIg", duration: "2:55", tags: "movement" },
  { id: "v19", title: "Head Shoulders (Speeding Up)",       channel: "Super Simple Songs",   emoji: "🏃", ytid: "WX8HmogNyCY", duration: "2:44", tags: "movement" },
  { id: "v20", title: "Freeze Dance Party",                 channel: "The Kiboomers",        emoji: "❄️", ytid: "2UcZWXvgMZE", duration: "3:48", tags: "movement" },
  { id: "v21", title: "Baby Shark Doo Doo Doo 30 Min",      channel: "Baby Shark Official",  emoji: "🦈", ytid: "M4NXs3uAMF8", duration: "30:00", tags: "movement" },
  { id: "v22", title: "Wheels on the Bus — Baby Shark",     channel: "Baby Shark Official",  emoji: "🚌", ytid: "pyVwLnS92tk", duration: "15:00", tags: "counting" },
  { id: "v23", title: "Hide and Seek with Baby Shark",      channel: "Baby Shark Official",  emoji: "🌈", ytid: "rEt2DvIj4dw", duration: "10:00", tags: "social" },
  // Mrs. Rachel
  { id: "v24", title: "Learn with Ms Rachel — ABCs & Phonics",     channel: "Ms Rachel",   emoji: "👩‍🏫", ytid: "oVtzNpzuvoA", duration: "45:00", tags: "phonics" },
  { id: "v25", title: "Learn to Talk with Ms Rachel — Colors",     channel: "Ms Rachel",   emoji: "🎨", ytid: "VvoO9-L1KA4", duration: "46:00", tags: "colors" },
  { id: "v26", title: "Toddler Learning — Songs & Milestones",     channel: "Ms Rachel",   emoji: "🌟", ytid: "h67AgK4EHq4", duration: "60:00", tags: "social" },
  // Bluey
  { id: "v27", title: "Bluey Full Episode Compilation",            channel: "Bluey",        emoji: "🐕", ytid: "A0hzzMFm9Ng", duration: "60:00", tags: "social" },
  { id: "v28", title: "Bluey — Funny Moments Compilation",         channel: "Bluey",        emoji: "😂", ytid: "frIcCfpNRQs", duration: "30:00", tags: "social" },
  { id: "v29", title: "Bluey — Four in the Bed & Best Clips",      channel: "Bluey",        emoji: "🛏️", ytid: "Y6pa9ed1Fb0", duration: "30:00", tags: "counting" },
];

// ─── Embed availability checker ─────────────────────────────────────────────
// Loads each video in a hidden 1px iframe, listens for YouTube postMessage API.
// Errors 100/101/150 = embedding blocked → remove from queue automatically.
function useEmbedChecker(videos) {
  const [playable, setPlayable] = useState(null); // null = still checking

  useEffect(() => {
    if (typeof window === "undefined") return;

    const results = new Map();
    const winMap = new Map(); // contentWindow → ytid
    let done = 0;
    const total = videos.length;
    let finished = false;

    const container = document.createElement("div");
    container.style.cssText =
      "position:fixed;opacity:0;pointer-events:none;width:1px;height:1px;overflow:hidden;top:-100px;left:-100px";
    document.body.appendChild(container);

    function finish() {
      if (finished) return;
      finished = true;
      window.removeEventListener("message", onMsg);
      clearTimeout(globalTimeout);
      try { document.body.removeChild(container); } catch {}
      const set = new Set(
        videos.filter(v => results.get(v.ytid) !== false).map(v => v.id)
      );
      setPlayable(set);
    }

    function onMsg(e) {
      const ytid = winMap.get(e.source);
      if (!ytid || results.has(ytid)) return;
      try {
        const data = JSON.parse(e.data);
        if (data.event === "onReady") {
          results.set(ytid, true);
          done++;
        } else if (data.event === "onError") {
          // codes 100, 101, 150 = unavailable/embedding disabled
          results.set(ytid, false);
          done++;
        } else return;
        if (done === total) finish();
      } catch {}
    }

    window.addEventListener("message", onMsg);

    videos.forEach(v => {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${v.ytid}?enablejsapi=1&autoplay=0&mute=1`;
      iframe.allow = "autoplay";
      container.appendChild(iframe);
      // map contentWindow after append (available immediately in all modern browsers)
      if (iframe.contentWindow) winMap.set(iframe.contentWindow, v.ytid);
    });

    // Fallback: after 10 s, resolve with whatever we have (unresponded = assume ok)
    const globalTimeout = setTimeout(finish, 10000);

    return () => {
      finished = true;
      clearTimeout(globalTimeout);
      window.removeEventListener("message", onMsg);
      try { document.body.removeChild(container); } catch {}
    };
  }, []);

  return playable;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const thumbFor = ytid => `https://i.ytimg.com/vi/${ytid}/mqdefault.jpg`;
const srcFor   = ytid =>
  `https://www.youtube-nocookie.com/embed/${ytid}?autoplay=1&rel=0&controls=1&playsinline=1&modestbranding=1&enablejsapi=1&origin=${typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : ""}`;

const TAGS = ["All","counting","abcs","phonics","colors","math","shapes","science","social","world","movement"];
const PARENT_PIN = "1234";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const playable = useEmbedChecker(VIDEOS);
  const checking = playable === null;

  const [currentId,    setCurrentId]   = useState(VIDEOS[0].id);
  const [filter,       setFilter]      = useState("All");
  const [showParent,   setShowParent]  = useState(false);
  const [pinInput,     setPinInput]    = useState("");
  const [pinError,     setPinError]    = useState(false);
  const [showPinModal, setShowPinModal]= useState(false);
  const [dur,          setDur]         = useState(30);
  const [kidMode,      setKidMode]     = useState(false);
  const [timeLeft,     setTimeLeft]    = useState(0);
  const playerRef = useRef(null);
  const filteredRef = useRef([]);
  const currentIdRef = useRef(currentId);

  useEffect(() => {
    if (!kidMode || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(v => v - 1), 1000);
    return () => clearInterval(t);
  }, [kidMode, timeLeft]);

  // Keep refs in sync so postMessage handler can read latest values
  useEffect(() => { currentIdRef.current = currentId; }, [currentId]);
  useEffect(() => { filteredRef.current = filtered; }, [filtered]);

  // Auto-advance: listen for YouTube "video ended" postMessage and play next
  useEffect(() => {
    function onMsg(e) {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        // YouTube sends {event:"infoDelivery", info:{playerState:0}} when ended (state 0 = ended)
        if (data?.event === "infoDelivery" && data?.info?.playerState === 0) {
          const list = filteredRef.current;
          const idx = list.findIndex(v => v.id === currentIdRef.current);
          const next = list[idx + 1] || list[0]; // loop back to start
          if (next) setCurrentId(next.id);
        }
      } catch {}
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Only show videos that passed the embed check
  const available = useMemo(() =>
    checking ? VIDEOS : VIDEOS.filter(v => playable.has(v.id)),
  [checking, playable]);

  const current = useMemo(() =>
    available.find(v => v.id === currentId) || available[0] || VIDEOS[0],
  [available, currentId]);

  const filtered = useMemo(() => {
    const pool = filter === "All" ? available : available.filter(v => v.tags === filter);
    return pool;
  }, [filter, available]);

  function tryPin() {
    if (pinInput === PARENT_PIN) {
      setShowParent(true); setShowPinModal(false); setPinInput(""); setPinError(false);
    } else {
      setPinError(true); setPinInput("");
    }
  }

  // ── Parent dashboard ───────────────────────────────────────────────────────
  if (showParent) {
    return (
      <div style={{ background: "#0f0f0f", minHeight: "100vh", color: "#fff",
        fontFamily: "Roboto, Arial, sans-serif", padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🌱</span>
            <span style={{ fontWeight: 700, fontSize: 20 }}>IndieTube — Parent Dashboard</span>
          </div>
          <button onClick={() => setShowParent(false)}
            style={{ background: "#272727", border: "none", color: "#fff", padding: "8px 16px",
              borderRadius: 20, cursor: "pointer", fontSize: 14 }}>
            ← Back
          </button>
        </div>

        <div style={{ background: "#1a1a1a", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 16 }}>⏱️ Session Duration</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[20, 30, 45, 60].map(d => (
              <button key={d} onClick={() => setDur(d)}
                style={{ padding: "10px 20px", borderRadius: 20, border: "none", cursor: "pointer",
                  fontWeight: 600, fontSize: 14,
                  background: dur === d ? "#ff0000" : "#272727", color: "#fff" }}>
                {d} min
              </button>
            ))}
          </div>
          <button onClick={() => { setTimeLeft(dur * 60); setKidMode(true); setShowParent(false); }}
            style={{ marginTop: 16, background: "#34d399", color: "#0f0f0f", fontWeight: 700,
              padding: "12px 28px", borderRadius: 12, border: "none", fontSize: 16, cursor: "pointer" }}>
            ▶️ Start Kid Mode ({dur} min)
          </button>
        </div>

        <div style={{ background: "#1a1a1a", borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 16 }}>
            🎬 Verified Queue ({available.length} playable)
          </div>
          <div style={{ color: "#aaa", fontSize: 13, marginBottom: 16 }}>
            {checking ? "Checking embed availability…" : `${VIDEOS.length - available.length} video(s) auto-hidden (embed blocked)`}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 10 }}>
            {available.map(v => (
              <div key={v.id}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: 10,
                  borderRadius: 10, background: "#111", outline: "1px solid #333", color: "#fff" }}>
                <img src={thumbFor(v.ytid)} alt="" width={80} height={45}
                  style={{ borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{v.title}</div>
                  <div style={{ color: "#aaa", fontSize: 11, marginTop: 2 }}>{v.channel} • {v.duration}</div>
                </div>
                <div style={{ marginLeft: "auto", color: "#34d399", fontSize: 14 }}>✅</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Kid-facing player ──────────────────────────────────────────────────────
  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh", color: "#fff",
      fontFamily: "Roboto, Arial, sans-serif" }}>

      {/* PIN modal */}
      {showPinModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#1a1a1a", borderRadius: 16, padding: 32, width: 300, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Parent Access</div>
            <div style={{ color: "#aaa", fontSize: 14, marginBottom: 20 }}>Enter your PIN to continue</div>
            <input type="password" value={pinInput}
              onChange={e => setPinInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && tryPin()}
              placeholder="PIN" maxLength={6}
              style={{ width: "100%", padding: 12, borderRadius: 10,
                border: pinError ? "2px solid #ff4444" : "2px solid #333",
                background: "#111", color: "#fff", fontSize: 20, textAlign: "center",
                outline: "none", boxSizing: "border-box" }} />
            {pinError && <div style={{ color: "#ff4444", fontSize: 13, marginTop: 8 }}>Incorrect PIN</div>}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button onClick={() => { setShowPinModal(false); setPinInput(""); setPinError(false); }}
                style={{ flex: 1, padding: 12, borderRadius: 10, border: "none",
                  background: "#333", color: "#fff", cursor: "pointer", fontSize: 14 }}>
                Cancel
              </button>
              <button onClick={tryPin}
                style={{ flex: 1, padding: 12, borderRadius: 10, border: "none",
                  background: "#ff0000", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top nav + timer */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "#0f0f0f",
        borderBottom: "1px solid #272727", padding: "10px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: kidMode ? 8 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 22 }}>🌱</span>
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.5px" }}>IndieTube</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {kidMode && (
              <span style={{ fontSize: 13, color: "#34d399", fontWeight: 600 }}>
                ⏱️ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")} left
              </span>
            )}
            {checking && (
              <span style={{ fontSize: 12, color: "#aaa" }}>Checking videos…</span>
            )}
            <button onClick={() => setShowPinModal(true)}
              style={{ background: "transparent", border: "1px solid #333", color: "#aaa",
                padding: "6px 12px", borderRadius: 20, cursor: "pointer", fontSize: 13 }}>
              🔒
            </button>
          </div>
        </div>
        {kidMode && (
          <div style={{ height: 4, background: "#272727", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%",
              width: `${(timeLeft / (dur * 60)) * 100}%`,
              background: "linear-gradient(90deg,#34d399,#60a5fa)",
              transition: "width 1s linear" }} />
          </div>
        )}
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 8, padding: "10px 16px",
        overflowX: "auto", scrollbarWidth: "none" }}>
        {TAGS.map(tag => (
          <button key={tag} onClick={() => setFilter(tag)}
            style={{ flexShrink: 0, padding: "6px 12px", borderRadius: 20, border: "none",
              cursor: "pointer", fontSize: 13, fontWeight: 500,
              background: filter === tag ? "#fff" : "#272727",
              color:      filter === tag ? "#0f0f0f" : "#fff" }}>
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
        ))}
      </div>

      {/* Main layout — flex-row on wide screens, flex-col on narrow (portrait mobile) */}
      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 1400, margin: "0 auto", padding: "0 16px 24px", gap: 16 }}>

        {/* Player column — sticky so it stays on screen while sidebar scrolls */}
        <div style={{ flex: "1 1 300px", minWidth: 0, position: "sticky", top: 56, alignSelf: "flex-start" }}>
          <div style={{ position: "relative", background: "#000", borderRadius: 12,
            overflow: "hidden", aspectRatio: "16/9" }}>
            {current?.ytid ? (
              <iframe title={current.title} width="100%" height="100%"
                src={srcFor(current.ytid)} frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen
                style={{ display: "block", width: "100%", height: "100%" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex",
                flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <span style={{ fontSize: 48 }}>{current?.emoji}</span>
                <span style={{ opacity: 0.6, fontSize: 14 }}>
                  {checking ? "Checking availability…" : "No playable videos in this category"}
                </span>
              </div>
            )}
            {/* Corner blockers — prevent "Watch on YouTube" click */}
            <div style={{ position:"absolute",top:0,   left:0,  width:"20%",height:"18%",zIndex:10 }} />
            <div style={{ position:"absolute",top:0,   right:0, width:"20%",height:"18%",zIndex:10 }} />
            <div style={{ position:"absolute",bottom:0,left:0,  width:"20%",height:"18%",zIndex:10 }} />
            <div style={{ position:"absolute",bottom:0,right:0, width:"35%",height:"18%",zIndex:10 }} />
          </div>

          {current && (
            <div style={{ marginTop: 12 }}>
              <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>
                {current.title}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#ff0000",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, flexShrink: 0 }}>
                  {current.emoji}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{current.channel}</div>
                  <div style={{ color: "#aaa", fontSize: 12 }}>{current.duration} • #{current.tags}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar — full width on portrait, fixed 360px on landscape/desktop */}
        <div style={{ flex: "1 1 300px", minWidth: 0, maxWidth: 400 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#aaa" }}>
            Up Next ({filtered.length})
          </div>
          <div style={{ height: 340, overflowY: "scroll", display: "flex", flexDirection: "column", gap: 8, paddingRight: 4, scrollbarWidth: "thin", scrollbarColor: "#444 transparent" }}>
            {filtered.map(v => {
              const active = v.id === current?.id;
              return (
                <button key={v.id} onClick={() => setCurrentId(v.id)}
                  style={{ display: "flex", gap: 8,
                    background: active ? "#272727" : "transparent",
                    border: active ? "1px solid #3ea6ff33" : "1px solid transparent",
                    borderRadius: 8, padding: 6, cursor: "pointer",
                    textAlign: "left", color: "#fff", width: "100%" }}>
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <img src={thumbFor(v.ytid)} alt={v.title} width={120} height={68}
                      style={{ borderRadius: 8, display: "block", objectFit: "cover", background: "#1a1a1a", width: "clamp(100px,30%,168px)", height: "auto" }} />
                    <div style={{ position: "absolute", bottom: 4, right: 4,
                      background: "rgba(0,0,0,0.8)", borderRadius: 3,
                      padding: "1px 4px", fontSize: 11, fontWeight: 600 }}>
                      {v.duration}
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.3, marginBottom: 4,
                      overflow: "hidden", display: "-webkit-box",
                      WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {v.title}
                    </div>
                    <div style={{ color: "#aaa", fontSize: 12 }}>{v.channel}</div>
                    <div style={{ color: "#aaa", fontSize: 12 }}>#{v.tags} • {v.duration}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
