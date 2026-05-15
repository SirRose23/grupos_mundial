import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import { DetalleGrupo, getDetallesGrupo, insertDetalleGrupo, updateDetalleGrupo, deleteDetalleGrupo } from '@/models/detalle_grupo/detalleGrupoModel';

export async function fetchDetallesGrupo(setDetalleGrupo: (e: DetalleGrupo[]) => void) {
    const { data, error } = await getDetallesGrupo()
    if (error) {
        toast.error('No se pudo obtener los detalles de grupo')
    } else {
        setDetalleGrupo(data as DetalleGrupo[] || [])
    }
}

export async function addDetalleGrupo(form: DetalleGrupo, refresh: () => void) {
    const { error } = await insertDetalleGrupo(form)
    if (error) {
        toast.error(`No se pudo registrar el detalle de grupo ${error.message}`)
    } else {
        toast.success('Detalle de grupo registrado correctamente')
        refresh()
    }
}

export async function editDetalleGrupo(id: number, form: DetalleGrupo, refresh: () => void) {
    const { error } = await updateDetalleGrupo(id, form)
    if (error) {
        toast.error(`No se pudo actualizar el detalle de grupo ${error.message}`)
    } else {
        toast.success('Detalle de grupo actualizado correctamente')
        refresh()
    }
}

export async function removeDetalleGrupo(id: number, refresh: () => void) {
    const result = await Swal.fire({
        title: "¿Está seguro de eliminar el detalle de grupo?",
        text: "No podrá revertirlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminemoslo!"
    })

    if (result.isConfirmed) {
        const { error } = await deleteDetalleGrupo(id)
        if (error) {
            toast.error(`Error al eliminar detalle de grupo: ${error.message}`)
        } else {
            toast.success('Detalle de grupo eliminado correctamente')
            refresh()
        }
    }
}
