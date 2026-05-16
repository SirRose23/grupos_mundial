'use client'
import { Confederacion } from "@/models/confederacion/confederacionModel"

interface Props {
    confederaciones: Confederacion[]
    onEdit: (c: Confederacion) => void
    onDelete: (id: number) => void
}

export default function ConfederacionTable({ confederaciones, onEdit, onDelete }: Props) {
    return (
        <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Listado de Confederaciones</h5>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Región</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {confederaciones.length > 0 ? (
                            confederaciones.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.nombre}</td>
                                    <td>{c.region}</td>
                                    <td>
                                        <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                                            <button 
                                                className="btn btn-sm btn-outline-warning"
                                                onClick={() => onEdit(c)}
                                                title="Editar"
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => c.id && onDelete(c.id)}
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
                                <td colSpan={4} className="text-center py-4 text-muted">
                                    No hay confederaciones registradas
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
