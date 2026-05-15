'use client'
import { FormEvent, ChangeEvent, Dispatch, SetStateAction } from "react"
import { Equipo } from "@/models/equipo/equipoModel"
import { DetalleEquipo } from "@/models/detalle_equipo/detalleEquipoModel"
import { Federacion } from "@/models/federacion/federacionModel"

interface Props {
    form: Equipo
    setForm: Dispatch<SetStateAction<Equipo>>
    detalleForm: DetalleEquipo
    setDetalleForm: Dispatch<SetStateAction<DetalleEquipo>>
    federaciones: Federacion[]
    editId: string | null
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function EquipoForm({ form, setForm, detalleForm, setDetalleForm, federaciones, editId, onSubmit }: Props) {

    const handleChangeEquipo = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "id_federacion" ? Number(value) : (name === "ranking_fifa" ? Number(value) : value)
        }));
    };

    const handleChangeDetalle = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetalleForm(prev => ({
            ...prev,
            [name]: name === "cant_jugadores" ? Number(value) : value
        }));
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{editId ? 'Editar Equipo' : 'Registrar Nuevo Equipo'}</h5>
            </div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <label className="form-label fw-bold">Código</label>
                            <input
                                type="text"
                                className="form-control"
                                name="id"
                                value={form.id || ''}
                                onChange={(e) => {
                                    e.target.value = e.target.value.toUpperCase();
                                    handleChangeEquipo(e);
                                }}
                                placeholder="Ej: USA"
                                maxLength={3}
                                minLength={3}
                                disabled={!!editId}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Nombre del país</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nombre_pais"
                                value={form.nombre_pais || ''}
                                onChange={handleChangeEquipo}
                                required
                            />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label fw-bold">Ranking FIFA</label>
                            <input
                                type="number"
                                className="form-control"
                                name="ranking_fifa"
                                value={form.ranking_fifa || ''}
                                onChange={handleChangeEquipo}
                                required
                            />
                        </div>

                        {/* Detalles Técnicos */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Director técnico</label>
                            <input
                                type="text"
                                className="form-control border-info"
                                name="director_tecnico"
                                value={detalleForm.director_tecnico || ''}
                                onChange={handleChangeDetalle}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Cantidad de jugadores (22-26)</label>
                            <input
                                type="number"
                                className="form-control border-info"
                                name="cant_jugadores"
                                value={detalleForm.cant_jugadores || ''}
                                onChange={handleChangeDetalle}
                                required
                            />
                        </div>

                        {/* Asociación */}
                        <div className="col-md-12 mb-3">
                            <label className="form-label fw-bold">Federación</label>
                            <select
                                name="id_federacion"
                                value={form.id_federacion || ''}
                                onChange={handleChangeEquipo}
                                className="form-select"
                                required
                            >
                                <option value="" disabled>Seleccione la federación</option>
                                {federaciones.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="text-end mt-2">
                        <button type="submit" className="btn btn-primary px-5">
                            {editId ? 'Actualizar Equipo Completo' : 'Guardar Equipo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
