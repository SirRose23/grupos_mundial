import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import { Grupo, getGrupos, insertGrupo, updateGrupo, deleteGrupo } from '@/models/grupo/grupoModel';

async function validarDuplicado(form: Grupo, excludeId?: number) {
    const { data, error } = await getGrupos()
    if (error || !data) {
        return null
    }

    const registros = excludeId ? data.filter(e => e.id !== excludeId) : data

    const duplicado = registros.find(e =>
        e.nombre === form.nombre
    )

    if (duplicado) {
        return 'Ya existe un grupo con ese nombre'
    } else {
        return null
    }
}

export async function fetchGrupos(setGrupo: (e: Grupo[]) => void) {
    const { data, error } = await getGrupos()
    if (error) {
        toast.error('No se pudo obtener los grupos')
    } else {
        setGrupo(data as Grupo[] || [])
    }
}

export async function addGrupo(form: Grupo, refresh: () => void) {
    const duplicado = await validarDuplicado(form)
    if (duplicado) {
        toast.error(duplicado)
    } else {
        const { error } = await insertGrupo(form)
        if (error) {
            toast.error(`No se pudo registrar el grupo ${error.message}`)
        } else {
            toast.success('Grupo registrado correctamente')
            refresh()
        }
    }
}

export async function editGrupo(id: number, form: Grupo, refresh: () => void) {
    const duplicado = await validarDuplicado(form, id)
    if (duplicado) {
        toast.error(duplicado)
    } else {
        const { error } = await updateGrupo(id, form)
        if (error) {
            toast.error(`No se pudo actualizar el grupo ${error.message}`)
        } else {
            toast.success('Grupo actualizado correctamente')
            refresh()
        }
    }
}

export async function removeGrupo(id: number, refresh: () => void) {
    const result = await Swal.fire({
        title: "¿Está seguro de eliminar el grupo?",
        text: "No podrá revertirlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminemoslo!"
    })

    if (result.isConfirmed) {
        const { error } = await deleteGrupo(id)
        if (error) {
            toast.error(`Error al eliminar grupo: ${error.message}`)
        } else {
            toast.success('Grupo eliminado correctamente')
            refresh()
        }
    }
}
