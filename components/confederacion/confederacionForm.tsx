'use client'
import { FormEvent, ChangeEvent, Dispatch, SetStateAction } from "react"
import { Confederacion } from "@/models/confederacion/confederacionModel"

interface Props {
    form: Confederacion
    setForm: Dispatch<SetStateAction<Confederacion>>
    editId: number | null
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function ConfederacionForm({ form, setForm, editId, onSubmit }: Props) {
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{editId ? 'Editar Confederación' : 'Nueva Confederación'}</h5>
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
                                placeholder="Ej: CONMEBOL"
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Región</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="region" 
                                value={form.region || ''} 
                                onChange={handleChange} 
                                placeholder="Ej: Sudamérica"
                                required
                            />
                        </div>
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn btn-primary px-4">
                            {editId ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
