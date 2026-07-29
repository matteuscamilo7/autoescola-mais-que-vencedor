export default function TrafficStrip() {
  return (
    <div className="traffic-strip" aria-hidden="true">
      <div className="traffic-strip__road">
        <span className="traffic-strip__vehicle traffic-strip__vehicle--car"><i>🚗</i></span>
        <span className="traffic-strip__vehicle traffic-strip__vehicle--moto"><i>🏍️</i></span>
        <span className="traffic-strip__vehicle traffic-strip__vehicle--bus"><i>🚌</i></span>
      </div>
    </div>
  );
}
