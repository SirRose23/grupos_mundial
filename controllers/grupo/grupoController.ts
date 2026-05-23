import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  Grupo,
  getGrupos,
  insertGrupo,
  deleteGrupo,
  deleteAllGrupos,
} from "@/models/grupo/grupoModel";
import { getEquipos, Equipo } from "@/models/equipo/equipoModel";
import { insertDetalleGrupo } from "@/models/detalle_grupo/detalleGrupoModel";

export function shuffleEquipos(array: Equipo[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export async function generarEstructuraGrupos(cantidadGrupos: number) {
  const { data: equipos, error } = await getEquipos();

  if (error || !equipos) {
    toast.error("No se pudieron obtener los equipos");
    return null;
  }

  if (equipos.length % cantidadGrupos !== 0) {
    toast.error(
      `No es posible dividir ${equipos.length} equipos en ${cantidadGrupos} grupos de forma equitativa.`,
    );
    return null;
  }

  const equiposMezclados = shuffleEquipos(equipos);
  const tamañoGrupo = equipos.length / cantidadGrupos;
  const estructura = [];

  for (let i = 0; i < cantidadGrupos; i++) {
    const nombreGrupo = `Grupo ${String.fromCharCode(65 + i)}`;
    const inicio = i * tamañoGrupo;
    const fin = inicio + tamañoGrupo;
    estructura.push({
      nombre: nombreGrupo,
      equipos: equiposMezclados.slice(inicio, fin),
    });
  }

  return estructura;
}

export async function guardarGruposAutomaticos(
  estructura: any[],
  refresh: () => void,
) {
  try {
    for (const item of estructura) {
      const { data: nuevoGrupo, error: errorG } = await insertGrupo({
        nombre: item.nombre,
        descripcion: `Generado automáticamente el ${new Date().toLocaleDateString()}`,
      });

      if (errorG) throw new Error(`Error al crear ${item.nombre}`);

      const grupoId = (nuevoGrupo as any)[0].id;

      for (const eq of item.equipos) {
        const { error: errorD } = await insertDetalleGrupo({
          id_grupo: grupoId,
          id_equipo: eq.id,
        });
        if (errorD) throw new Error(`Error al asignar ${eq.nombre_pais}`);
      }
    }

    toast.success("¡Grupos generados y guardados con éxito!");
    refresh();
  } catch (e: any) {
    toast.error(e.message || "Error en la generación masiva");
  }
}

export async function fetchGrupos(setGrupo: (e: Grupo[]) => void) {
  const { data, error } = await getGrupos();
  if (error) {
    toast.error("No se pudo obtener los grupos");
  } else {
    setGrupo((data as Grupo[]) || []);
  }
}

export async function removeGrupo(id: number, refresh: () => void) {
  const result = await Swal.fire({
    title: "¿Eliminar todos los grupos?",
    html: `
            <p>Los grupos del torneo fueron generados como un conjunto.</p>
            <p class="text-danger fw-bold">Al eliminar uno, se eliminarán <u>todos los grupos</u> y sus asignaciones de equipos.</p>
            <p class="text-muted small">Podrás generar un nuevo sorteo desde el generador automático.</p>
        `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sí, eliminar todos",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    const { error } = await deleteAllGrupos();
    if (error) {
      toast.error(`Error al eliminar los grupos: ${error.message}`);
    } else {
      toast.success("Todos los grupos fueron eliminados");
      refresh();
    }
  }
}
