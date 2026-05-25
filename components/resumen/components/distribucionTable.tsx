"use client";

import { Grupo } from "@/models/grupo/grupoModel";
import { CONF_COLORS } from "@/components/equipo/eleementos/listadoPaises";
import EmptyState from "./shared/emptyState";
import { GrupoConf } from "../types/resumenTypes";

interface Props {
  grupos: Grupo[];
  grupoConf: GrupoConf;
  confsActivas: string[];
}

export default function DistribucionTable({
  grupos,
  grupoConf,
  confsActivas,
}: Props) {
  if (grupos.length === 0) {
    return (
      <EmptyState mensaje="No se han generado grupos todavía. Ve a la pestaña Sorteo / Grupos para crearlos." />
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="table-responsive">
        <table
          className="table table-hover align-middle mb-0"
          style={{ fontSize: "0.88rem" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#0a1628" }}>
              <th
                className="text-white px-3 py-3"
                style={{ width: "12%" }}
              >
                Grupo
              </th>
              {confsActivas.map((conf) => (
                <th
                  key={conf}
                  className="text-center py-3"
                  style={{ minWidth: 80 }}
                >
                  <span
                    className="badge px-2 py-1"
                    style={{
                      backgroundColor: CONF_COLORS[conf],
                      fontSize: "0.68rem",
                    }}
                  >
                    {conf}
                  </span>
                </th>
              ))}
              <th
                className="text-center text-white py-3"
                style={{ width: "10%" }}
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {grupos.map((g) => {
              const distrib = grupoConf[g.id!] ?? {};
              const total = Object.values(distrib).reduce(
                (s, n) => s + n,
                0
              );
              return (
                <tr key={g.id}>
                  <td className="px-3 fw-bold">
                    <span
                      className="badge bg-dark px-2 py-1"
                      style={{ fontSize: "0.78rem" }}
                    >
                      {g.nombre}
                    </span>
                  </td>
                  {confsActivas.map((conf) => {
                    const count = distrib[conf] ?? 0;
                    const color = CONF_COLORS[conf];
                    return (
                      <td key={conf} className="text-center">
                        {count > 0 ? (
                          <span
                            className="badge rounded-pill"
                            style={{
                              backgroundColor: color + "22",
                              color,
                              border: `1px solid ${color}44`,
                              fontWeight: 700,
                              fontSize: "0.82rem",
                              minWidth: 28,
                            }}
                          >
                            {count}
                          </span>
                        ) : (
                          <span
                            className="text-muted"
                            style={{ fontSize: "0.8rem" }}
                          >
                            —
                          </span>
                        )}
                      </td>
                    );
                  })}
                  <td className="text-center fw-bold text-muted">{total}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr
              style={{
                backgroundColor: "#f8f9fa",
                borderTop: "2px solid #dee2e6",
              }}
            >
              <td
                className="px-3 fw-bold text-muted"
                style={{ fontSize: "0.78rem" }}
              >
                TOTAL
              </td>
              {confsActivas.map((conf) => {
                const total = grupos.reduce(
                  (s, g) => s + (grupoConf[g.id!]?.[conf] ?? 0),
                  0
                );
                return (
                  <td key={conf} className="text-center">
                    <span
                      className="fw-bold"
                      style={{
                        color: CONF_COLORS[conf],
                        fontSize: "0.88rem",
                      }}
                    >
                      {total}
                    </span>
                  </td>
                );
              })}
              <td className="text-center fw-bold">
                {grupos.reduce((s, g) => {
                  const distrib = grupoConf[g.id!] ?? {};
                  return (
                    s + Object.values(distrib).reduce((x, n) => x + n, 0)
                  );
                }, 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
