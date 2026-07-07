"use client";

import ConfederacionView from "@/components/confederacion/confederacionView";

export default function ConfederacionesPage() {
  return (
    <div className="animate__animated animate__fadeIn">
      <h2 className="fw-bold text-dark mb-4">Gestión de Confederaciones</h2>
      <ConfederacionView />
    </div>
  );
}
