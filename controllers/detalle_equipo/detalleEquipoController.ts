import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import { DetalleEquipo, getDetallesEquipo, insertDetalleEquipo, updateDetalleEquipo, deleteDetalleEquipo } from '@/models/detalle_equipo/detalleEquipoModel';

export async function fetchDetallesEquipo(setDetalleEquipo: (e: DetalleEquipo[]) => void) {
    const { data, error } = await getDetallesEquipo()
    if (error) {
        toast.error('No se pudo obtener los detalles de equipo')
    } else {
        setDetalleEquipo(data as DetalleEquipo[] || [])
    }
}

const MIN_JUGADORES = 22
const MAX_JUGADORES = 26

export async function addDetalleEquipo(form: DetalleEquipo, refresh: () => void) {
    if (form.cant_jugadores < MIN_JUGADORES || form.cant_jugadores > MAX_JUGADORES) {
        toast.error(`La cantidad de jugadores debe estar entre ${MIN_JUGADORES} y ${MAX_JUGADORES}`)
        return
    }
    const { error } = await insertDetalleEquipo(form)
    if (error) {
        toast.error(`No se pudo registrar el detalle de equipo ${error.message}`)
    } else {
        toast.success('Detalle de equipo registrado correctamente')
        refresh()
    }
}

export async function editDetalleEquipo(id: number, form: DetalleEquipo, refresh: () => void) {
    if (form.cant_jugadores < MIN_JUGADORES || form.cant_jugadores > MAX_JUGADORES) {
        toast.error(`La cantidad de jugadores debe estar entre ${MIN_JUGADORES} y ${MAX_JUGADORES}`)
        return
    }
    const { error } = await updateDetalleEquipo(id, form)
    if (error) {
        toast.error(`No se pudo actualizar el detalle de equipo ${error.message}`)
    } else {
        toast.success('Detalle de equipo actualizado correctamente')
        refresh()
    }
}

export async function removeDetalleEquipo(id: number, refresh: () => void) {
    const result = await Swal.fire({
        title: "¿Está seguro de eliminar el detalle de equipo?",
        text: "No podrá revertirlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminemoslo!"
    })

    if (result.isConfirmed) {
        const { error } = await deleteDetalleEquipo(id)
        if (error) {
            toast.error(`Error al eliminar detalle de equipo: ${error.message}`)
        } else {
            toast.success('Detalle de equipo eliminado correctamente')
            refresh()
        }
    }
}
