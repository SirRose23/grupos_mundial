'use client'
import { FormEvent, ChangeEvent, Dispatch, SetStateAction } from "react"
import { Federacion } from "@/models/federacion/federacionModel"
import { Confederacion } from "@/models/confederacion/confederacionModel"

interface Props {
    form: Federacion
    setForm: Dispatch<SetStateAction<Federacion>>
    confederaciones: Confederacion[]
    editId: number | null
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function FederacionForm({ form, setForm, confederaciones, editId, onSubmit }: Props) {
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "id_confederacion" ? Number(value) : value
        }));
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-success text-white">
                <h5 className="mb-0">{editId ? 'Editar Federación' : 'Nueva Federación'}</h5>
            </div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Nombre</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="nombre" 
                                value={form.nombre || ''} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Sede Principal</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="sede_principal" 
                                value={form.sede_principal || ''} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Teléfono</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="telefono" 
                                value={form.telefono || ''} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Confederación Asociada</label>
                            <select 
                                name="id_confederacion" 
                                value={form.id_confederacion || ''} 
                                onChange={handleChange} 
                                className="form-select"
                                required
                            >
                                <option value="" disabled>Seleccione una confederación</option>
                                {confederaciones.map((c) => (
                                    <option key={c.id} value={c.id}> 
                                        {c.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn btn-success px-4">
                            {editId ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
