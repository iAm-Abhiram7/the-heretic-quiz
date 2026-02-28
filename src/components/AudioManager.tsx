"use client";

import { useEffect, useRef, useCallback } from "react";

type SoundName = "hover" | "click" | "correct" | "wrong" | "glitch";

let audioCtx: AudioContext | null = null;
let ambientNodes: { osc1: OscillatorNode; osc2: OscillatorNode; lfo: OscillatorNode; gain: GainNode } | null = null;
let ambientStarted = false;
let isMuted = false;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/* ── Synthesized Horror Sounds ── */

function playHover() {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.06);
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.12);
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  osc.connect(gain).connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.15);
}

function playClick() {
  const ctx = getCtx();
  const duration = 0.35;

  // Deep thud
  const osc1 = ctx.createOscillator();
  const g1 = ctx.createGain();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(120, ctx.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + duration);
  g1.gain.setValueAtTime(0.3, ctx.currentTime);
  g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc1.connect(g1).connect(ctx.destination);
  osc1.start(ctx.currentTime);
  osc1.stop(ctx.currentTime + duration);

  // Noise burst layer
  const bufferSize = ctx.sampleRate * 0.08;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.15, ctx.currentTime);
  ng.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  noise.connect(ng).connect(ctx.destination);
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 0.1);
}

function playCorrect() {
  const ctx = getCtx();
  // Ethereal ascending chime
  const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5
  freqs.forEach((f, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = f;
    const start = ctx.currentTime + i * 0.12;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.15, start + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.6);
  });
  // Add shimmer
  const osc2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  osc2.type = "triangle";
  osc2.frequency.value = 1046.5;
  g2.gain.setValueAtTime(0, ctx.currentTime + 0.3);
  g2.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.4);
  g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
  osc2.connect(g2).connect(ctx.destination);
  osc2.start(ctx.currentTime + 0.3);
  osc2.stop(ctx.currentTime + 1.2);
}

function playWrong() {
  const ctx = getCtx();
  // Dissonant descending horror stab
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const g1 = ctx.createGain();
  const g2 = ctx.createGain();

  osc1.type = "sawtooth";
  osc1.frequency.setValueAtTime(300, ctx.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.6);
  g1.gain.setValueAtTime(0.12, ctx.currentTime);
  g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

  osc2.type = "square";
  osc2.frequency.setValueAtTime(310, ctx.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(75, ctx.currentTime + 0.7);
  g2.gain.setValueAtTime(0.08, ctx.currentTime);
  g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

  osc1.connect(g1).connect(ctx.destination);
  osc2.connect(g2).connect(ctx.destination);
  osc1.start(ctx.currentTime);
  osc2.start(ctx.currentTime);
  osc1.stop(ctx.currentTime + 0.6);
  osc2.stop(ctx.currentTime + 0.7);

  // Low rumble
  const rumble = ctx.createOscillator();
  const rg = ctx.createGain();
  rumble.type = "sine";
  rumble.frequency.value = 45;
  rg.gain.setValueAtTime(0.2, ctx.currentTime);
  rg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
  rumble.connect(rg).connect(ctx.destination);
  rumble.start(ctx.currentTime);
  rumble.stop(ctx.currentTime + 0.5);
}

function playGlitch() {
  const ctx = getCtx();
  // Glitch noise bursts
  for (let i = 0; i < 5; i++) {
    const t = ctx.currentTime + i * 0.08;
    const bufLen = ctx.sampleRate * 0.06;
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let j = 0; j < bufLen; j++) {
      d[j] = (Math.random() * 2 - 1) * (1 - j / bufLen);
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.25 - i * 0.04, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    src.connect(g).connect(ctx.destination);
    src.start(t);
    src.stop(t + 0.07);
  }
  // Distorted sweep
  const osc = ctx.createOscillator();
  const gn = ctx.createGain();
  const dist = ctx.createWaveShaper();
  const curve = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    const x = (i / 128) - 1;
    curve[i] = (Math.PI + 20) * x / (Math.PI + 20 * Math.abs(x));
  }
  dist.curve = curve;
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(2000, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4);
  gn.gain.setValueAtTime(0.12, ctx.currentTime);
  gn.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
  osc.connect(dist).connect(gn).connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.4);
}

/* ── Public API ── */

export function playSound(name: SoundName) {
  if (isMuted) return;
  try {
    switch (name) {
      case "hover": playHover(); break;
      case "click": playClick(); break;
      case "correct": playCorrect(); break;
      case "wrong": playWrong(); break;
      case "glitch": playGlitch(); break;
    }
  } catch {
    // silent fail
  }
}

export function startAmbient() {
  if (typeof window === "undefined" || ambientStarted) return;
  try {
    const ctx = getCtx();

    // Master gain
    const master = ctx.createGain();
    master.gain.value = 0.07;
    master.connect(ctx.destination);

    // Deep drone — C1
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 32.7;
    const g1 = ctx.createGain();
    g1.gain.value = 0.6;
    osc1.connect(g1).connect(master);

    // Eerie overtone — detuned fifth
    const osc2 = ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.value = 49.3;
    const g2 = ctx.createGain();
    g2.gain.value = 0.3;
    osc2.connect(g2).connect(master);

    // Slow LFO for unsettling volume pulse
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.03;
    lfo.connect(lfoGain).connect(master.gain);

    osc1.start();
    osc2.start();
    lfo.start();

    ambientNodes = { osc1, osc2, lfo, gain: master };
    ambientStarted = true;
  } catch {
    // silent
  }
}

export function toggleMute(): boolean {
  isMuted = !isMuted;
  if (ambientNodes) {
    ambientNodes.gain.gain.value = isMuted ? 0 : 0.07;
  }
  return isMuted;
}

export function getIsMuted(): boolean {
  return isMuted;
}

export default function AudioManager() {
  const initialized = useRef(false);

  const handleInteraction = useCallback(() => {
    if (!initialized.current) {
      getCtx();
      startAmbient();
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [handleInteraction]);

  return null;
}
