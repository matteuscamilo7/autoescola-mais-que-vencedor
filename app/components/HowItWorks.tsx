"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "../data/content";

type Route = {
  width: number;
  height: number;
  path: string;
};

type Point = { x: number; y: number };

const vehicleSize = { width: 54, height: 32 };

function vehicleTransform({ x, y }: Point) {
  return `translate3d(${x - vehicleSize.width / 2}px, ${y - vehicleSize.height / 2}px, 0)`;
}

function RouteCar() {
  return (
    <svg viewBox="0 0 76 42" aria-hidden="true">
      <path d="M14 28 19 17c1.4-3 4-5 7.4-5h20.2c3.2 0 5.7 1.7 7.4 4.6L60.8 28H65c3.3 0 6 2.7 6 6v2H5v-2c0-3.3 2.7-6 6-6h3Z" fill="#f9fcff" stroke="#0a1b34" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 27h41.5l-4.8-9.3c-.8-1.6-2.5-2.7-4.4-2.7H26.5c-2 0-3.8 1.2-4.5 3Z" fill="#a9dbff" stroke="#0a1b34" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 28h52v4H12z" fill="#ffd400" />
      <path d="M31 28h18v4H31z" fill="#111318" opacity=".9" />
      <path d="M9 31h5M62 31h5" stroke="#087bff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="19" cy="36" r="5" fill="#0a1b34" stroke="#fff" strokeWidth="2" />
      <circle cx="57" cy="36" r="5" fill="#0a1b34" stroke="#fff" strokeWidth="2" />
      <circle cx="19" cy="36" r="1.5" fill="#ffd400" />
      <circle cx="57" cy="36" r="1.5" fill="#ffd400" />
    </svg>
  );
}

export default function HowItWorks() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const [route, setRoute] = useState<Route | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const steps = stepsRef.current;
    if (!steps || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.05 });

    observer.observe(steps);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const animation = animationRef.current;
    if (!animation) return;
    if (inView) animation.play();
    else animation.pause();
  }, [inView]);

  useEffect(() => {
    const steps = stepsRef.current;
    const vehicle = vehicleRef.current;
    if (!steps || !vehicle) return;

    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateRoute = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const stepsRect = steps.getBoundingClientRect();
        const markers = Array.from(steps.querySelectorAll<HTMLElement>("[data-step-marker]"));
        if (markers.length !== processSteps.length || !stepsRect.width || !stepsRect.height) return;

        const points = markers.map((marker) => {
          const rect = marker.getBoundingClientRect();
          return {
            x: rect.left - stepsRect.left + rect.width / 2,
            y: rect.top - stepsRect.top + rect.height / 2,
          };
        });

        setRoute({
          width: Math.round(stepsRect.width),
          height: Math.round(stepsRect.height),
          path: `M ${points.map(({ x, y }) => `${x} ${y}`).join(" L ")}`,
        });

        animationRef.current?.cancel();
        vehicle.style.transform = vehicleTransform(points[0]);
        if (reducedMotion) return;

        const keyframe = (point: Point, offset: number) => ({
          transform: vehicleTransform(point),
          offset,
        });
        const animation = vehicle.animate([
          keyframe(points[0], 0),
          keyframe(points[0], 0.08),
          keyframe(points[1], 0.25),
          keyframe(points[1], 0.31),
          keyframe(points[2], 0.48),
          keyframe(points[2], 0.54),
          keyframe(points[3], 0.71),
          keyframe(points[3], 0.79),
          keyframe(points[2], 0.86),
          keyframe(points[1], 0.93),
          keyframe(points[0], 1),
        ], {
          duration: 16000,
          easing: "cubic-bezier(.45, 0, .25, 1)",
          fill: "both",
          iterations: Infinity,
        });

        animationRef.current = animation;
        if (!inView) animation.pause();
      });
    };

    const resizeObserver = new ResizeObserver(updateRoute);
    resizeObserver.observe(steps);
    steps.querySelectorAll("[data-step-marker]").forEach((marker) => resizeObserver.observe(marker));
    window.addEventListener("resize", updateRoute);
    updateRoute();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateRoute);
      resizeObserver.disconnect();
      animationRef.current?.cancel();
    };
  }, [inView]);

  return (
    <section className="section process" id="como-funciona" aria-labelledby="process-title">
      <div className="container">
        <header className="section-title centered" data-reveal>
          <span>Rota simples</span>
          <h2 id="process-title">Como funciona</h2>
          <p>Da escolha do plano ao início da sua preparação.</p>
        </header>
        <div className="steps" ref={stepsRef}>
          {route && (
            <svg className="steps__route" aria-hidden="true" viewBox={`0 0 ${route.width} ${route.height}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="steps-route-gradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#087bff" />
                  <stop offset="100%" stopColor="#ffd400" />
                </linearGradient>
              </defs>
              <path d={route.path} />
            </svg>
          )}
          <span className="steps__vehicle" aria-hidden="true">
            <span className="steps__vehicle-motion" ref={vehicleRef}><RouteCar /></span>
          </span>
          {processSteps.map(([n, title, text]) => (
            <article key={title} data-reveal>
              <b data-step-marker>{n}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
