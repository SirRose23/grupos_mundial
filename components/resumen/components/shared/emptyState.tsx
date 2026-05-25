"use client";

interface Props {
  mensaje: string;
}

export default function EmptyState({ mensaje }: Props) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body text-center py-5 text-muted">
        <i className="bi bi-info-circle fs-2 d-block mb-2"></i>
        <p className="mb-0 small">{mensaje}</p>
      </div>
    </div>
  );
}
