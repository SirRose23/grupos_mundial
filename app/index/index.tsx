'use client'

import { usePathname } from "next/navigation";
import ConfederacionView from "@/components/confederacion/confederacionView";
import FederacionView from "@/components/federacion/federacionView";
import EquipoView from "@/components/equipo/equipoView";
import GrupoView from "@/components/grupo/grupoView";
import ResumenView from "@/components/resumen/resumenView";

export default function MundialDashboard() {
  const pathname = usePathname();

  const renderContent = () => {
    if (pathname.includes("confederaciones")) return <ConfederacionView />;
    if (pathname.includes("federaciones")) return <FederacionView />;
    if (pathname.includes("equipos")) return <EquipoView />;
    if (pathname.includes("grupos")) return <GrupoView />;
    if (pathname.includes("resumen")) return <ResumenView />;
    return <ResumenView />; // Default es ahora Resumen
  };

  const getActiveTitle = () => {
    const name = pathname.split('/').pop() || 'resumen';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="mb-4">
        <h2 className="fw-bold text-dark text-capitalize">
          Gestión de {getActiveTitle()}
        </h2>
      </div>

      <div className="animate__animated animate__fadeIn">
        {renderContent()}
      </div>
    </div>
  );
}
