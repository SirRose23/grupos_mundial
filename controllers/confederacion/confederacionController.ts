import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import { Confederacion, getConfederaciones, insertConfederacion, updateConfederacion, deleteConfederacion } from '@/models/confederacion/confederacionModel';

async function validarDuplicado(form: Confederacion, excludeId?: number) {
    const { data, error } = await getConfederaciones()
    if (error || !data) {
        return null
    }

    const registros = excludeId ? data.filter(e => e.id !== excludeId) : data

    const duplicado = registros.find(e =>
        e.nombre === form.nombre ||
        e.region === form.region
    )

    if (duplicado) {
        if (duplicado.nombre === form.nombre) {
            return 'Ya existe una confederacion con ese nombre'
        } else {
            return 'Ya existe una confederacion con esa región'
        }
    } else {
        return null
    }
}

export async function fetchConfederaciones(setConfederacion: (e: Confederacion[]) => void) {
    const { data, error } = await getConfederaciones()
    if (error) {
        toast.error('No se pudo obtener las confederaciones')
    } else {
        setConfederacion(data as Confederacion[] || [])
    }
}

export async function addConfederacion(form: Confederacion, refresh: () => void) {
    const duplicado = await validarDuplicado(form)
    if (duplicado) {
        toast.error(duplicado)
    } else {
        const { error } = await insertConfederacion(form)
        if (error) {
            toast.error(`No se pudo registrar la confederacion ${error.message}`)
        } else {
            toast.success('Confederacion registrada correctamente')
            refresh()
        }
    }
}

export async function editConfederacion(id: number, form: Confederacion, refresh: () => void) {
    const duplicado = await validarDuplicado(form, id)
    if (duplicado) {
        toast.error(duplicado)
    } else {
        const { error } = await updateConfederacion(id, form)
        if (error) {
            toast.error(`No se pudo actualizar la confederacion ${error.message}`)
        } else {
            toast.success("Confederacion actualizada correctamente")
            refresh()
        }
    }
}

export async function removeConfederacion(id: number, refresh: () => void) {
    const result = await Swal.fire({
        title: "¿Está seguro de eliminar la confederacion?",
        text: "No podrá revertirlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminemoslo!"
    })

    if (result.isConfirmed) {
        const { error } = await deleteConfederacion(id)
        if (error) {
            toast.error(`Error al eliminar confederacion: ${error.message}`)
        } else {
            toast.success('Confederacion eliminada correctamente')
            refresh()
        }
    }
}
