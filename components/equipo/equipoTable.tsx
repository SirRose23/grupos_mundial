'use client'
import { Equipo } from "@/models/equipo/equipoModel"
import { DetalleEquipo } from "@/models/detalle_equipo/detalleEquipoModel"
import { Federacion } from "@/models/federacion/federacionModel"
import { WORLD_CUP_2026 } from "@/components/equipo/eleementos/listadoPaises"

interface Props {
    equipos: Equipo[]
    detalles: DetalleEquipo[]
    federaciones: Federacion[]
    onEdit: (e: Equipo, d: DetalleEquipo) => void
    onDelete: (id: string) => void
}

export default function EquipoTable({ equipos, detalles, federaciones, onEdit, onDelete }: Props) {
    
    // Función para encontrar el detalle correspondiente a un equipo
    const getDetalleByEquipo = (idEquipo?: string) => {
        return detalles.find(d => d.id_equipo === idEquipo) || { 
            director_tecnico: 'No asignado', 
            cant_jugadores: 0 
        } as DetalleEquipo;
    }

    const getNombreFederacion = (idFed?: number) => {
        const fed = federaciones.find(f => f.id === idFed);
        return fed ? fed.nombre : 'Desconocida';
    }

    const getFlag = (code3: string) => {
        const country = WORLD_CUP_2026.find(c => c.code3 === code3);
        return country ? country.flag : "🏳️";
    };

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Equipos Registrados</h5>
                <span className="badge bg-primary">{equipos.length} Equipos</span>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Código</th>
                            <th>País</th>
                            <th>Ranking</th>
                            <th>Director Técnico</th>
                            <th>Jugadores</th>
                            <th>Federación</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipos.length > 0 ? (
                            equipos.map((e) => {
                                const detalle = getDetalleByEquipo(e.id?.toString());
                                return (
                                    <tr key={e.id?.toString()}>
                                        <td className="fw-bold">{e.id?.toString()}</td>
                                        <td>
                                            <span className="me-2 fs-5">{getFlag(e.id?.toString() || '')}</span>
                                            {e.nombre_pais}
                                        </td>
                                        <td>
                                            <span className="badge rounded-pill bg-secondary">
                                                #{e.ranking_fifa}
                                            </span>
                                        </td>
                                        <td>{detalle.director_tecnico}</td>
                                        <td>
                                            <span className={detalle.cant_jugadores < 22 ? 'text-danger' : 'text-success'}>
                                                {detalle.cant_jugadores}
                                            </span>
                                        </td>
                                        <td>{getNombreFederacion(e.id_federacion)}</td>
                                        <td>
                                            <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                                                <button 
                                                    className="btn btn-sm btn-outline-warning"
                                                    onClick={() => onEdit(e, detalle)}
                                                    title="Editar"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => e.id && onDelete(e.id.toString())}
                                                    title="Eliminar"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-4 text-muted">
                                    No hay equipos registrados actualmente
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
