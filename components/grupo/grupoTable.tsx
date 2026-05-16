'use client'
import { Grupo } from "@/models/grupo/grupoModel"
import { DetalleGrupo } from "@/models/detalle_grupo/detalleGrupoModel"
import { Equipo } from "@/models/equipo/equipoModel"
import { WORLD_CUP_2026 } from "@/components/equipo/eleementos/listadoPaises"

interface Props {
    grupos: Grupo[]
    detalles: DetalleGrupo[]
    equipos: Equipo[]
    onEdit: (g: Grupo) => void
    onDelete: (id: number) => void
}

export default function GrupoTable({ grupos, detalles, equipos, onEdit, onDelete }: Props) {

    const formatFecha = (fecha?: string) => {
        if (!fecha) return 'N/A';
        return new Date(fecha).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    const getFlag = (code3: string) => {
        const country = WORLD_CUP_2026.find(c => c.code3 === code3);
        return country ? country.flag : "🏳️";
    };

    const getEquiposDelGrupo = (idGrupo?: number) => {
        if (!idGrupo) return [];
        const asignaciones = detalles.filter(d => d.id_grupo === idGrupo);
        return asignaciones.map(a => equipos.find(e => e.id === a.id_equipo)).filter(Boolean) as Equipo[];
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
                            <th style={{ width: '40%' }}>Equipos Asignados</th>
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
                                    <td>
                                        <div className="d-flex flex-wrap gap-2">
                                            {getEquiposDelGrupo(g.id).length > 0 ? (
                                                getEquiposDelGrupo(g.id).map(eq => (
                                                    <span key={eq.id} className="badge bg-light text-dark border p-2 d-flex align-items-center" title={eq.nombre_pais}>
                                                        <span className="fs-5 me-1">{getFlag(eq.id || '')}</span>
                                                        <span className="fw-bold">{eq.id}</span>
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-muted small italic">Sin equipos asignados</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="small">
                                        {formatFecha(g.created_at)}
                                    </td>
                                    <td>
                                        <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                                            <button
                                                className="btn btn-sm btn-outline-warning"
                                                onClick={() => onEdit(g)}
                                                title="Editar"
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => g.id && onDelete(g.id)}
                                                title="Eliminar"
                                            >
                                                <i className="bi bi-trash"></i>
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
