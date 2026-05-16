'use client'

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import GrupoGenerator from "@/components/grupo/grupoGenerator"
import GrupoTable from "@/components/grupo/grupoTable"
import { Grupo } from "@/models/grupo/grupoModel"
import { DetalleGrupo } from "@/models/detalle_grupo/detalleGrupoModel"
import { Equipo } from "@/models/equipo/equipoModel"
import { fetchGrupos, removeGrupo } from "@/controllers/grupo/grupoController"
import { fetchDetallesGrupo } from "@/controllers/detalle_grupo/detalleGrupoController"
import { fetchEquipos } from "@/controllers/equipos/equipoController"

export default function GrupoView() {
    const [grupos, setGrupos] = useState<Grupo[]>([])
    const [detalles, setDetalles] = useState<DetalleGrupo[]>([])
    const [equipos, setEquipos] = useState<Equipo[]>([])

    const loadData = () => {
        fetchGrupos(setGrupos)
        fetchDetallesGrupo(setDetalles)
        fetchEquipos(setEquipos)
    }
    
    useEffect(() => { loadData() }, [])

    return (
        <div className="row">
            <div className="col-lg-12 mb-4">
                <GrupoGenerator refresh={loadData} />
            </div>
            <div className="col-lg-12">
                <GrupoTable 
                    grupos={grupos} 
                    detalles={detalles} 
                    equipos={equipos} 
                    onEdit={() => toast("Edición desactivada en modo automático")} 
                    onDelete={(id) => removeGrupo(id, loadData)} 
                />
            </div>
        </div>
    )
}
