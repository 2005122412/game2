/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { CassetteTape, Play, Pause, RotateCcw, Volume2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const LYRICS = [
  "曾经年少爱追梦",
  "一心只想往前飞",
  "行遍千山和万水",
  "一路走来不能回",
  "蓦然回首情已远",
  "身不由己在天边",
  "才明白爱恨情仇",
  "最伤最痛是离别",
  "给我一杯忘情水",
  "换我一生不流泪",
  "所有真心真意",
  "任它雨打风吹",
  "付出的爱收不回",
  "给我一杯忘情水",
  "换我一年不伤悲",
  "就算我可以再重来",
  "我也愿意再徘徊",
  "让那往事随风去",
  "再苦再累也无悔"
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const dragY = useMotionValue(0);
  const autoPullRef = useRef<any>(null);

  // Transform drag distance into reel rotation and tape reveal
  const reelRotate = useTransform(dragY, [0, 2000], [0, 720]);
  const opacity = useTransform(dragY, [0, 50], [0, 1]);
  const scale = useTransform(dragY, [0, 500], [1, 1.05]);
  const tapeGlow = useTransform(dragY, [0, 1000], ["rgba(119, 141, 169, 0)", "rgba(119, 141, 169, 0.2)"]);

  // Auto-pull effect when "playing"
  useEffect(() => {
    if (isPlaying) {
      autoPullRef.current = animate(dragY, 2000, {
        duration: 40,
        ease: "linear",
        onComplete: () => setIsPlaying(false)
      });
    } else {
      autoPullRef.current?.stop();
    }
    return () => autoPullRef.current?.stop();
  }, [isPlaying, dragY]);

  const handleReset = () => {
    setIsPlaying(false);
    animate(dragY, 0, { type: "spring", bounce: 0.2, duration: 1 });
  };

  return (
    <div className="min-h-screen bg-[#111827] text-[#e2e8f0] flex flex-col items-center justify-center p-4 font-sans overflow-hidden selection:bg-[#334155] selection:text-white">
      {/* Cinematic Background Layer */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#1e293b] blur-[150px] opacity-20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#334155] blur-[150px] opacity-10" />
      </div>

      <header className="mb-16 text-center relative z-20">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-block"
        >
          <h1 className="text-4xl md:text-5xl font-light tracking-[0.3em] mb-4 text-[#94a3b8]" id="page-title">
            ANDY LAU <span className="font-bold text-[#f8fafc]">1994</span>
          </h1>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#475569] to-transparent opacity-50 mb-3" />
        </motion.div>
      </header>

      <main className="relative flex flex-col items-center z-20 w-full max-w-2xl px-4">
        <div className="relative w-full max-w-md aspect-[1.5/1]">
          {/* Cassette Body Layer */}
          <motion.div 
            style={{ scale }}
            className="absolute inset-0 bg-[#1e293b] border-4 border-[#0f172a] rounded-[18px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col z-30"
          >
            {/* Decoration Screws */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-[#0f172a] rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]" />
            <div className="absolute top-4 right-4 w-3 h-3 bg-[#0f172a] rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]" />
            <div className="absolute bottom-4 left-4 w-3 h-3 bg-[#0f172a] rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]" />
            <div className="absolute bottom-4 right-4 w-3 h-3 bg-[#0f172a] rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]" />

            {/* Label Design */}
            <div className="h-[52%] bg-[#334155] m-7 rounded-xl flex flex-col justify-between p-5 border border-[#475569] relative overflow-hidden group">
              <div className="flex justify-between items-start relative z-10 border-b-2 border-[#1e293b] pb-2">
                <span className="text-2xl font-bold text-[#f8fafc] italic tracking-wider">忘情水</span>
                <span className="text-2xl font-black text-[#94a3b8] leading-none">A</span>
              </div>

              {/* Reel Hubs integrated into Label */}
              <div className="flex justify-center gap-12 relative z-10">
                <motion.div style={{ rotate: reelRotate }} className="w-16 h-16 rounded-full border-4 border-dashed border-[#475569] bg-[#0f172a] flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full border-2 border-[#64748b] bg-[#1e293b]" />
                </motion.div>
                <motion.div style={{ rotate: reelRotate }} className="w-16 h-16 rounded-full border-4 border-dashed border-[#475569] bg-[#0f172a] flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full border-2 border-[#64748b] bg-[#1e293b]" />
                </motion.div>
              </div>

              <div className="flex justify-between items-end relative z-10">
                <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Warner Music Hong Kong / 刘德华</span>
              </div>
            </div>

            {/* View Window */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[180px] h-12 bg-[#0f172a]/80 border-[3px] border-[#0f172a] rounded-lg flex items-center justify-center">
               <span className="text-[8px] text-[#475569] font-bold tracking-[0.2em]">TYPE I - NORMAL BIAS</span>
            </div>
          </motion.div>

          {/* Draggable Tape Strip */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center z-10 pointer-events-none translate-y-2">
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 2500 }}
              dragElastic={0.05}
              style={{ y: dragY, backgroundColor: "#1a1a1a", boxShadow: tapeGlow }}
              className="w-12 pointer-events-auto cursor-ns-resize flex flex-col items-center py-6 origin-top min-h-[50px] border-x border-white/5 border-b border-white/10"
              id="magnetic-tape"
            >
              {/* Lyrics - Re-styled for Elegant Dark */}
              <div className="flex flex-col gap-20 whitespace-nowrap pt-32 pb-40">
                {LYRICS.map((line, i) => (
                  <motion.div 
                    key={i}
                    style={{ opacity }}
                    className="rotate-90 origin-center py-4"
                  >
                    <span className="text-[14px] font-bold text-[#d97706] tracking-[0.2em] font-mono select-none">
                      {line}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Interaction Visual Prompt */}
          <motion.div 
             animate={{ opacity: [0.3, 0.6, 0.3] }}
             transition={{ repeat: Infinity, duration: 3 }}
             className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-[#475569] text-[10px] font-bold tracking-[0.2em] flex flex-col items-center gap-2 pointer-events-none"
             style={{ opacity: useTransform(dragY, [0, 100], [1, 0]) }}
          >
            <span>↓ DRAG TO PULL TAPE ↓</span>
          </motion.div>
        </div>

        {/* Media Controls */}
        <div className="mt-28 flex items-center gap-10 relative z-40 bg-[#1e293b] px-10 py-6 rounded-full shadow-2xl border border-[#0f172a]">
          <motion.button 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
             onClick={handleReset}
             className="text-[#64748b] hover:text-[#60a5fa] transition-colors"
          >
            <RotateCcw size={28} />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 rounded-full bg-[#0f172a] shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)] border-2 border-[#475569] flex items-center justify-center text-[#60a5fa] hover:border-[#60a5fa] transition-all"
          >
            {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-2" />}
          </motion.button>
          
          <div className="flex flex-col gap-2 items-center px-2">
             <div className="w-24 h-1.5 bg-[#334155] rounded-full overflow-hidden">
                <motion.div 
                   style={{ width: useTransform(dragY, [0, 2500], ["0%", "100%"]) }}
                   className="h-full bg-[#60a5fa] shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                />
             </div>
             <span className="text-[9px] font-bold text-[#64748b] tracking-widest">POSITION</span>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-10 w-full text-[#334155] text-[10px] tracking-[0.4em] uppercase font-bold relative z-10 text-center opacity-60">
        <p>© 1994 WARNER MUSIC HONG KONG / NEW MELODY PRODUCTIONS</p>
      </footer>

      {/* Global Style Injections */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Inter:wght@300;400;700;900&display=swap');
        
        body {
          cursor: default;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        
        #magnetic-tape:hover {
          background-color: #222 !important;
        }
        
        #magnetic-tape:active {
          cursor: grabbing;
        }

        .grain::after {
          content: "";
          background-image: url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Noise_Texture.png");
          height: 300%;
          width: 300%;
          position: fixed;
          opacity: 0.02;
          pointer-events: none;
          z-index: 999;
          top: -100%;
          left: -100%;
        }
      `}} />
      <div className="grain" />
    </div>
  );
}

