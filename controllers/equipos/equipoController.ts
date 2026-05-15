import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import { Equipo, getEquipos, insertEquipo, updateEquipo, deleteEquipo } from '@/models/equipo/equipoModel';

export async function fetchEquipos(setEquipo: (e: Equipo[]) => void) {
    const { data, error } = await getEquipos()
    if (error) {
        toast.error('No se pudo obtener a los equipos')
    } else {
        setEquipo(data as Equipo[] || [])
    }
}

export async function addEqipo(form: Equipo, refresh: () => void) {
    const { error } = await insertEquipo(form)
    if (error) {
        toast.error(`No se pudo registrar al equipo ${error.message}`)
    } else {
        toast.success('Equipo registrado correctamente')
        refresh()
    }
}

export async function editEquipo(id: Text, form: Equipo, refresh: () => void) {
    const { data, error } = await updateEquipo(id, form)
    if (error) {
        toast.error(`No se pudo actualizar al equipo ${error.message}`)
    } else {
        toast.success("Equipo actualizado correctamente")
        refresh()
    }
}

export async function removeEquipo(id: Text, refresh: () => void) {
    const result = await Swal.fire({
        title: "¿Está seguro de eliminar al equipo?",
        text: "No podrá revertirlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminemoslo!"
    })

    if (result.isConfirmed) {
        const { error } = await deleteEquipo(id)
        if (error) {
            toast.error(`Error al eliminar equipo: ${error.message}`)
        } else {
            toast.success('Equipo eliminado correctamente')
            refresh()
        }
    }
}