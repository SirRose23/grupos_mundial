import { supabase } from "@/lib/supabase"

export interface Grupo {
    id?: number
    nombre: string
    descripcion: string
    created_at?: string
}

export async function getGrupos() {
    return await supabase.from('grupo').select('*')
}

export async function insertGrupo(grupo: Grupo) {
    return await supabase.from('grupo').insert(grupo)
}

export async function updateGrupo(id: number, grupo: Grupo) {
    return await supabase.from('grupo').update(grupo).eq('id', id)
}

export async function deleteGrupo(id: number) {
    return await supabase.from('grupo').delete().eq('id', id)
}
