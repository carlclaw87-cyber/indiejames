export default function HomePage() {
return (
<main style={{
minHeight: "100vh",
display: "flex",
alignItems: "center",
justifyContent: "center",
flexDirection: "column",
gap: "12px",
fontFamily: "Inter, system-ui, sans-serif",
background: "linear-gradient(170deg,#FFFBF5 0%,#FFF5EC 35%,#F5F0FF 70%,#EEF5FF 100%)"
}}><h1 style={{ margin: 0 }}>🌱 IndieJames</h1>
<p style={{ margin: 0, opacity: 0.8 }}>Curator app foundation is live.</p>
</main>
);
}
