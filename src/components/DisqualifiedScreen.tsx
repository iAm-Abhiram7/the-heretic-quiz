"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { playSound } from "./AudioManager";

export default function DisqualifiedScreen() {
  const router = useRouter();
  const [flickerDone, setFlickerDone] = useState(false);

  useEffect(() => {
    playSound("glitch");
    const t1 = setTimeout(() => playSound("glitch"), 400);
    const t2 = setTimeout(() => setFlickerDone(true), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleReturn = () => {
    playSound("click");
    localStorage.removeItem("quiz_current");
    localStorage.removeItem("quiz_score");
    localStorage.removeItem("quiz_answers");
    localStorage.removeItem("quiz_disqualified");
    localStorage.removeItem("quiz_strikes");
    localStorage.removeItem("quiz_completed");
    router.push("/");
  };

  return (
    <div className={`dq-screen ${!flickerDone ? "screen-flicker" : ""}`}>
      <div className="dq-vignette" />

      {/* Shattered cross */}
      <motion.div
        initial={{ opacity: 0, rotate: -10, scale: 0.3 }}
        animate={{ opacity: 0.15, rotate: 12, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute pointer-events-none"
      >
        <svg width="200" height="300" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="32" y="0" width="16" height="120" rx="2" fill="#2a0000" />
          <rect x="0" y="24" width="80" height="16" rx="2" fill="#2a0000" />
        </svg>
      </motion.div>

      {/* DISQUALIFIED stamp */}
      <motion.div
        initial={{ opacity: 0, scale: 3, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <p className="dq-stamp">Disqualified</p>
      </motion.div>

      {/* Reason */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 mt-8 text-center max-w-md px-4"
      >
        <p className="text-neutral-400 text-sm leading-relaxed mb-2">
          You left the trial to seek outside help.
        </p>
        <p className="text-neutral-600 text-xs italic mb-1">
          The mansion saw everything.
        </p>
        <p className="text-neutral-700 text-xs">
          Your score has been erased. Your reward is forfeit.
        </p>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="relative z-10 mt-8 h-px w-48 bg-gradient-to-r from-transparent via-red-900/50 to-transparent"
      />

      {/* Verdict box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="relative z-10 mt-6 rounded-lg border border-red-900/30 bg-red-950/10 px-6 py-3 text-center"
      >
        <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Verdict</p>
        <p className="text-red-500 font-semibold text-lg tracking-wide">The Heretic does not forgive.</p>
      </motion.div>

      {/* Score */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="relative z-10 mt-4"
      >
        <p className="text-5xl font-bold text-red-800/60">
          0<span className="text-xl text-neutral-700">/20</span>
        </p>
      </motion.div>

      {/* Return button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onMouseEnter={() => playSound("hover")}
        onClick={handleReturn}
        className="gothic-btn relative z-10 mt-8"
      >
        Return to the Entrance
      </motion.button>
    </div>
  );
}
