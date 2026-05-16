'use client'

import { useState, useEffect, FormEvent } from "react"
import FederacionForm from "@/components/federacion/federacionForm"
import FederacionTable from "@/components/federacion/federacionTable"
import { Federacion } from "@/models/federacion/federacionModel"
import { Confederacion } from "@/models/confederacion/confederacionModel"
import { fetchFederaciones, addFederacion, editFederacion, removeFederacion } from "@/controllers/federacion/federacionController"
import { fetchConfederaciones } from "@/controllers/confederacion/confederacionController"

export default function FederacionView() {
    const [federaciones, setFederaciones] = useState<Federacion[]>([])
    const [confederaciones, setConfederaciones] = useState<Confederacion[]>([])
    const [form, setForm] = useState<Federacion>({ nombre: '', sede_principal: '', telefono: '', id_confederacion: 0 })
    const [editId, setEditId] = useState<number | null>(null)

    const loadData = () => {
        fetchFederaciones(setFederaciones)
        fetchConfederaciones(setConfederaciones)
    }
    
    useEffect(() => { loadData() }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (editId) {
            await editFederacion(editId, form, loadData)
            setEditId(null)
        } else {
            await addFederacion(form, loadData)
        }
        setForm({ nombre: '', sede_principal: '', telefono: '', id_confederacion: 0 })
    }

    const handleEdit = (f: Federacion) => {
        setForm(f)
        setEditId(f.id as number)
    }

    return (
        <div className="row">
            <div className="col-lg-4">
                <FederacionForm form={form} setForm={setForm} confederaciones={confederaciones} editId={editId} onSubmit={handleSubmit} />
            </div>
            <div className="col-lg-8">
                <FederacionTable federaciones={federaciones} confederaciones={confederaciones} onEdit={handleEdit} onDelete={(id) => removeFederacion(id, loadData)} />
            </div>
        </div>
    )
}
