import { supabase } from "@/lib/supabase"

export interface Confederacion {
    id?: number
    nombre: string
    region: string
}

export async function getConfederaciones() {
    return await supabase.from('confederacion').select('*')
}

export async function insertConfederacion(confederacion: Confederacion) {
    return await supabase.from('confederacion').insert(confederacion)
}

export async function updateConfederacion(id: number, confederacion: Confederacion) {
    return await supabase.from('confederacion').update(confederacion).eq('id', id)
}

export async function deleteConfederacion(id: number) {
    return await supabase.from('confederacion').delete().eq('id', id)
}