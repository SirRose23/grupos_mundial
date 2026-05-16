'use client'

import { useState, useEffect, FormEvent } from "react"
import EquipoForm from "@/components/equipo/equipoForm"
import EquipoTable from "@/components/equipo/equipoTable"
import { Equipo } from "@/models/equipo/equipoModel"
import { DetalleEquipo } from "@/models/detalle_equipo/detalleEquipoModel"
import { Federacion } from "@/models/federacion/federacionModel"
import { fetchEquipos, addEquipo, editEquipo, removeEquipo } from "@/controllers/equipos/equipoController"
import { fetchDetallesEquipo, addDetalleEquipo, editDetalleEquipo } from "@/controllers/detalle_equipo/detalleEquipoController"
import { fetchFederaciones } from "@/controllers/federacion/federacionController"

export default function EquipoView() {
    const [equipos, setEquipos] = useState<Equipo[]>([])
    const [detalles, setDetalles] = useState<DetalleEquipo[]>([])
    const [federaciones, setFederaciones] = useState<Federacion[]>([])
    
    const [form, setForm] = useState<Equipo>({ id: '', nombre_pais: '', ranking_fifa: 0, id_federacion: 0 })
    const [detalleForm, setDetalleForm] = useState<DetalleEquipo>({ cant_jugadores: 23, director_tecnico: '', id_equipo: '' })
    const [editId, setEditId] = useState<string | null>(null)
    const [editDetalleId, setEditDetalleId] = useState<number | null>(null)

    const loadData = () => {
        fetchEquipos(setEquipos)
        fetchDetallesEquipo(setDetalles)
        fetchFederaciones(setFederaciones)
    }
    
    useEffect(() => { loadData() }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const detalleAEnviar = { ...detalleForm, id_equipo: form.id as string }

        if (editId && editDetalleId) {
            await editEquipo(editId, form, () => {})
            await editDetalleEquipo(editDetalleId, detalleAEnviar, loadData)
            setEditId(null)
            setEditDetalleId(null)
        } else {
            await addEquipo(form, () => {})
            setTimeout(async () => {
                await addDetalleEquipo(detalleAEnviar, loadData)
            }, 500)
        }
        
        setForm({ id: '', nombre_pais: '', ranking_fifa: 0, id_federacion: 0 })
        setDetalleForm({ cant_jugadores: 23, director_tecnico: '', id_equipo: '' })
    }

    const handleEdit = (e: Equipo, d: DetalleEquipo) => {
        setForm(e)
        setDetalleForm(d)
        setEditId(e.id as string)
        setEditDetalleId(d.id as number)
    }

    const handleDelete = async (id: string) => {
        removeEquipo(id, loadData)
    }

    return (
        <div className="row">
            <div className="col-lg-12 mb-4">
                <EquipoForm 
                    form={form} setForm={setForm} 
                    detalleForm={detalleForm} setDetalleForm={setDetalleForm} 
                    federaciones={federaciones} 
                    editId={editId} 
                    onSubmit={handleSubmit} 
                />
            </div>
            <div className="col-lg-12">
                <EquipoTable equipos={equipos} detalles={detalles} federaciones={federaciones} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </div>
    )
}
