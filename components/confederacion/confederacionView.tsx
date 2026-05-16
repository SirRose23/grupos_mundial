'use client'

import { useState, useEffect, FormEvent } from "react"
import ConfederacionForm from "@/components/confederacion/confederacionForm"
import ConfederacionTable from "@/components/confederacion/confederacionTable"
import { Confederacion } from "@/models/confederacion/confederacionModel"
import { fetchConfederaciones, addConfederacion, editConfederacion, removeConfederacion } from "@/controllers/confederacion/confederacionController"

export default function ConfederacionView() {
    const [confederaciones, setConfederaciones] = useState<Confederacion[]>([])
    const [form, setForm] = useState<Confederacion>({ nombre: '', region: '' })
    const [editId, setEditId] = useState<number | null>(null)

    const loadData = () => fetchConfederaciones(setConfederaciones)
    
    useEffect(() => { loadData() }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (editId) {
            await editConfederacion(editId, form, loadData)
            setEditId(null)
        } else {
            await addConfederacion(form, loadData)
        }
        setForm({ nombre: '', region: '' })
    }

    const handleEdit = (c: Confederacion) => {
        setForm(c)
        setEditId(c.id as number)
    }

    return (
        <div className="row">
            <div className="col-lg-4">
                <ConfederacionForm form={form} setForm={setForm} editId={editId} onSubmit={handleSubmit} />
            </div>
            <div className="col-lg-8">
                <ConfederacionTable confederaciones={confederaciones} onEdit={handleEdit} onDelete={(id) => removeConfederacion(id, loadData)} />
            </div>
        </div>
    )
}
