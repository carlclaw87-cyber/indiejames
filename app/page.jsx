"use client";
import { useMemo, useState, useEffect, useRef } from "react";

const VIDEOS = [
  { id: "v1",  title: "Count to 10 Song",                 channel: "Super Simple Songs",  emoji: "🔢", ytid: "e0dJWfQHF8Y", duration: "3:12", tags: "counting" },
  { id: "v2",  title: "Five Little Ducks",                channel: "Super Simple Songs",  emoji: "🦆", ytid: "pZw9veQ76fo", duration: "2:58", tags: "counting" },
  { id: "v3",  title: "Ten in the Bed",                   channel: "Super Simple Songs",  emoji: "🛏️", ytid: "TdDypyS_5zE", duration: "3:04", tags: "counting" },
  { id: "v4",  title: "Count and Move 1 to 20",           channel: "Dream English Kids",  emoji: "🦘", ytid: "0VLxWIHRD4E", duration: "4:15", tags: "counting" },
  { id: "v5",  title: "The ABC Song",                     channel: "KidsTV123",           emoji: "🔤", ytid: "75p-N9YKqNo", duration: "3:01", tags: "abcs" },
  { id: "v6",  title: "ABC Song Nursery Rhymes",          channel: "Mega Fun Kids Songs", emoji: "🎵", ytid: "ezmsrB59mj8", duration: "3:44", tags: "abcs" },
  { id: "v7",  title: "Phonics Song A-Z",                 channel: "Patty Shukla",        emoji: "🗣️", ytid: "1btvnID6Z_A", duration: "5:22", tags: "phonics" },
  { id: "v8",  title: "Rhyming Words for Kids",           channel: "Jack Hartmann",       emoji: "🎤", ytid: "3JZi2oDvPs4", duration: "3:55", tags: "phonics" },
  { id: "v9",  title: "What's Your Favorite Color?",      channel: "Super Simple Songs",  emoji: "🎨", ytid: "zxIpA5nF_LY", duration: "2:47", tags: "colors" },
  { id: "v10", title: "Colors Vocabulary Song",           channel: "English Singsing",    emoji: "🔵", ytid: "ybt2jhCQ3lA", duration: "3:10", tags: "colors" },
  { id: "v11", title: "Shapes Song for Kids",             channel: "The Singing Walrus",  emoji: "🟡", ytid: "OEbRDtCAFdU", duration: "4:02", tags: "shapes" },
  { id: "v12", title: "Big Numbers Song",                 channel: "KidsTV123",           emoji: "🔢", ytid: "e0dJWfQHF8Y", duration: "3:12", tags: "math" },
  { id: "v13", title: "From Caterpillar to Butterfly",    channel: "It's AumSum Time",    emoji: "🦋", ytid: "O1S8WzwLPlM", duration: "4:52", tags: "science" },
  { id: "v14", title: "How a Seed Grows",                 channel: "SciShow Kids",        emoji: "🌱", ytid: "tkFPyue5X3Q", duration: "4:38", tags: "science" },
  { id: "v15", title: "The Feelings Song",                channel: "KidsTV123",           emoji: "😊", ytid: "UsISd1AMNYU", duration: "3:28", tags: "social" },
  { id: "v16", title: "Old MacDonald Had a Farm",         channel: "Super Simple Songs",  emoji: "🐄", ytid: "_6HzoUcx3eo", duration: "3:44", tags: "social" },
  { id: "v17", title: "Twinkle Twinkle Little Star",      channel: "Super Simple Songs",  emoji: "⭐", ytid: "yCjJyiqpAuU", duration: "3:02", tags: "world" },
  { id: "v18", title: "Head Shoulders Knees & Toes",      channel: "ChuChu TV",           emoji: "🙋", ytid: "h4eueDYPTIg", duration: "2:55", tags: "movement" },
  { id: "v19", title: "Head Shoulders (Speeding Up)",     channel: "Super Simple Songs",  emoji: "🏃", ytid: "WX8HmogNyCY", duration: "2:44", tags: "movement" },
  { id: "v20", title: "Freeze Dance Party",               channel: "The Kiboomers",       emoji: "❄️", ytid: "2UcZWXvgMZE", duration: "3:48", tags: "movement" },
  { id: "v21", title: "Baby Shark Doo Doo Doo",           channel: "Baby Shark Official", emoji: "🦈", ytid: "M4NXs3uAMF8", duration: "30:00", tags: "movement" },
  { id: "v22", title: "Wheels on the Bus (Baby Shark)",   channel: "Baby Shark Official", emoji: "🚌", ytid: "pyVwLnS92tk", duration: "15:00", tags: "counting" },
  { id: "v23", title: "Hide and Seek — Baby Shark",       channel: "Baby Shark Official", emoji: "🔎", ytid: "rEt2DvIj4dw", duration: "10:00", tags: "social" },
  { id: "v24", title: "Ms Rachel — ABCs & Phonics",       channel: "Ms Rachel",           emoji: "👩‍🏫", ytid: "oVtzNpzuvoA", duration: "45:00", tags: "phonics" },
  { id: "v25", title: "Ms Rachel — Learn Colors & Talk",  channel: "Ms Rachel",           emoji: "🎨", ytid: "VvoO9-L1KA4", duration: "46:00", tags: "colors" },
  { id: "v26", title: "Ms Rachel — Songs & Milestones",   channel: "Ms Rachel",           emoji: "🌟", ytid: "h67AgK4EHq4", duration: "60:00", tags: "social" },
  { id: "v27", title: "Bluey Full Episode Compilation",   channel: "Bluey",               emoji: "🐕", ytid: "A0hzzMFm9Ng", duration: "60:00", tags: "social" },
  { id: "v28", title: "Bluey — Funny Moments",            channel: "Bluey",               emoji: "😂", ytid: "frIcCfpNRQs", duration: "30:00", tags: "social" },
  { id: "v29", title: "Bluey — Four in the Bed & More",   channel: "Bluey",               emoji: "🛏️", ytid: "Y6pa9ed1Fb0", duration: "30:00", tags: "counting" },
];

const thumbFor = ytid => `https://i.ytimg.com/vi/${ytid}/mqdefault.jpg`;
const srcFor   = ytid =>
  `https://www.youtube-nocookie.com/embed/${ytid}?autoplay=1&rel=0&controls=1&playsinline=1&modestbranding=1&enablejsapi=1`;

const TAGS = ["All","counting","abcs","phonics","colors","math","shapes","science","social","world","movement"];
const PARENT_PIN = "1234";

export default function Page() {
  const [currentId,    setCurrentId]   = useState(VIDEOS[0].id);
  const [filter,       setFilter]      = useState("All");
  const [showParent,   setShowParent]  = useState(false);
  const [pinInput,     setPinInput]    = useState("");
  const [pinError,     setPinError]    = useState(false);
  const [showPinModal, setShowPinModal]= useState(false);
  const [dur,          setDur]         = useState(30);
  const [kidMode,      setKidMode]     = useState(false);
  const [timeLeft,     setTimeLeft]    = useState(0);

  const filteredRef  = useRef([]);
  const currentIdRef = useRef(currentId);

  const current  = useMemo(() => VIDEOS.find(v => v.id === currentId) || VIDEOS[0], [currentId]);
  const filtered = useMemo(() =>
    filter === "All" ? VIDEOS : VIDEOS.filter(v => v.tags === filter),
  [filter]);

  // keep refs fresh for event handlers
  useEffect(() => { currentIdRef.current = currentId; }, [currentId]);
  useEffect(() => { filteredRef.current  = filtered;  }, [filtered]);

  // countdown timer
  useEffect(() => {
    if (!kidMode || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(v => v - 1), 1000);
    return () => clearInterval(t);
  }, [kidMode, timeLeft]);

  // auto-advance when YouTube fires playerState=0 (ended)
  useEffect(() => {
    function onMsg(e) {
      try {
        const d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (d?.event === "infoDelivery" && d?.info?.playerState === 0) {
          const list = filteredRef.current;
          const idx  = list.findIndex(v => v.id === currentIdRef.current);
          const next = list[(idx + 1) % list.length];
          if (next) setCurrentId(next.id);
        }
      } catch {}
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  function tryPin() {
    if (pinInput === PARENT_PIN) {
      setShowParent(true); setShowPinModal(false); setPinInput(""); setPinError(false);
    } else {
      setPinError(true); setPinInput("");
    }
  }

  // ── Parent dashboard ──────────────────────────────────────────────────────
  if (showParent) {
    return (
      <div style={{ background: "#0f0f0f", minHeight: "100vh", color: "#fff",
        fontFamily: "Roboto, Arial, sans-serif", padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🌱</span>
            <span style={{ fontWeight: 700, fontSize: 20 }}>IndieTube — Parent</span>
          </div>
          <button onClick={() => setShowParent(false)}
            style={{ background: "#272727", border: "none", color: "#fff",
              padding: "8px 16px", borderRadius: 20, cursor: "pointer", fontSize: 14 }}>
            ← Back
          </button>
        </div>
        <div style={{ background: "#1a1a1a", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 16 }}>⏱️ Session Duration</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[20, 30, 45, 60].map(d => (
              <button key={d} onClick={() => setDur(d)}
                style={{ padding: "10px 20px", borderRadius: 20, border: "none",
                  cursor: "pointer", fontWeight: 600, fontSize: 14,
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
          <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 16 }}>🎬 Queue ({VIDEOS.length} videos)</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 10, marginTop: 12 }}>
            {VIDEOS.map(v => (
              <div key={v.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10,
                borderRadius: 10, background: "#111", outline: "1px solid #333", color: "#fff" }}>
                <img src={thumbFor(v.ytid)} alt="" width={80} height={45}
                  style={{ borderRadius: 6, objectFit: "cover", flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{v.title}</div>
                  <div style={{ color: "#aaa", fontSize: 11, marginTop: 2 }}>{v.channel} • {v.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Kid-facing player ─────────────────────────────────────────────────────
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
            <div style={{ color: "#aaa", fontSize: 14, marginBottom: 20 }}>Enter your PIN</div>
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
                  background: "#333", color: "#fff", cursor: "pointer" }}>Cancel</button>
              <button onClick={tryPin}
                style={{ flex: 1, padding: 12, borderRadius: 10, border: "none",
                  background: "#ff0000", color: "#fff", cursor: "pointer", fontWeight: 700 }}>Unlock</button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky top nav + timer */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "#0f0f0f",
        borderBottom: "1px solid #272727", padding: "10px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: kidMode ? 8 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 22 }}>🌱</span>
            <span style={{ fontWeight: 700, fontSize: 18 }}>IndieTube</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {kidMode && (
              <span style={{ fontSize: 13, color: "#34d399", fontWeight: 600 }}>
                ⏱️ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </span>
            )}
            <button onClick={() => setShowPinModal(true)}
              style={{ background: "transparent", border: "1px solid #333", color: "#aaa",
                padding: "6px 12px", borderRadius: 20, cursor: "pointer", fontSize: 13 }}>🔒</button>
          </div>
        </div>
        {kidMode && (
          <div style={{ height: 4, background: "#272727", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(timeLeft / (dur * 60)) * 100}%`,
              background: "linear-gradient(90deg,#34d399,#60a5fa)", transition: "width 1s linear" }} />
          </div>
        )}
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 8, padding: "10px 16px",
        overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
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

      {/* Main layout: flex-wrap = stacks on portrait, side-by-side on landscape */}
      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 1400,
        margin: "0 auto", padding: "0 16px 80px", gap: 16 }}>

        {/* Player — sticky so it stays on screen */}
        <div style={{ flex: "1 1 300px", minWidth: 0, position: "sticky", top: 56, alignSelf: "flex-start" }}>
          <div style={{ position: "relative", background: "#000", borderRadius: 12,
            overflow: "hidden", aspectRatio: "16/9" }}>
            <iframe
              key={current.ytid}
              title={current.title}
              width="100%" height="100%"
              src={srcFor(current.ytid)}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ display: "block", width: "100%", height: "100%" }}
            />
            {/* Corner blockers — prevent "Watch on YouTube" tap */}
            <div style={{ position:"absolute",top:0,   left:0,  width:"20%",height:"18%",zIndex:10 }} />
            <div style={{ position:"absolute",top:0,   right:0, width:"20%",height:"18%",zIndex:10 }} />
            <div style={{ position:"absolute",bottom:0,left:0,  width:"20%",height:"18%",zIndex:10 }} />
            <div style={{ position:"absolute",bottom:0,right:0, width:"35%",height:"18%",zIndex:10 }} />
          </div>
          <div style={{ marginTop: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{current.title}</div>
            <div style={{ color: "#aaa", fontSize: 13, marginTop: 4 }}>
              {current.channel} · {current.duration} · #{current.tags}
            </div>
          </div>
        </div>

        {/* Sidebar: fixed-height scroll box */}
        <div style={{ flex: "1 1 280px", minWidth: 0, maxWidth: 420 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#aaa" }}>
            Up Next — {filtered.length} videos
          </div>
          <div style={{
            height: "320px",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 8,
            boxSizing: "border-box",
            border: "1px solid #2a2a2a",
            borderRadius: 10,
          }}>
            {filtered.map(v => {
              const active = v.id === current.id;
              return (
                <button key={v.id} onClick={() => setCurrentId(v.id)}
                  style={{ display: "flex", gap: 8, flexShrink: 0,
                    background: active ? "#1f2f1f" : "transparent",
                    border: active ? "1px solid #34d399" : "1px solid transparent",
                    borderRadius: 8, padding: 6, cursor: "pointer",
                    textAlign: "left", color: "#fff", width: "100%" }}>
                  <div style={{ position: "relative", flexShrink: 0, width: 120 }}>
                    <img src={thumbFor(v.ytid)} alt=""
                      style={{ width: "100%", height: 68, borderRadius: 6,
                        objectFit: "cover", display: "block", background: "#222" }} />
                    <div style={{ position: "absolute", bottom: 3, right: 3,
                      background: "rgba(0,0,0,0.85)", borderRadius: 3,
                      padding: "1px 4px", fontSize: 10, fontWeight: 700 }}>
                      {v.duration}
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                    <div style={{ fontWeight: 600, fontSize: 12, lineHeight: 1.3,
                      overflow: "hidden", display: "-webkit-box",
                      WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {v.title}
                    </div>
                    <div style={{ color: "#aaa", fontSize: 11, marginTop: 3 }}>{v.channel}</div>
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
