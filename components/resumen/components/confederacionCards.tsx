"use client";

import { WORLD_CUP_2026 } from "@/components/equipo/eleementos/listadoPaises";
import EmptyState from "./shared/emptyState";
import { ConfederacionStats } from "../types/resumenTypes";

interface Props {
  stats: ConfederacionStats[];
  totalEquipos: number;
}

export default function ConfederacionCards({ stats, totalEquipos }: Props) {
  if (totalEquipos === 0) {
    return <EmptyState mensaje="No hay equipos registrados aún." />;
  }

  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">
      {stats.map(({ nombre, color, icon, totalEquipos: count, topEquipo }) => (
        <div key={nombre} className="col">
          <div
            className="card h-100 border-0 shadow-sm text-center"
            style={{ borderTop: `4px solid ${color}` }}
          >
            <div className="card-body p-3">
              <div className="fs-2 mb-1">{icon}</div>
              <div
                className="badge mb-2 px-2 py-1"
                style={{
                  backgroundColor: color,
                  fontSize: "0.7rem",
                  letterSpacing: "0.4px",
                }}
              >
                {nombre}
              </div>
              <div
                className="display-6 fw-bold lh-1 mb-1"
                style={{ color, fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {count}
              </div>
              <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                {count === 1 ? "equipo" : "equipos"}
              </div>
              {topEquipo && (
                <div
                  className="mt-2 pt-2 text-muted"
                  style={{
                    borderTop: "1px solid #f0f0f0",
                    fontSize: "0.7rem",
                  }}
                >
                  🏅 Mejor ranked
                  <br />
                  <span className="fw-semibold text-dark">
                    {WORLD_CUP_2026.find((c) => c.code3 === topEquipo.id)?.flag}{" "}
                    {topEquipo.nombre_pais}
                  </span>
                  <br />
                  <span style={{ color }}>#{topEquipo.ranking_fifa} FIFA</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
