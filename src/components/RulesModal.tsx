"use client";

import { motion, AnimatePresence } from "framer-motion";
import { playSound } from "./AudioManager";

interface RulesModalProps {
  onClose: () => void;
}

const rules = [
  "20 questions total.",
  "No going back.",
  "No refreshing.",
  "No external help.",
  "No copying text.",
  "Screenshots are prohibited.",
  "Leaving the tab = 1 warning. Leave again = instant disqualification.",
  "Any cheating leads to disqualification.",
  "Verdict is final.",
];

export default function RulesModal({ onClose }: RulesModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{ backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.8)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="ritual-card w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mb-6 text-center text-2xl font-bold tracking-wider text-red-500">
            ⛧ Rules of the Trial ⛧
          </h2>
          <ul className="space-y-3">
            {rules.map((rule, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="flex items-start gap-3 text-sm text-neutral-300"
              >
                <span className="mt-0.5 text-red-600">†</span>
                <span>{rule}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => playSound("hover")}
              onClick={() => {
                playSound("click");
                onClose();
              }}
              className="gothic-btn"
            >
              I Understand
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
