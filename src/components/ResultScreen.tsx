"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { questionsVersion } from "@/data/questions";
import { playSound } from "./AudioManager";

interface ResultScreenProps {
  score: number;
  total: number;
}

function getVerdict(score: number) {
  if (score >= 18) return "You understand the Heretic.";
  if (score >= 15) return "You listened… but not deeply.";
  if (score >= 10) return "You missed the signs.";
  return "The mansion rejects you.";
}

function getReward(score: number) {
  if (score >= 18) return "🍦 Ice Cream + Thickshake";
  if (score >= 15) return "🍦 1 Ice Cream";
  if (score >= 10) return "🍫 Dark Chocolate";
  return "No gift. The mansion keeps it.";
}

export default function ResultScreen({ score, total }: ResultScreenProps) {
  const router = useRouter();
  const [glitchActive, setGlitchActive] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [sendError, setSendError] = useState<string | null>(null);
  const isLowScore = score < 10;

  useEffect(() => {
    if (isLowScore) {
      playSound("glitch");
      setGlitchActive(true);
      const timer = setTimeout(() => setGlitchActive(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isLowScore]);

  useEffect(() => {
    const token = `${questionsVersion}:${score}:${total}`;
    try {
      const sent = localStorage.getItem("quiz_score_sent");
      if (sent === token) return;
    } catch {
      // ignore
    }

    const sendScore = async () => {
      try {
        setSendStatus("sending");
        const response = await fetch("/api/send-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            score,
            total,
            verdict: getVerdict(score),
          }),
        });
        if (!response.ok) {
          const message = await response.text();
          setSendError(message || "Email send failed.");
          setSendStatus("failed");
          return;
        }
        localStorage.setItem("quiz_score_sent", token);
        setSendStatus("sent");
      } catch {
        setSendError("Email send failed.");
        setSendStatus("failed");
      }
    };

    sendScore();
  }, [score, total]);

  const handleReturn = () => {
    playSound("click");
    router.push("/");
  };

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center px-4 ${glitchActive ? "screen-flicker" : ""}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="ritual-card w-full max-w-md text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="mb-2 text-sm uppercase tracking-widest text-neutral-500">
            Your Score
          </p>
          <p className="mb-6 text-6xl font-bold text-red-500">
            {score}
            <span className="text-2xl text-neutral-600">/{total}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <p
            className={`mb-4 text-xl font-semibold tracking-wide ${
              isLowScore ? "glitch-text text-red-500" : "text-neutral-200"
            }`}
          >
            {getVerdict(score)}
          </p>
          <div className="mb-8 rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-3">
            <p className="text-sm text-neutral-400">Reward Earned</p>
            <p className={`mt-1 text-lg font-medium ${isLowScore ? "text-neutral-600 italic" : "text-neutral-200"}`}>
              {getReward(score)}
            </p>
            {sendStatus !== "idle" && (
              <p className={`mt-2 text-xs ${sendStatus === "sent" ? "text-green-400" : sendStatus === "failed" ? "text-red-400" : "text-neutral-400"}`}>
                {sendStatus === "sending" && "Sending score email..."}
                {sendStatus === "sent" && "Score email sent."}
                {sendStatus === "failed" && (sendError || "Email failed to send. Check server logs.")}
              </p>
            )}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => playSound("hover")}
          onClick={handleReturn}
          className="gothic-btn gothic-btn-primary"
        >
          Return to the Entrance
        </motion.button>
      </motion.div>
    </div>
  );
}
