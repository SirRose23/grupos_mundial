import { supabase } from "@/lib/supabase"

export interface DetalleGrupo {
    id?: number
    id_grupo: number
    id_equipo: string
}

export async function getDetallesGrupo() {
    return await supabase.from('detalle_grupo').select('*')
}

export async function insertDetalleGrupo(detalleGrupo: DetalleGrupo) {
    return await supabase.from('detalle_grupo').insert(detalleGrupo)
}

export async function updateDetalleGrupo(id: number, detalleGrupo: DetalleGrupo) {
    return await supabase.from('detalle_grupo').update(detalleGrupo).eq('id', id)
}

export async function deleteDetalleGrupo(id: number) {
    return await supabase.from('detalle_grupo').delete().eq('id', id)
}
