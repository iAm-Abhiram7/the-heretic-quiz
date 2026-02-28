"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, questionsVersion } from "@/data/questions";
import QuestionCard from "./QuestionCard";
import ResultScreen from "./ResultScreen";
import DisqualifiedScreen from "./DisqualifiedScreen";

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [disqualified, setDisqualified] = useState(false);
  const [strikes, setStrikes] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const strikesRef = useRef(0);

  const resetProgress = () => {
    localStorage.removeItem("quiz_current");
    localStorage.removeItem("quiz_score");
    localStorage.removeItem("quiz_disqualified");
    localStorage.removeItem("quiz_strikes");
    localStorage.removeItem("quiz_completed");
    localStorage.setItem("quiz_questions_version", questionsVersion);
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setDisqualified(false);
    setStrikes(0);
    strikesRef.current = 0;
  };

  // Load saved progress from localStorage
  useEffect(() => {
    try {
      const savedVersion = localStorage.getItem("quiz_questions_version");
      if (savedVersion !== questionsVersion) {
        resetProgress();
        setLoaded(true);
        return;
      }

      const savedIndex = localStorage.getItem("quiz_current");
      const savedScore = localStorage.getItem("quiz_score");
      const savedDQ = localStorage.getItem("quiz_disqualified");
      const savedStrikes = localStorage.getItem("quiz_strikes");
      if (savedDQ === "true") {
        setDisqualified(true);
      }
      if (savedStrikes !== null) {
        const s = parseInt(savedStrikes, 10);
        setStrikes(s);
        strikesRef.current = s;
      }
      if (savedIndex !== null) {
        const idx = parseInt(savedIndex, 10);
        if (idx >= questions.length) {
          setCurrentIndex(questions.length);
          setFinished(true);
        } else {
          setCurrentIndex(idx);
        }
      }
      if (savedScore !== null) {
        setScore(parseInt(savedScore, 10));
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  // Save progress
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("quiz_current", currentIndex.toString());
    localStorage.setItem("quiz_score", score.toString());
    localStorage.setItem("quiz_questions_version", questionsVersion);
  }, [currentIndex, score, loaded]);

  // Tab-leave disqualification
  useEffect(() => {
    if (!loaded || finished || disqualified) return;

    const handleVisibility = () => {
      if (document.hidden) {
        const newStrikes = strikesRef.current + 1;
        strikesRef.current = newStrikes;
        setStrikes(newStrikes);
        localStorage.setItem("quiz_strikes", newStrikes.toString());

        if (newStrikes >= 2) {
          // DISQUALIFIED
          setDisqualified(true);
          localStorage.setItem("quiz_disqualified", "true");
          localStorage.removeItem("quiz_completed");
          localStorage.setItem("quiz_score", "0");
          setScore(0);
        } else {
          // First warning
          setShowWarning(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [loaded, finished, disqualified]);

  // Auto-dismiss warning
  useEffect(() => {
    if (!showWarning) return;
    const t = setTimeout(() => setShowWarning(false), 4000);
    return () => clearTimeout(t);
  }, [showWarning]);

  const handleAnswer = (isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    const newIndex = currentIndex + 1;

    setScore(newScore);
    setCurrentIndex(newIndex);

    if (newIndex >= questions.length) {
      setFinished(true);
      localStorage.setItem("quiz_completed", "true");
    }
  };

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-800 border-t-transparent" />
      </div>
    );
  }

  if (disqualified) {
    return <DisqualifiedScreen />;
  }

  if (finished) {
    return <ResultScreen score={score} total={questions.length} />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      {/* Strike warning banner */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="strike-warning"
          >
            <span className="text-red-500 text-lg">⚠</span>
            <div>
              <p className="text-red-400 font-semibold text-sm tracking-wide uppercase">Strike 1 — Warning</p>
              <p className="text-neutral-400 text-xs mt-0.5">Leave this tab again and the trial ends. You will be disqualified.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Strikes indicator */}
      {strikes > 0 && (
        <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
          <div className={"h-2.5 w-2.5 rounded-full " + (strikes >= 1 ? "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]" : "bg-neutral-700")} />
          <div className={"h-2.5 w-2.5 rounded-full " + (strikes >= 2 ? "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]" : "bg-neutral-700")} />
          <span className="text-xs text-neutral-600 ml-1">strikes</span>
        </div>
      )}

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4 w-full max-w-2xl"
      >
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <span>
            Question{" "}
            <span className="text-red-500 font-semibold">{currentIndex + 1}</span>{" "}
            / {questions.length}
          </span>
          <span>
            Score: <span className="text-red-500 font-semibold">{score}</span>
          </span>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-neutral-800">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-red-800 to-red-600"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <QuestionCard
          key={questions[currentIndex].id}
          question={questions[currentIndex]}
          onAnswer={handleAnswer}
        />
      </AnimatePresence>
    </div>
  );
}
