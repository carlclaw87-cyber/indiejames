"use client";
import { useMemo, useState, useEffect } from "react";

const VIDEOS = [
  { id: "v1", title: "Count to 10 Song", channel: "Super Simple Songs", emoji: "🔢", ytid: "e0dJWfQHF8Y", tags: "counting|reinforce|milestone_count_10" },
  { id: "v2", title: "Five Little Ducks", channel: "Super Simple Songs", emoji: "🦆", ytid: "pZw9veQ76fo", tags: "counting|objects|milestone_one_to_one" },
  { id: "v3", title: "Ten in the Bed", channel: "Super Simple Songs", emoji: "🛏️", ytid: "TdDypyS_5zE", tags: "counting|sequence|milestone_count_down" },
  { id: "v4", title: "Count and Move", channel: "Jack Hartmann", emoji: "🦘", ytid: "0VLxWIHRD4E", tags: "counting|movement|milestone_count_20" },
  { id: "v5", title: "ABC Song", channel: "Super Simple Songs", emoji: "🔤", ytid: "75p-N9YKqNo", tags: "abcs|reinforce|milestone_abc_sequence" },
  { id: "v6", title: "Alphabet Chant", channel: "Super Simple Songs", emoji: "🎵", ytid: "ezmsrB59mj8", tags: "abcs|letter_id|milestone_letter_recognition" },
  { id: "v7", title: "Letter Sounds A to Z", channel: "Jack Hartmann", emoji: "🗣️", ytid: "1btvnID6Z_A", tags: "phonics|letter_sounds|milestone_letter_sounds" },
  { id: "v8", title: "Beginning Sounds Song", channel: "Jack Hartmann", emoji: "👂", ytid: "E6-7kY5W0mQ", tags: "phonics|beginning_sounds|milestone_beginning_sounds" },
  { id: "v9", title: "Rhyming Words for Kids", channel: "Jack Hartmann", emoji: "🎤", ytid: "3JZi2oDvPs4", tags: "phonics|rhyme|milestone_rhyming" },
  { id: "v10", title: "The Color Song", channel: "Super Simple Songs", emoji: "🎨", ytid: "zxIpA5nF_LY", tags: "colors|reinforce|milestone_color_naming" },
  { id: "v11", title: "I See Something Blue", channel: "Super Simple Songs", emoji: "🔵", ytid: "zA5oN2rQf6A", tags: "colors|recognition|milestone_color_confidence" },
  { id: "v12", title: "Rainbow Song", channel: "Super Simple Songs", emoji: "🌈", ytid: "uU5iOHfYJZM", tags: "colors|sequence|milestone_color_sequence" },
  { id: "v13", title: "AB Pattern Song", channel: "The Kiboomers", emoji: "🔷", ytid: "YkS1U5lfSRw", tags: "patterns|math|milestone_ab_patterns" },
  { id: "v14", title: "More and Less", channel: "Numberblocks", emoji: "⚖️", ytid: "J5M5i2n9KJ0", tags: "math|compare|milestone_more_less" },
  { id: "v15", title: "Shapes Song 2", channel: "KidsTV123", emoji: "🟡", ytid: "OEbRDtCAFdU", tags: "shapes|math|milestone_shape_names" },
  { id: "v16", title: "How Do Butterflies Grow?", channel: "SciShow Kids", emoji: "🦋", ytid: "O1S8WzwLPlM", tags: "science|life_cycle|milestone_why_questions" },
  { id: "v17", title: "How a Seed Grows", channel: "SciShow Kids", emoji: "🌱", ytid: "tkFPyue5X3Q", tags: "science|cause_effect|milestone_prediction" },
  { id: "v18", title: "Sink or Float for Kids", channel: "TheDadLab", emoji: "🛁", ytid: "6XfQfK6l8fQ", tags: "science|experiment|milestone_cause_effect" },
  { id: "v19", title: "Feelings Song", channel: "The Kiboomers", emoji: "😊", ytid: "UsISd1AMNYU", tags: "social_emotional|feelings|milestone_name_feelings" },
  { id: "v20", title: "Taking Turns Song", channel: "Super Simple Songs", emoji: "🤝", ytid: "gLJYx8Nh7pU", tags: "social_skills|turn_taking|milestone_sharing" },
  { id: "v21", title: "Kindness Song", channel: "Scratch Garden", emoji: "💛", ytid: "Y5Jf7N4k7m0", tags: "social_skills|empathy|milestone_perspective" },
  { id: "v22", title: "Community Helpers Song", channel: "The Kiboomers", emoji: "👷", ytid: "5Y8z4xP4Lk8", tags: "world|community|milestone_awareness" },
  { id: "v23", title: "Hello Around the World", channel: "Super Simple Songs", emoji: "🌍", ytid: "4n8-2Q4x2M8", tags: "world|culture|milestone_global_awareness" },
  { id: "v24", title: "Yoga for Kids", channel: "Cosmic Kids Yoga", emoji: "🧘", ytid: "R-BS87NTV5I", tags: "movement|regulation|milestone_body_control" },
  { id: "v25", title: "Freeze Dance", channel: "Jack Hartmann", emoji: "❄️", ytid: "2UcZWXvgMZE", tags: "movement|impulse_control|milestone_listening" },
  { id: "v26", title: "Head Shoulders Knees and Toes", channel: "Super Simple Songs", emoji: "🙋", ytid: "WX8HmogNyCY", tags: "movement|sequence|milestone_following_steps" }
];

const srcFor = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&controls=1&playsinline=1&modestbranding=1`;

export default function Page() {
  const [mode, setMode] = useState("parent");
  const [dur, setDur] = useState(30);
  const [left, setLeft] = useState(0);
  const [currentId, setCurrentId] = useState(VIDEOS[0].id);
  
  const current = useMemo(() => VIDEOS.find(v => v.id === currentId) || VIDEOS[0], [currentId]);
  const hasEmbed = !!current.ytid;

  useEffect(() => {
    if (mode !== "kid" || left <= 0) return;
    const t = setInterval(() => setLeft(v => v - 1), 1000);
    return () => clearInterval(t);
  }, [mode, left]);

  if (mode === "kid") {
    const progress = dur > 0 ? ((dur * 60 - left) / (dur * 60)) * 100 : 0;
    return (
      <main style={{ minHeight: "100vh", background: "linear-gradient(170deg,#1C1145,#2D1B4E,#3D2668)", color: "#fff", padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 14, opacity: 0.8 }}>⏱️ {Math.ceil(left / 60)} min left</div>
          <button onClick={() => setMode("parent")} style={{ background: "transparent", border: "1px solid #fff3", color: "#fff", padding: "6px 12px", borderRadius: 8, cursor: "pointer" }}>Parent</button>
        </div>
        <div style={{ height: 8, background: "#ffffff20", borderRadius: 99, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#36d399,#60a5fa)", transition: "width 1s linear" }} />
        </div>
        <div style={{ border: "2px solid #6B5CA580", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ aspectRatio: "16/9", display: "grid", placeItems: "center", background: "#111a33" }}>
            {hasEmbed ? (
              <iframe title={current.title} width="100%" height="100%" src={srcFor(current.ytid)} frameBorder="0" allow="autoplay; encrypted-media" />
            ) : (
              <div style={{ textAlign: "center", opacity: 0.85, padding: 16 }}>
                <div style={{ fontSize: 36 }}>{current.emoji}</div>
                <div style={{ marginTop: 6, fontWeight: 700 }}>{current.title}</div>
                <div style={{ marginTop: 4, fontSize: 12 }}>No embed ID yet</div>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginTop: 10, maxHeight: "48vh", overflowY: "auto", paddingRight: 4, display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 10 }}>
          {VIDEOS.map(v => {
            const active = v.id === current.id;
            return (
              <button key={v.id} onClick={() => setCurrentId(v.id)}
                style={{ textAlign: "left", borderRadius: 10, padding: 10,
                  border: active ? "2px solid #68D391" : "2px solid #ffffff2a",
                  background: active ? "#68D39122" : "#ffffff12", color: "#fff", cursor: "pointer" }}>
                <div style={{ fontWeight: 700 }}>{v.emoji} {v.title}</div>
                <div style={{ opacity: 0.7, fontSize: 11, marginTop: 4 }}>{v.channel}</div>
              </button>
            );
          })}
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(170deg,#1C1145,#2D1B4E,#3D2668)", color: "#fff", padding: 14 }}>
      <h1 style={{ marginTop: 0 }}>🌱 Indie Curator — Parent Dashboard</h1>
      <div style={{ background: "#ffffff10", borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <label style={{ marginRight: 12 }}>Duration (min):</label>
        <select value={dur} onChange={e => setDur(Number(e.target.value))} style={{ padding: "8px 12px", borderRadius: 8, border: "none", fontSize: 16 }}>
          <option value={20}>20 min</option>
          <option value={30}>30 min</option>
          <option value={45}>45 min</option>
          <option value={60}>60 min</option>
        </select>
      </div>
      <button onClick={() => { setLeft(dur * 60); setMode("kid"); }} style={{ background: "#68D391", color: "#1C1145", fontWeight: 700, padding: "14px 28px", borderRadius: 12, border: "none", fontSize: 18, cursor: "pointer" }}>
        ▶️ Publish to Kid Mode
      </button>
      <div style={{ marginTop: 20, opacity: 0.7, fontSize: 13 }}>
        {VIDEOS.length} videos in queue • Milestone-aligned content
      </div>
    </main>
  );
}
