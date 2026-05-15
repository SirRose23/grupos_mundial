import toast from 'react-hot-toast';
import Swal from 'sweetalert2'
import { Federacion, getFederaciones, insertFederacion, updateFederacion, deleteFederacion } from '@/models/federacion/federacionModel';

async function validarDuplicado(form: Federacion, excludeId?: number) {
    const { data, error } = await getFederaciones()
    if (error || !data) {
        return null
    }

    const registros = excludeId ? data.filter(e => e.id !== excludeId) : data

    const duplicado = registros.find(e =>
        e.nombre === form.nombre ||
        e.sede_principal === form.sede_principal ||
        e.telefono === form.telefono
    )

    if (duplicado) {
        if (duplicado.nombre === form.nombre) {
            return 'Ya existe una federacion con ese nombre'
        } else if (duplicado.sede_principal === form.sede_principal) {
            return 'Ya existe una federacion con esa sede principal'
        } else {
            return 'Ya existe una federacion con ese teléfono'
        }
    } else {
        return null
    }
}

export async function fetchFederaciones(setFederacion: (e: Federacion[]) => void) {
    const { data, error } = await getFederaciones()
    if (error) {
        toast.error('No se pudo obtener a las federaciones')
    } else {
        setFederacion(data as Federacion[] || [])
    }
}

export async function addFederacion(form: Federacion, refresh: () => void) {
    const duplicado = await validarDuplicado(form)
    if (duplicado) {
        toast.error(duplicado)
    } else {
        const { error } = await insertFederacion(form)
        if (error) {
            toast.error(`No se pudo registrar la federacion ${error.message}`)
        } else {
            toast.success('Federacion registrada correctamente')
            refresh()
        }
    }
}

export async function editFederacion(id: number, form: Federacion, refresh: () => void) {
    const duplicado = await validarDuplicado(form, id)
    if (duplicado) {
        toast.error(duplicado)
    } else {
        const { error } = await updateFederacion(id, form)
        if (error) {
            toast.error(`No se pudo actualizar la federacion ${error.message}`)
        } else {
            toast.success("Federacion actualizada correctamente")
            refresh()
        }
    }
}

export async function removeFederacion(id: number, refresh: () => void) {
    const result = await Swal.fire({
        title: "¿Está seguro de eliminar a la federacion?",
        text: "No podrá revertirlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminemoslo!"
    })

    if (result.isConfirmed) {
        const { error } = await deleteFederacion(id)
        if (error) {
            toast.error(`Error al eliminar federacion: ${error.message}`)
        } else {
            toast.success('Federacion eliminada correctamente')
            refresh()
        }
    }
}