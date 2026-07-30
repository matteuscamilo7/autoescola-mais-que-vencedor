"use client";

import { useEffect, useRef } from "react";

const lanes = [
  { type: "bus", icon: "🚌", label: "Micro-ônibus" },
  { type: "moto", icon: "🏍️", label: "Moto" },
  { type: "car", icon: "🚗", label: "Carro" },
] as const;

function TrafficLane({
  type,
  icon,
  label,
}: (typeof lanes)[number]) {
  return (
    <div className={`traffic-strip__lane traffic-strip__lane--${type}`}>
      <div className={`traffic-strip__flow traffic-strip__flow--${type}`}>
        {[0, 1].map((set) => (
          <div className="traffic-strip__flow-set" key={set}>
            {[0, 1, 2].map((vehicle) => (
              <span className={`traffic-strip__vehicle traffic-strip__vehicle--${type}`} key={vehicle}>
                <i aria-label={label} role="img">{icon}</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrafficStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      strip.classList.toggle("traffic-strip--paused", !entry.isIntersecting);
    }, { threshold: 0.05 });

    observer.observe(strip);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="traffic-strip" ref={stripRef} aria-label="Veículos em movimento na pista">
      <div className="traffic-strip__road">
        {lanes.map((lane) => <TrafficLane {...lane} key={lane.type} />)}
      </div>
    </div>
  );
}
