"use client";

import { useEffect, useState, useCallback } from "react";
import AudioManager, { toggleMute, getIsMuted } from "@/components/AudioManager";
import CursorFollower from "@/components/CursorFollower";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);
  const [tabBlurred, setTabBlurred] = useState(false);

  const handleToggleMute = useCallback(() => {
    const newState = toggleMute();
    setMuted(newState);
  }, []);

  useEffect(() => {
    setMuted(getIsMuted());
  }, []);

  // Anti-cheat measures
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    // Disable certain shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      // Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
      }
      // Ctrl+Shift+J
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
      }
      // Ctrl+U (view source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
      }
      // Ctrl+C
      if (e.ctrlKey && e.key === "c") {
        e.preventDefault();
      }
    };

    // Tab visibility
    const handleVisibility = () => {
      setTabBlurred(document.hidden);
    };

    // Console warning
    const devToolsWarning = () => {
      console.log(
        "%c⛧ WARNING ⛧",
        "color: #8b0000; font-size: 40px; font-weight: bold; font-family: serif;"
      );
      console.log(
        "%cAny attempt to cheat will result in disqualification.",
        "color: #555; font-size: 14px; font-family: serif;"
      );
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibility);
    devToolsWarning();

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <>
      <AudioManager />
      <CursorFollower />

      {/* Mute/Unmute Button */}
      <button onClick={handleToggleMute} className="mute-btn" title={muted ? "Unmute" : "Mute"}>
        {muted ? "🔇" : "🔊"}
      </button>

      {/* Tab-away overlay */}
      {tabBlurred && (
        <div className="blurred-overlay">
          <p>⛧ The trial watches you ⛧</p>
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </>
  );
}
