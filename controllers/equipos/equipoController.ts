import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import { Equipo, getEquipos, insertEquipo, updateEquipo, deleteEquipo } from '@/models/equipo/equipoModel';

async function validarDuplicado(form: Equipo, excludeId?: Text) {
    const { data, error } = await getEquipos()
    if (error || !data) {
        return null
    }

    const registros = excludeId ? data.filter(e => e.id !== excludeId) : data

    const duplicado = registros.find(e =>
        e.nombre_pais === form.nombre_pais ||
        e.ranking_fifa === form.ranking_fifa ||
        e.id_federacion === form.id_federacion
    )

    if (duplicado) {
        if (duplicado.nombre_pais === form.nombre_pais) {
            return 'Ya existe un equipo con ese nombre de país'
        } else if (duplicado.ranking_fifa === form.ranking_fifa) {
            return 'Ya existe un equipo con ese ranking FIFA'
        } else {
            return 'Ya existe un equipo registrado con esa federación'
        }
    } else {
        return null
    }
}

export async function fetchEquipos(setEquipo: (e: Equipo[]) => void) {
    const { data, error } = await getEquipos()
    if (error) {
        toast.error('No se pudo obtener a los equipos')
    } else {
        setEquipo(data as Equipo[] || [])
    }
}

export async function addEquipo(form: Equipo, refresh: () => void) {
    const duplicado = await validarDuplicado(form)
    if (duplicado) {
        toast.error(duplicado)
    } else {
        const { error } = await insertEquipo(form)
        if (error) {
            toast.error(`No se pudo registrar al equipo ${error.message}`)
        } else {
            toast.success('Equipo registrado correctamente')
            refresh()
        }
    }
}

    export async function editEquipo(id: Text, form: Equipo, refresh: () => void) {
        const duplicado = await validarDuplicado(form, id)
        if (duplicado) {
            toast.error(duplicado)
        } else {
            const { error } = await updateEquipo(id, form)
            if (error) {
                toast.error(`No se pudo actualizar al equipo ${error.message}`)
            } else {
                toast.success("Equipo actualizado correctamente")
                refresh()
            }
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