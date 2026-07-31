"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "../data/content";

type Point = { x: number; y: number };
type Route = {
  width: number;
  height: number;
  path: string;
  points: Point[];
  vertical: boolean;
};

const CAR = { width: 84, height: 46 };
const LOOP_DURATION = 12000;

function round(value: number) {
  return Math.round(value * 10) / 10;
}

function createRoutePath(points: Point[], vertical: boolean) {
  if (!points.length) return "";

  return points.slice(1).reduce((path, point, index) => {
    const previous = points[index];
    const control = vertical
      ? {
        x: (previous.x + point.x) / 2 + (index % 2 === 0 ? -8 : 8),
        y: (previous.y + point.y) / 2,
      }
      : {
        x: (previous.x + point.x) / 2,
        y: (previous.y + point.y) / 2 + (index % 2 === 0 ? 10 : -10),
      };

    return `${path} Q ${round(control.x)} ${round(control.y)} ${round(point.x)} ${round(point.y)}`;
  }, `M ${round(points[0].x)} ${round(points[0].y)}`);
}

function vehicleTransform(point: Point, vertical: boolean) {
  const x = vertical ? point.x - 74 : point.x - CAR.width / 2;
  const y = point.y - CAR.height / 2;
  return `translate3d(${round(x)}px, ${round(y)}px, 0)`;
}

function nearestPathLength(path: SVGPathElement, target: Point, totalLength: number) {
  let closestLength = 0;
  let closestDistance = Number.POSITIVE_INFINITY;
  const samples = 240;

  for (let index = 0; index <= samples; index += 1) {
    const length = (totalLength * index) / samples;
    const point = path.getPointAtLength(length);
    const distance = (point.x - target.x) ** 2 + (point.y - target.y) ** 2;

    if (distance < closestDistance) {
      closestDistance = distance;
      closestLength = length;
    }
  }

  return closestLength;
}

function RouteCar() {
  return (
    <svg viewBox="0 0 120 64" aria-hidden="true">
      <defs>
        <linearGradient id="route-car-body" x1="18" y1="17" x2="101" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset=".55" stopColor="#dceeff" />
          <stop offset="1" stopColor="#8acbff" />
        </linearGradient>
        <linearGradient id="route-car-window" x1="35" y1="16" x2="79" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dff7ff" />
          <stop offset="1" stopColor="#2388d8" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="56" rx="43" ry="5" fill="#062a52" opacity=".18" />
      <path d="M13 43c0-5.5 4.5-10 10-10h3.5l8.2-13.4c2.3-3.8 6.4-6.1 10.8-6.1h29c4.5 0 8.6 2.4 10.9 6.2L93.4 33H98c5.5 0 10 4.5 10 10v4.2H13V43Z" fill="url(#route-car-body)" stroke="#0a315c" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M31 33 38.4 21c1.4-2.2 3.8-3.6 6.5-3.6h27.4c2.6 0 5.1 1.4 6.4 3.7l7.1 11.9H31Z" fill="url(#route-car-window)" stroke="#0a315c" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M57 18v15" stroke="#0a315c" strokeWidth="1.6" opacity=".7" />
      <path d="M19 38h82v7H19z" fill="#087bff" />
      <path d="M20 42h80v3H20z" fill="#ffd400" />
      <path d="M40 38h37v7H40z" fill="#f8fcff" opacity=".92" />
      <path d="M44 41.5h29" stroke="#087bff" strokeWidth="1.8" strokeDasharray="3 2" strokeLinecap="round" />
      <path d="M16 38h5M99 38h5" stroke="#fff8ce" strokeWidth="3" strokeLinecap="round" />
      <circle cx="31" cy="48" r="8" fill="#08213f" stroke="#fff" strokeWidth="2.5" />
      <circle cx="89" cy="48" r="8" fill="#08213f" stroke="#fff" strokeWidth="2.5" />
      <circle cx="31" cy="48" r="2.8" fill="#ffd400" />
      <circle cx="89" cy="48" r="2.8" fill="#ffd400" />
    </svg>
  );
}

export default function HowItWorks() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const routePathRef = useRef<SVGPathElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const vehicleRef = useRef<HTMLSpanElement>(null);
  const animationsRef = useRef<Animation[]>([]);
  const [route, setRoute] = useState<Route | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const steps = stepsRef.current;
    if (!steps || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.12 });

    observer.observe(steps);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const steps = stepsRef.current;
    if (!steps) return;

    let frame = 0;
    const updateRoute = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const stepsRect = steps.getBoundingClientRect();
        const markers = Array.from(steps.querySelectorAll<HTMLElement>("[data-step-marker]"));
        if (markers.length !== processSteps.length || !stepsRect.width || !stepsRect.height) return;

        const vertical = window.matchMedia("(max-width: 860px)").matches;
        const markerPoints = markers.map((marker) => {
          const rect = marker.getBoundingClientRect();
          return {
            x: rect.left - stepsRect.left + rect.width / 2,
            y: rect.top - stepsRect.top + rect.height / 2,
            width: rect.width,
            height: rect.height,
          };
        });
        const wave = [-4, 7, -6, 4];
        const points = markerPoints.map((point, index) => vertical
          ? { x: point.x + wave[index], y: point.y }
          : { x: point.x, y: point.y - point.height / 2 - 28 + wave[index] });
        const nextRoute = {
          width: Math.round(stepsRect.width),
          height: Math.round(stepsRect.height),
          points,
          vertical,
          path: createRoutePath(points, vertical),
        };

        setRoute((current) => current?.path === nextRoute.path && current.width === nextRoute.width && current.height === nextRoute.height
          ? current
          : nextRoute);
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
    };
  }, []);

  useEffect(() => {
    const vehicle = vehicleRef.current;
    const routePath = routePathRef.current;
    const activePath = activePathRef.current;
    if (!route || !vehicle || !routePath || !activePath) return;

    animationsRef.current.forEach((animation) => animation.cancel());
    animationsRef.current = [];

    const totalLength = routePath.getTotalLength();
    const stops = route.points.map((point) => nearestPathLength(routePath, point, totalLength));
    const transformAt = (index: number) => vehicleTransform(routePath.getPointAtLength(stops[index]), route.vertical);
    const progressAt = (index: number) => Math.max(0, totalLength - stops[index]);
    vehicle.style.transform = transformAt(0);
    vehicle.style.opacity = "1";
    activePath.style.strokeDasharray = `${totalLength}`;
    activePath.style.strokeDashoffset = `${totalLength}`;

    // O deslocamento é parte da explicação visual da jornada e permanece ativo.

    const carAnimation = vehicle.animate([
      { transform: transformAt(0), opacity: 1, offset: 0 },
      { transform: transformAt(0), opacity: 1, offset: 0.1 },
      { transform: transformAt(1), opacity: 1, offset: 0.27 },
      { transform: transformAt(1), opacity: 1, offset: 0.35 },
      { transform: transformAt(2), opacity: 1, offset: 0.52 },
      { transform: transformAt(2), opacity: 1, offset: 0.6 },
      { transform: transformAt(3), opacity: 1, offset: 0.8 },
      { transform: transformAt(3), opacity: 1, offset: 0.955 },
      { transform: transformAt(3), opacity: 0, offset: 0.982 },
      { transform: transformAt(0), opacity: 0, offset: 0.996 },
      { transform: transformAt(0), opacity: 1, offset: 1 },
    ], {
      duration: LOOP_DURATION,
      easing: "cubic-bezier(.36,.01,.24,1)",
      fill: "both",
      iterations: Infinity,
    });
    const routeAnimation = activePath.animate([
      { strokeDashoffset: totalLength, opacity: 1, offset: 0 },
      { strokeDashoffset: totalLength, opacity: 1, offset: 0.1 },
      { strokeDashoffset: progressAt(1), opacity: 1, offset: 0.27 },
      { strokeDashoffset: progressAt(1), opacity: 1, offset: 0.35 },
      { strokeDashoffset: progressAt(2), opacity: 1, offset: 0.52 },
      { strokeDashoffset: progressAt(2), opacity: 1, offset: 0.6 },
      { strokeDashoffset: 0, opacity: 1, offset: 0.8 },
      { strokeDashoffset: 0, opacity: 1, offset: 0.955 },
      { strokeDashoffset: totalLength, opacity: 0, offset: 0.996 },
      { strokeDashoffset: totalLength, opacity: 1, offset: 1 },
    ], {
      duration: LOOP_DURATION,
      easing: "linear",
      fill: "both",
      iterations: Infinity,
    });

    const setInitialStep = window.requestAnimationFrame(() => setActiveStep(0));
    const syncActiveStep = () => {
      const currentTime = carAnimation.currentTime;
      if (typeof currentTime !== "number") return;

      const progress = (currentTime % LOOP_DURATION) / LOOP_DURATION;
      const nextStep = progress < 0.27 ? 0 : progress < 0.52 ? 1 : progress < 0.8 ? 2 : 3;
      setActiveStep((current) => current === nextStep ? current : nextStep);
    };
    const timer = window.setInterval(syncActiveStep, 120);
    syncActiveStep();

    animationsRef.current = [carAnimation, routeAnimation];

    return () => {
      window.cancelAnimationFrame(setInitialStep);
      window.clearInterval(timer);
      carAnimation.cancel();
      routeAnimation.cancel();
      animationsRef.current = [];
    };
  }, [route]);

  useEffect(() => {
    animationsRef.current.forEach((animation) => {
      if (inView) animation.play();
      else animation.pause();
    });
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
                <linearGradient id="steps-route-base" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#cceaff" />
                  <stop offset="48%" stopColor="#edf7ff" />
                  <stop offset="100%" stopColor="#bfe7ff" />
                </linearGradient>
                <linearGradient id="steps-route-active" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#087bff" />
                  <stop offset="74%" stopColor="#2cb7ff" />
                  <stop offset="100%" stopColor="#ffd400" />
                </linearGradient>
              </defs>
              <path className="steps__route-shadow" d={route.path} />
              <path className="steps__route-base" d={route.path} ref={routePathRef} />
              <path className="steps__route-lane" d={route.path} />
              <path className="steps__route-active" d={route.path} ref={activePathRef} />
            </svg>
          )}
          {route && (
            <span className="steps__vehicle" aria-hidden="true">
              <span className="steps__vehicle-motion" ref={vehicleRef}>
                <span className={`steps__vehicle-art${route.vertical ? " steps__vehicle-art--vertical" : ""}`}><RouteCar /></span>
              </span>
            </span>
          )}
          {processSteps.map(([number, title, text], index) => (
            <article className={`steps__item${activeStep === index ? " is-active" : ""}`} key={title} data-reveal>
              <div className="steps__card">
                <b data-step-marker>{number}</b>
                <div className="steps__copy">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

