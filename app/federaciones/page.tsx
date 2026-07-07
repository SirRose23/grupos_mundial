'use client';

import FederacionView from '@/components/federacion/federacionView';

export default function FederacionesPage() {
  return (
    <div className="animate__animated animate__fadeIn">
      <h2 className="fw-bold text-dark mb-4">Gestión de Federaciones</h2>
      <FederacionView />
    </div>
  );
}
