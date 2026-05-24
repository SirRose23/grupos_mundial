"use client";
import { useState } from "react";
import {
  generarEstructuraGrupos,
  guardarGruposAutomaticos,
} from "@/controllers/grupo/grupoController";
import {
  WORLD_CUP_2026,
  CONF_COLORS,
} from "@/components/equipo/eleementos/listadoPaises";
import { Equipo } from "@/models/equipo/equipoModel";

interface GrupoPreview {
  nombre: string;
  equipos: Equipo[];
}

interface Props {
  refresh: () => void;
}

export default function GrupoGenerator({ refresh }: Props) {
  const [cantidad, setCantidad] = useState<number>(4);
  const [preview, setPreview] = useState<GrupoPreview[] | null>(null);
  const [loading, setLoading] = useState(false);

  const getFlag = (code3: string) => {
    const country = WORLD_CUP_2026.find((c) => c.code3 === code3);
    return country ? country.flag : "🏳️";
  };

  const getDistribucionConf = (equipos: Equipo[]) => {
    const conteo: Record<string, number> = {};
    for (const eq of equipos) {
      const conf = WORLD_CUP_2026.find(
        (c) => c.code3 === (eq.id ?? ""),
      )?.confederation;
      if (conf) conteo[conf] = (conteo[conf] ?? 0) + 1;
    }
    return Object.entries(conteo).sort((a, b) => b[1] - a[1]);
  };

  const handleGenerarPreview = async () => {
    const estructura = await generarEstructuraGrupos(cantidad);
    if (estructura) {
      setPreview(estructura);
    }
  };

  const handleConfirmar = async () => {
    if (!preview) return;
    setLoading(true);
    await guardarGruposAutomaticos(preview, refresh);
    setPreview(null);
    setLoading(false);
  };

  return (
    <div className="card shadow mb-4 border-0 overflow-hidden">
      <div className="card-header bg-gradient bg-primary text-white py-3">
        <h5 className="mb-0 text-center">Generador automático de grupos</h5>
      </div>
      <div className="card-body bg-light">
        <div className="row align-items-end justify-content-center">
          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">
              ¿Cuantos grupos desea crear?
            </label>
            <input
              type="number"
              className="form-control form-control-lg text-center"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              min={2}
            />
          </div>
          <div className="col-md-4 mb-3">
            <button
              className="btn btn-primary btn-lg w-100 shadow-sm"
              onClick={handleGenerarPreview}
            >
              Generar
            </button>
          </div>
        </div>

        {preview && (
          <div className="mt-4 animate__animated animate__fadeIn">
            <hr />
            <h4 className="text-center mb-4 text-secondary">
              Previsualización del sorteo
            </h4>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {preview.map((grupo, idx) => (
                <div key={idx} className="col">
                  <div className="card h-100 border-primary shadow-sm">
                    <div className="card-header bg-primary text-white text-center fw-bold">
                      {grupo.nombre}
                    </div>
                    <ul className="list-group list-group-flush">
                      {grupo.equipos.map((eq) => (
                        <li
                          key={eq.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <span className="fw-medium">
                            <span className="me-2 fs-5">
                              {getFlag(eq.id ?? "")}
                            </span>
                            {eq.nombre_pais}
                          </span>
                          <span className="badge bg-light text-dark border">
                            #{eq.ranking_fifa}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div
                      className="px-3 py-2 d-flex flex-wrap gap-1"
                      style={{
                        borderTop: "1px solid #e9ecef",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      {getDistribucionConf(grupo.equipos).map(
                        ([conf, count]) => (
                          <span
                            key={conf}
                            className="badge fw-semibold"
                            style={{
                              backgroundColor: CONF_COLORS[conf] ?? "#6c757d",
                              fontSize: "0.68rem",
                              letterSpacing: "0.3px",
                            }}
                          >
                            {conf} ×{count}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
              <p className="text-muted small mb-3">
                ¿Estás conforme con este sorteo?
              </p>
              <button
                className="btn btn-outline-secondary btn-lg me-3"
                onClick={() => setPreview(null)}
                disabled={loading}
              >
                Cancelar y Re-sortear
              </button>
              <button
                className="btn btn-success btn-lg px-5 shadow"
                onClick={handleConfirmar}
                disabled={loading}
              >
                {loading ? "Guardando" : "¡Confirmar y guardar!"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
