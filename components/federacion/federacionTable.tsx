'use client'
import { Federacion } from "@/models/federacion/federacionModel"
import { Confederacion } from "@/models/confederacion/confederacionModel"

interface Props {
    federaciones: Federacion[]
    confederaciones: Confederacion[]
    onEdit: (f: Federacion) => void
    onDelete: (id: number) => void
}

export default function FederacionTable({ federaciones, confederaciones, onEdit, onDelete }: Props) {
    const getNombreConfederacion = (id?: number) => {
        const conf = confederaciones.find(c => c.id === id);
        return conf ? conf.nombre : 'Sin confederación';
    }

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Listado de Federaciones</h5>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Sede</th>
                            <th>Teléfono</th>
                            <th>Confederación</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {federaciones.length > 0 ? (
                            federaciones.map((f) => (
                                <tr key={f.id}>
                                    <td>{f.id}</td>
                                    <td>{f.nombre}</td>
                                    <td>{f.sede_principal}</td>
                                    <td>{f.telefono}</td>
                                    <td>
                                        <span className="badge bg-info text-dark">
                                            {getNombreConfederacion(Number(f.id_confederacion))}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                                            <button 
                                                className="btn btn-sm btn-outline-warning"
                                                onClick={() => onEdit(f)}
                                                title="Editar"
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => f.id && onDelete(f.id)}
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
                                <td colSpan={6} className="text-center py-4 text-muted">
                                    No hay federaciones registradas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
