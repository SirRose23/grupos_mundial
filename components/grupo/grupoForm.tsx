'use client'
import { FormEvent, ChangeEvent, Dispatch, SetStateAction } from "react"
import { Grupo } from "@/models/grupo/grupoModel"

interface Props {
    form: Grupo
    setForm: Dispatch<SetStateAction<Grupo>>
    editId: number | null
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function GrupoForm({ form, setForm, editId, onSubmit }: Props) {

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="card shadow-sm mb-4 border-0">
            <div className="card-header bg-dark text-white">
                <h5 className="mb-0">{editId ? 'Editar grupo' : 'Nuevo grupo'}</h5>
            </div>
            <div className="card-body bg-light">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Nombre del grupo</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            value={form.nombre || ''}
                            onChange={handleChange}
                            placeholder="Grupo A"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Descripción</label>
                        <textarea
                            className="form-control"
                            name="descripcion"
                            rows={3}
                            value={form.descripcion || ''}
                            onChange={handleChange}
                            placeholder="Información adicional sobre el grupo"
                        />
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn btn-dark px-4">
                            {editId ? 'Actualizar grupo' : 'Crear grupo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
