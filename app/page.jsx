"use client";
import { useMemo, useState, useEffect } from "react";

const VIDEOS = [
  { id: "v1", title: "Count to 10 Song", channel: "Super Simple Songs", emoji: "🔢", ytid: "e0dJWfQHF8Y", duration: "3:12", views: "284M views", tags: "counting" },
  { id: "v2", title: "Five Little Ducks", channel: "Super Simple Songs", emoji: "🦆", ytid: "pZw9veQ76fo", duration: "2:58", views: "198M views", tags: "counting" },
  { id: "v3", title: "Ten in the Bed", channel: "Super Simple Songs", emoji: "🛏️", ytid: "TdDypyS_5zE", duration: "3:04", views: "142M views", tags: "counting" },
  { id: "v4", title: "Count and Move 1 to 20", channel: "Jack Hartmann", emoji: "🦘", ytid: "0VLxWIHRD4E", duration: "4:15", views: "62M views", tags: "counting" },
  { id: "v5", title: "ABC Song", channel: "Super Simple Songs", emoji: "🔤", ytid: "75p-N9YKqNo", duration: "3:01", views: "512M views", tags: "abcs" },
  { id: "v6", title: "Alphabet Chant", channel: "Super Simple Songs", emoji: "🎵", ytid: "ezmsrB59mj8", duration: "3:44", views: "89M views", tags: "abcs" },
  { id: "v7", title: "Letter Sounds A to Z", channel: "Jack Hartmann", emoji: "🗣️", ytid: "1btvnID6Z_A", duration: "5:22", views: "44M views", tags: "phonics" },
  { id: "v8", title: "Beginning Sounds Song", channel: "Jack Hartmann", emoji: "👂", ytid: "E6-7kY5W0mQ", duration: "4:08", views: "31M views", tags: "phonics" },
  { id: "v9", title: "Rhyming Words for Kids", channel: "Jack Hartmann", emoji: "🎤", ytid: "3JZi2oDvPs4", duration: "3:55", views: "28M views", tags: "phonics" },
  { id: "v10", title: "The Color Song", channel: "Super Simple Songs", emoji: "🎨", ytid: "zxIpA5nF_LY", duration: "2:47", views: "176M views", tags: "colors" },
  { id: "v11", title: "I See Something Blue", channel: "Super Simple Songs", emoji: "🔵", ytid: "zA5oN2rQf6A", duration: "3:10", views: "93M views", tags: "colors" },
  { id: "v12", title: "Rainbow Song", channel: "Super Simple Songs", emoji: "🌈", ytid: "uU5iOHfYJZM", duration: "3:33", views: "71M views", tags: "colors" },
  { id: "v13", title: "AB Pattern Song", channel: "The Kiboomers", emoji: "🔷", ytid: "YkS1U5lfSRw", duration: "3:48", views: "18M views", tags: "patterns" },
  { id: "v14", title: "More and Less", channel: "Numberblocks", emoji: "⚖️", ytid: "J5M5i2n9KJ0", duration: "5:14", views: "22M views", tags: "math" },
  { id: "v15", title: "Shapes Song 2", channel: "KidsTV123", emoji: "🟡", ytid: "OEbRDtCAFdU", duration: "4:02", views: "387M views", tags: "shapes" },
  { id: "v16", title: "How Do Butterflies Grow?", channel: "SciShow Kids", emoji: "🦋", ytid: "O1S8WzwLPlM", duration: "4:52", views: "9M views", tags: "science" },
  { id: "v17", title: "How a Seed Grows", channel: "SciShow Kids", emoji: "🌱", ytid: "tkFPyue5X3Q", duration: "4:38", views: "7M views", tags: "science" },
  { id: "v18", title: "Sink or Float for Kids", channel: "TheDadLab", emoji: "🛁", ytid: "6XfQfK6l8fQ", duration: "5:01", views: "11M views", tags: "science" },
  { id: "v19", title: "Feelings Song", channel: "The Kiboomers", emoji: "😊", ytid: "UsISd1AMNYU", duration: "3:28", views: "14M views", tags: "social" },
  { id: "v20", title: "Taking Turns Song", channel: "Super Simple Songs", emoji: "🤝", ytid: "gLJYx8Nh7pU", duration: "2:55", views: "41M views", tags: "social" },
  { id: "v21", title: "Kindness Song", channel: "Scratch Garden", emoji: "💛", ytid: "Y5Jf7N4k7m0", duration: "3:44", views: "8M views", tags: "social" },
  { id: "v22", title: "Community Helpers Song", channel: "The Kiboomers", emoji: "👷", ytid: "5Y8z4xP4Lk8", duration: "4:11", views: "12M views", tags: "world" },
  { id: "v23", title: "Hello Around the World", channel: "Super Simple Songs", emoji: "🌍", ytid: "4n8-2Q4x2M8", duration: "3:02", views: "33M views", tags: "world" },
  { id: "v24", title: "Yoga for Kids", channel: "Cosmic Kids Yoga", emoji: "🧘", ytid: "R-BS87NTV5I", duration: "7:15", views: "19M views", tags: "movement" },
  { id: "v25", title: "Freeze Dance", channel: "Jack Hartmann", emoji: "❄️", ytid: "2UcZWXvgMZE", duration: "3:58", views: "24M views", tags: "movement" },
  { id: "v26", title: "Head Shoulders Knees and Toes", channel: "Super Simple Songs", emoji: "🙋", ytid: "WX8HmogNyCY", duration: "2:44", views: "441M views", tags: "movement" }
];

const thumbFor = (ytid) => `https://i.ytimg.com/vi/${ytid}/mqdefault.jpg`;
const srcFor = (ytid) =>
  `https://www.youtube-nocookie.com/embed/${ytid}?autoplay=1&rel=0&controls=1&playsinline=1&modestbranding=1`;

const TAGS = ["All", "counting", "abcs", "phonics", "colors", "math", "shapes", "science", "social", "world", "movement", "patterns"];

export default function Page() {
  const [currentId, setCurrentId] = useState(VIDEOS[0].id);
  const [filter, setFilter] = useState("All");
  const current = useMemo(() => VIDEOS.find(v => v.id === currentId) || VIDEOS[0], [currentId]);
  const filtered = useMemo(() => filter === "All" ? VIDEOS : VIDEOS.filter(v => v.tags === filter), [filter]);

  return (
    <div style={{ background: "#0f0f0f", minHeight: "100vh", color: "#fff", fontFamily: "Roboto, Arial, sans-serif" }}>

      {/* Top Nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "#0f0f0f", borderBottom: "1px solid #272727", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22 }}>🌱</span>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.5px" }}>IndieTube</span>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 8, padding: "10px 16px", overflowX: "auto", scrollbarWidth: "none" }}>
        {TAGS.map(tag => (
          <button key={tag} onClick={() => setFilter(tag)}
            style={{ flexShrink: 0, padding: "6px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500,
              background: filter === tag ? "#fff" : "#272727",
              color: filter === tag ? "#0f0f0f" : "#fff" }}>
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div style={{ display: "flex", gap: 0, maxWidth: 1400, margin: "0 auto", padding: "0 16px 24px" }}>

        {/* Player + info column */}
        <div style={{ flex: "1 1 0", minWidth: 0, marginRight: 24 }}>
          {/* Player */}
          <div style={{ background: "#000", borderRadius: 12, overflow: "hidden", aspectRatio: "16/9" }}>
            {current.ytid ? (
              <iframe title={current.title} width="100%" height="100%"
                src={srcFor(current.ytid)} frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen
                style={{ display: "block" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <span style={{ fontSize: 48 }}>{current.emoji}</span>
                <span style={{ opacity: 0.6, fontSize: 14 }}>No embed ID yet</span>
              </div>
            )}
          </div>

          {/* Video info */}
          <div style={{ marginTop: 12 }}>
            <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>{current.title}</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#ff0000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                  {current.emoji}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{current.channel}</div>
                  <div style={{ color: "#aaa", fontSize: 12 }}>{current.views}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#272727", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 20, cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
                  👍 Like
                </button>
                <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#272727", border: "none", color: "#fff", padding: "8px 16px", borderRadius: 20, cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
                  ➕ Save
                </button>
              </div>
            </div>
            <div style={{ marginTop: 12, background: "#272727", borderRadius: 12, padding: "10px 14px", fontSize: 13, color: "#aaa" }}>
              <span style={{ color: "#fff", fontWeight: 500 }}>{current.duration} • </span>
              {current.views} • #{current.tags} • milestone-aligned content for early learners
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: 400, flexShrink: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#aaa" }}>Up Next</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map(v => {
              const active = v.id === current.id;
              return (
                <button key={v.id} onClick={() => setCurrentId(v.id)}
                  style={{ display: "flex", gap: 8, background: active ? "#272727" : "transparent",
                    border: active ? "1px solid #3ea6ff33" : "1px solid transparent",
                    borderRadius: 8, padding: 6, cursor: "pointer", textAlign: "left", color: "#fff", width: "100%" }}>
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    {v.ytid ? (
                      <img src={thumbFor(v.ytid)} alt={v.title} width={168} height={94}
                        style={{ borderRadius: 8, display: "block", objectFit: "cover", background: "#1a1a1a" }} />
                    ) : (
                      <div style={{ width: 168, height: 94, background: "#1a1a1a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{v.emoji}</div>
                    )}
                    <div style={{ position: "absolute", bottom: 4, right: 4, background: "rgba(0,0,0,0.8)", borderRadius: 3, padding: "1px 4px", fontSize: 11, fontWeight: 600 }}>
                      {v.duration}
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.3, marginBottom: 4,
                      overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {v.title}
                    </div>
                    <div style={{ color: "#aaa", fontSize: 12 }}>{v.channel}</div>
                    <div style={{ color: "#aaa", fontSize: 12 }}>{v.views}</div>
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
