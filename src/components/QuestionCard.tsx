"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Question } from "@/data/questions";
import { playSound } from "./AudioManager";

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);

    const isCorrect = index === question.correctAnswerIndex;
    if (isCorrect) {
      playSound("correct");
    } else {
      playSound("wrong");
    }

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  const getOptionClass = (index: number) => {
    const base =
      "w-full text-left px-5 py-3.5 rounded-lg border text-sm sm:text-base transition-all duration-300 ";

    if (!revealed) {
      if (selected === index) {
        return base + "border-red-700 bg-red-900/20 text-white";
      }
      return (
        base +
        "border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:border-red-800 hover:bg-red-950/20 hover:text-white cursor-pointer"
      );
    }

    // Revealed state
    if (index === question.correctAnswerIndex) {
      return base + "border-green-600 bg-green-900/30 text-green-300";
    }
    if (selected === index && index !== question.correctAnswerIndex) {
      return base + "border-red-600 bg-red-900/30 text-red-400";
    }
    return base + "border-neutral-800 bg-neutral-900/30 text-neutral-600";
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl"
    >
      <h2 className="mb-8 text-lg font-medium leading-relaxed text-neutral-200 sm:text-xl">
        {question.question}
      </h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={!revealed ? { scale: 1.02 } : {}}
            whileTap={!revealed ? { scale: 0.98 } : {}}
            onMouseEnter={() => {
              if (!revealed) playSound("hover");
            }}
            onClick={() => handleSelect(index)}
            className={getOptionClass(index)}
            disabled={revealed}
          >
            <span className="mr-3 text-red-600/60 font-semibold">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
