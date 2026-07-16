"use client";

import { useEffect, useRef } from "react";

/* Very subtle full-page particle flow — same language as hero, much lower opacity */

const COUNT = 180;

interface P { x:number; y:number; vx:number; vy:number; life:number; maxLife:number; size:number; hue:number; }

function spawn(W:number,H:number):P {
  return { x:Math.random()*W, y:Math.random()*H, vx:0, vy:0, life:0,
    maxLife:160+Math.random()*220, size:0.6+Math.random()*1.0, hue:220+Math.random()*80 };
}

export default function PageBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const c = ref.current; if(!c) return;
    const ctx = c.getContext("2d")!; if(!ctx) return;
    let ps:P[]=[], W=0, H=0, t=0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio||1,2);
      W = c!.offsetWidth; H = c!.offsetHeight;
      c!.width=W*dpr; c!.height=H*dpr;
      ctx.scale(dpr,dpr);
      ps = Array.from({length:COUNT},()=>{ const p=spawn(W,H); p.life=Math.random()*p.maxLife; return p; });
    }

    function angle(x:number,y:number):number {
      const nx=x/W, ny=y/H;
      return Math.sin(nx*3.5+t*0.28)*Math.cos(ny*2.8+t*0.22)*Math.PI*2
           + Math.cos(nx*2.2-t*0.15)*Math.sin(ny*3.1+t*0.25)*Math.PI;
    }

    function tick() {
      t+=0.005;
      ctx.fillStyle="rgba(0,0,0,0.04)";
      ctx.fillRect(0,0,W,H);
      for(const p of ps) {
        p.life++;
        if(p.life>p.maxLife){Object.assign(p,spawn(W,H));continue;}
        const a=angle(p.x,p.y), spd=0.7;
        p.vx=p.vx*0.9+Math.cos(a)*spd*0.1;
        p.vy=p.vy*0.9+Math.sin(a)*spd*0.1;
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<-2)p.x=W+2; if(p.x>W+2)p.x=-2;
        if(p.y<-2)p.y=H+2; if(p.y>H+2)p.y=-2;
        const pct=p.life/p.maxLife;
        const fade=pct<0.1?pct/0.1:pct>0.82?1-(pct-0.82)/0.18:1;
        ctx.save();
        ctx.globalAlpha=fade*0.22;
        ctx.fillStyle=`hsl(${p.hue},70%,68%)`;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
        ctx.restore();
      }
      raf.current=requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize",resize,{passive:true});
    raf.current=requestAnimationFrame(tick);
    return ()=>{ cancelAnimationFrame(raf.current); window.removeEventListener("resize",resize); };
  },[]);

  return (
    <canvas
      ref={ref}
      style={{ position:"fixed", inset:0, width:"100%", height:"100%",
               pointerEvents:"none", zIndex:0, opacity:1 }}
    />
  );
}
