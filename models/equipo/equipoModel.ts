import { supabase } from "@/lib/supabase"

export interface Equipo {
    id?: string
    nombre_pais: string
    ranking_fifa: number
    id_federacion: number
}

export async function getEquipos() {
    return await supabase.from('equipo').select('*')
}

export async function insertEquipo(equipo: Equipo) {
    return await supabase.from('equipo').insert(equipo)
}

export async function updateEquipo(id: string, equipo: Equipo) {
    return await supabase.from('equipo').update(equipo).eq('id', id)
}

export async function deleteEquipo(id: string) {
    return await supabase.from('equipo').delete().eq('id', id)
}

