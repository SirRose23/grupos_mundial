'use client'

import { useState } from "react";
import ConfederacionView from "@/components/confederacion/confederacionView";
import FederacionView from "@/components/federacion/federacionView";
import EquipoView from "@/components/equipo/equipoView";
import GrupoView from "@/components/grupo/grupoView";
import ResumenView from "@/components/resumen/resumenView";
import Navbar, { TabType } from "@/app/index/Navbar";

export default function MundialDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("equipos");

  const renderContent = () => {
    switch (activeTab) {
      case "confederaciones":
        return <ConfederacionView />;
      case "federaciones":
        return <FederacionView />;
      case "equipos":
        return <EquipoView />;
      case "grupos":
        return <GrupoView />;
      case "resumen":
        return <ResumenView />;
      default:
        return <EquipoView />;
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Contenedor Principal */}
      <main className="container-fluid py-4 px-4">
        <div className="mb-4">
          <h2 className="fw-bold text-dark text-capitalize">
            Gestión de {activeTab}
          </h2>
        </div>

        <div className="animate__animated animate__fadeIn">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
