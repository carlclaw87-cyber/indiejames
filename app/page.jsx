"use client";
import { useEffect, useState } from "react";
const vids=[{id:1,t:"Count",y:"XqZsoesa55w"},{id:2,t:"ABC",y:"75p-N9YKqNo"}];
const src=(id)=>`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&controls=1&playsinline=1`;
export default function Page(){
 const [mode,setMode]=useState("parent");
 const [dur,setDur]=useState(30);const [left,setLeft]=useState(0);const [cur,setCur]=useState(vids[0]);
 useEffect(()=>{ if(mode!=="kid"||left<=0)return; const t=setInterval(()=>setLeft(v=>v-1),1000); return ()=>clearInterval(t);},[mode,left]);
 if(mode==="kid") return <main style={{padding:14,color:"#fff",background:"#0b1020",minHeight:"100vh"}}><h1>Kid Mode</h1><div>{Math.ceil(left/60)} min left</div><div style={{height:8,background:"#233",borderRadius:99}}><div style={{height:"100%",width:`${(left/(dur*60))*100}%`,background:"#34d399"}}/></div><div style={{aspectRatio:"16/9",marginTop:10}}><iframe title={cur.t} width="100%" height="100%" src={src(cur.y)} frameBorder="0" allow="autoplay; encrypted-media"/></div><button onClick={()=>setMode("parent")}>Parent</button>{vids.map(v=><button key={v.id} onClick={()=>setCur(v)}>{v.t}</button>)}</main>;
 return <main style={{padding:14,color:"#fff",background:"#0b1020",minHeight:"100vh"}}><h1>Parent Dashboard</h1><label>Duration <select value={dur} onChange={e=>setDur(Number(e.target.value))}><option>20</option><option>30</option><option>45</option></select></label><button onClick={()=>{setLeft(dur*60);setMode("kid");}}>Publish to Kid Mode</button></main>;
}
