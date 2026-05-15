import { supabase } from "@/lib/supabase"

export interface Federacion {
    id?: number
    nombre: string
    sede_principal: string
    telefono: string
    id_confederacion: number
}

export async function getFederaciones() {
    return await supabase.from('federacion').select('*')
}

export async function insertFederacion(federacion: Federacion) {
    return await supabase.from('federacion').insert(federacion)
}

export async function updateFederacion(id: number, federacion: Federacion) {
    return await supabase.from('federacion').update(federacion).eq('id', id)
}

export async function deleteFederacion(id: number) {
    return await supabase.from('federacion').delete().eq('id', id)
}