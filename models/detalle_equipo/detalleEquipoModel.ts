import { supabase } from "@/lib/supabase"

export interface DetalleEquipo {
    id?: number
    cant_jugadores: number
    director_tecnico: string
    id_equipo: string
}

export async function getDetallesEquipo() {
    return await supabase.from('detalle_equipo').select('*')
}

export async function insertDetalleEquipo(detalleEquipo: DetalleEquipo) {
    return await supabase.from('detalle_equipo').insert(detalleEquipo)
}

export async function updateDetalleEquipo(id: number, detalleEquipo: DetalleEquipo) {
    return await supabase.from('detalle_equipo').update(detalleEquipo).eq('id', id)
}

export async function deleteDetalleEquipo(id: number) {
    return await supabase.from('detalle_equipo').delete().eq('id', id)
}
