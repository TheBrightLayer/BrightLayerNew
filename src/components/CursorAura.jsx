// src/components/CursorAura.jsx
import React, { useEffect, useRef, useState } from "react";

export default function CursorAura({
  enabled = true,        // toggle easily if you want to disable in production
  color = "42,231,111",  // rgb for the glow
  innerSize = 120,       // px
  outerSize = 220,       // px
}) {
  const [visible, setVisible] = useState(true);
  const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const trailRef = useRef({ x: posRef.current.x, y: posRef.current.y });
  const rafRef = useRef(null);
  const mountedRef = useRef(false);

  // If user prefers reduced motion, don't show animated aura
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
    }
  }, []);

  // Hide on touch devices (avoid overlay when using touchscreen)
  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled || !visible) return;

    mountedRef.current = true;

    // Use a lightweight mousemove handler
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    // support pointermove for stylus/mouse consistency
    window.addEventListener("pointermove", onMove, { passive: true });

    // trailing animation loop (inertia)
    const follow = () => {
      const p = posRef.current;
      const t = trailRef.current;
      // lerp factor (0 < f < 1). A smaller value -> more lag. Tweak 0.12 for feel.
      const f = 0.12;
      t.x += (p.x - t.x) * f;
      t.y += (p.y - t.y) * f;

      // draw by setting CSS custom properties on documentElement for best perf
      // (we'll set them on a wrapper div via style in render)
      rafRef.current = requestAnimationFrame(follow);
    };

    rafRef.current = requestAnimationFrame(follow);

    return () => {
      mountedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled, visible]);

  // Expose trail position for inline style rendering (read from ref via state tick)
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!enabled || !visible) return;
    let raf = null;
    const renderLoop = () => {
      setTick((t) => t + 1); // trigger re-render to update inline style
      raf = requestAnimationFrame(renderLoop);
    };
    raf = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(raf);
  }, [enabled, visible]);

  // read trail position
  const tx = Math.round(trailRef.current.x);
  const ty = Math.round(trailRef.current.y);

  if (!enabled || !visible) return null;

  // Inline style: layered radial gradients + blend mode + slight blur
  const style = {
    pointerEvents: "none",
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    mixBlendMode: "screen",
    transition: "background 0.08s linear, opacity 0.12s linear",
    background: `
      radial-gradient(${innerSize}px at ${tx}px ${ty}px, rgba(${color}, 0.28), rgba(${color}, 0.10) 40%, rgba(0,0,0,0) 70%),
      radial-gradient(${outerSize}px at ${tx}px ${ty}px, rgba(${color}, 0.16), rgba(${color}, 0.04) 50%, rgba(0,0,0,0) 80%)
    `,
    filter: "blur(6px)",
    // subtle breathing using CSS animation class (set in global CSS or inline below)
  };

  return <div aria-hidden="true" style={style} className="cursor-aura" />;
}
