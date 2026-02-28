"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import RulesModal from "./RulesModal";
import { playSound, startAmbient } from "./AudioManager";

export default function Hero() {
  const [showRules, setShowRules] = useState(false);
  const router = useRouter();

  const handleStart = () => {
    playSound("click");
    startAmbient();
    const isDisqualified = localStorage.getItem("quiz_disqualified") === "true";
    const isCompleted = localStorage.getItem("quiz_completed") === "true";

    if (isDisqualified) {
      localStorage.removeItem("quiz_current");
      localStorage.removeItem("quiz_score");
      localStorage.removeItem("quiz_answers");
      localStorage.removeItem("quiz_disqualified");
      localStorage.removeItem("quiz_strikes");
      localStorage.removeItem("quiz_completed");
    } else if (!isCompleted) {
      localStorage.removeItem("quiz_current");
      localStorage.removeItem("quiz_score");
      localStorage.removeItem("quiz_answers");
      localStorage.removeItem("quiz_disqualified");
      localStorage.removeItem("quiz_strikes");
    }
    router.push("/quiz");
  };

  const handleRulesOpen = () => {
    playSound("click");
    setShowRules(true);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Background particles */}
      <div className="particles" />

      {/* Shivering Cross */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="cross-shiver mb-6"
      >
        <svg
          width="80"
          height="120"
          viewBox="0 0 80 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cross-svg"
        >
          {/* Vertical beam */}
          <rect x="32" y="0" width="16" height="120" rx="2" fill="url(#crossGrad)" />
          {/* Horizontal beam */}
          <rect x="0" y="24" width="80" height="16" rx="2" fill="url(#crossGrad)" />
          {/* Center jewel */}
          <circle cx="40" cy="32" r="6" fill="#1a0000" stroke="#8b0000" strokeWidth="1.5" />
          <circle cx="40" cy="32" r="2.5" fill="#cc0000" opacity="0.8" />
          {/* Top ornament */}
          <circle cx="40" cy="6" r="3" fill="#3a0000" stroke="#6b0000" strokeWidth="1" />
          {/* Left ornament */}
          <circle cx="6" cy="32" r="3" fill="#3a0000" stroke="#6b0000" strokeWidth="1" />
          {/* Right ornament */}
          <circle cx="74" cy="32" r="3" fill="#3a0000" stroke="#6b0000" strokeWidth="1" />
          {/* Bottom ornament */}
          <circle cx="40" cy="114" r="3" fill="#3a0000" stroke="#6b0000" strokeWidth="1" />
          {/* Inner edge details */}
          <rect x="34" y="2" width="12" height="116" rx="1" fill="url(#crossInner)" opacity="0.3" />
          <rect x="2" y="26" width="76" height="12" rx="1" fill="url(#crossInner)" opacity="0.3" />
          <defs>
            <linearGradient id="crossGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5a0000" />
              <stop offset="30%" stopColor="#8b0000" />
              <stop offset="70%" stopColor="#6b0000" />
              <stop offset="100%" stopColor="#3a0000" />
            </linearGradient>
            <linearGradient id="crossInner" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#cc3333" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="hero-title flicker mb-4 text-center text-6xl font-bold tracking-wider sm:text-7xl md:text-8xl"
      >
        The Heretic
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="mb-12 max-w-lg text-center text-lg italic text-neutral-400 sm:text-xl"
      >
        You watched the film. But did you understand it?
      </motion.p>

      {/* Rewards Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="ritual-card mb-12 w-full max-w-md"
      >
        <h2 className="mb-4 text-center text-xl font-semibold tracking-wide text-red-500">
          ⛧ Rewards of the Trial ⛧
        </h2>
        <p className="mb-1 text-center text-sm text-neutral-500">
          20 Questions Total
        </p>
        <div className="mt-4 space-y-2 text-sm text-neutral-300">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="text-red-400 font-medium">18 – 20</span>
            <span>🍦 Ice Cream + Thickshake</span>
          </div>
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="text-red-400 font-medium">15 – 17</span>
            <span>🍦 1 Ice Cream</span>
          </div>
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="text-red-400 font-medium">10 – 14</span>
            <span>🍫 Dark Chocolate</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-red-400 font-medium">&lt; 10</span>
            <span className="text-neutral-500 italic">No gift. The mansion keeps it.</span>
          </div>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="flex flex-col gap-4 sm:flex-row"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => playSound("hover")}
          onClick={handleRulesOpen}
          className="gothic-btn"
        >
          View Rules
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => playSound("hover")}
          onClick={handleStart}
          className="gothic-btn gothic-btn-primary"
        >
          Start The Trial
        </motion.button>
      </motion.div>

      {showRules && <RulesModal onClose={() => setShowRules(false)} />}
    </div>
  );
}
