'use client'
import { Grupo } from "@/models/grupo/grupoModel"

interface Props {
    grupos: Grupo[]
    onEdit: (g: Grupo) => void
    onDelete: (id: number) => void
}

export default function GrupoTable({ grupos, onEdit, onDelete }: Props) {

    const formatFecha = (fecha?: string) => {
        if (!fecha) return 'N/A';
        return new Date(fecha).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-secondary text-white">
                <h5 className="mb-0">Grupos del Torneo</h5>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th style={{ width: '10%' }}>ID</th>
                            <th style={{ width: '25%' }}>Grupo</th>
                            <th style={{ width: '40%' }}>Descripción</th>
                            <th style={{ width: '15%' }}>Creado</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grupos.length > 0 ? (
                            grupos.map((g) => (
                                <tr key={g.id}>
                                    <td className="text-muted fw-bold">#{g.id}</td>
                                    <td>
                                        <span className="badge bg-dark px-3 py-2">
                                            {g.nombre}
                                        </span>
                                    </td>
                                    <td className="text-truncate" style={{ maxWidth: '200px' }}>
                                        {g.descripcion || <span className="text-muted italic">Sin descripción</span>}
                                    </td>
                                    <td className="small">
                                        {formatFecha(g.created_at)}
                                    </td>
                                    <td className="text-center">
                                        <div className="btn-group">
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => onEdit(g)}
                                                title="Editar"
                                            >
                                                <i className="bi bi-pencil-fill">Editar</i>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => g.id && onDelete(g.id)}
                                                title="Eliminar"
                                            >
                                                <i className="bi bi-trash-fill">Eliminar</i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-5">
                                    <div className="text-muted">
                                        <i className="bi bi-info-circle fs-2 d-block mb-2"></i>
                                        No se han configurado grupos todavía
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
