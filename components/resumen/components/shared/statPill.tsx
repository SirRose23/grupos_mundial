"use client";

interface Props {
  icon: string;
  label: string;
  value: number;
  color: string;
}

export default function StatPill({ icon, label, value, color }: Props) {
  return (
    <div
      className="d-flex align-items-center gap-2 px-3 py-2 rounded-3"
      style={{
        backgroundColor: color + "12",
        border: `1px solid ${color}30`,
      }}
    >
      <span style={{ fontSize: "1.2rem" }}>{icon}</span>
      <div>
        <div
          className="fw-bold lh-1"
          style={{ color, fontSize: "1.1rem" }}
        >
          {value}
        </div>
        <div className="text-muted lh-1" style={{ fontSize: "0.7rem" }}>
          {label}
        </div>
      </div>
    </div>
  );
}
