"use client";

import StatPill from "./shared/statPill";
import { ResumenStats } from "../types/resumenTypes";

interface Props {
  stats: ResumenStats;
}

export default function ResumenHeader({ stats }: Props) {
  return (
    <div
      className="card border-0 shadow-sm"
      style={{ borderTop: "4px solid #c8102e" }}
    >
      <div className="card-body py-3 px-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div>
          <h4
            className="mb-0 fw-bold"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: 1,
            }}
          >
            🏆 Resumen del Torneo
          </h4>
          <p className="mb-0 text-muted small">
            FIFA World Cup 2026™ — visión global del sorteo
          </p>
        </div>
        <div className="d-flex gap-3 flex-wrap">
          <StatPill
            icon="⚽"
            label="Equipos"
            value={stats.totalEquipos}
            color="#0a1628"
          />
          <StatPill
            icon="🗂️"
            label="Grupos"
            value={stats.totalGrupos}
            color="#c8102e"
          />
          <StatPill
            icon="🌐"
            label="Confederaciones"
            value={stats.totalConfsActivas}
            color="#1a6b2a"
          />
        </div>
      </div>
    </div>
  );
}
