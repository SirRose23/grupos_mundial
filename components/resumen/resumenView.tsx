"use client";

import { useResumenData } from "./hooks/useResumenData";
import ResumenHeader from "./components/resumenHeader";
import ConfederacionCards from "./components/confederacionCards";
import DistribucionTable from "./components/distribucionTable";

export default function ResumenView() {
  const { grupos, equipos, grupoConf, confsActivas, confederacionStats } =
    useResumenData();

  return (
    <div className="row g-4">
      <div className="col-12">
        <ResumenHeader
          stats={{
            totalEquipos: equipos.length,
            totalGrupos: grupos.length,
            totalConfsActivas: confsActivas.length,
          }}
        />
      </div>

      <div className="col-12">
        <h5
          className="fw-bold mb-3"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: 1,
          }}
        >
          Equipos por Confederación
        </h5>
        <ConfederacionCards
          stats={confederacionStats}
          totalEquipos={equipos.length}
        />
      </div>

      <div className="col-12">
        <h5
          className="fw-bold mb-3"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: 1,
          }}
        >
          Distribución por Grupo
        </h5>
        <DistribucionTable
          grupos={grupos}
          grupoConf={grupoConf}
          confsActivas={confsActivas}
        />
      </div>
    </div>
  );
}
