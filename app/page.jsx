"use client";
import { useState } from "react";

const videos = [
  { id: 1, title: "Count to 10", ytid: "XqZsoesa55w", emoji: "🔢" },
  { id: 2, title: "ABC Song", ytid: "75p-N9YKqNo", emoji: "🔤" },
  { id: 3, title: "Colors Song", ytid: "ybt2jhCQ3lA", emoji: "🌈" },
  { id: 4, title: "Rhyming", ytid: "3JZi2oDvPs4", emoji: "🎤" }
];

const srcFor = (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&controls=1&playsinline=1`;

export default function HomePage() {
  const [current, setCurrent] = useState(videos[0]);
  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(170deg,#1C1145,#2D1B4E,#3D2668)", color: "#fff", padding: 14 }}>
      <h1 style={{ marginTop: 0 }}>🌱 Indie Curator</h1>
      <div style={{ position: "sticky", top: 0, background: "linear-gradient(170deg,#1C1145,#2D1B4E,#3D2668)", paddingBottom: 10 }}>
        <div style={{ border: "2px solid #6B5CA580", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ aspectRatio: "16/9" }}>
            <iframe title={current.title} width="100%" height="100%" src={srcFor(current.ytid)} frameBorder="0" allow="autoplay; encrypted-media" />
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 10, marginTop: 10 }}>
        {videos.map((v) => (
          <button key={v.id} onClick={() => setCurrent(v)} style={{ textAlign: "left", borderRadius: 10, padding: 10, border: current.id===v.id ? "2px solid #68D391" : "2px solid #ffffff2a", background: current.id===v.id ? "#68D39122" : "#ffffff12", color: "#fff" }}>
            <div style={{ fontWeight: 700 }}>{v.emoji} {v.title}</div>
          </button>
        ))}
      </div>
    </main>
  );
}
