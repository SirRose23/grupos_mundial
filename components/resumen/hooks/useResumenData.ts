"use client";

import { useState, useEffect } from "react";
import { fetchGrupos } from "@/controllers/grupo/grupoController";
import { fetchEquipos } from "@/controllers/equipos/equipoController";
import { fetchConfederaciones } from "@/controllers/confederacion/confederacionController";
import { WORLD_CUP_2026, CONF_COLORS } from "@/components/equipo/eleementos/listadoPaises";
import { Equipo } from "@/models/equipo/equipoModel";
import { Grupo } from "@/models/grupo/grupoModel";
import { Confederacion } from "@/models/confederacion/confederacionModel";
import { DetalleGrupo, getDetallesGrupo } from "@/models/detalle_grupo/detalleGrupoModel";
import { ConfederacionStats } from "../types/resumenTypes";
import toast from "react-hot-toast";

/** Ícono representativo para cada confederación */
const CONF_ICONS: Record<string, string> = {
  CONCACAF: "🌎",
  CONMEBOL: "🌍",
  UEFA: "🏰",
  CAF: "🌍",
  AFC: "🌏",
  OFC: "🌊",
};

export function useResumenData() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [confederaciones, setConfederaciones] = useState<Confederacion[]>([]);
  const [detalles, setDetalles] = useState<DetalleGrupo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Cargamos todo desde la base de datos en paralelo
      const [, , , detalleResult] = await Promise.all([
        fetchGrupos(setGrupos),
        fetchEquipos(setEquipos),
        fetchConfederaciones(setConfederaciones),
        getDetallesGrupo(),
      ]);

      if (detalleResult.error) {
        toast.error("No se pudo obtener la distribución de grupos");
      } else {
        setDetalles((detalleResult.data as DetalleGrupo[]) ?? []);
      }

      setLoading(false);
    };
    loadData();
  }, []);

  // 1. Nombres de confederaciones registradas en la BD
  const confsActivas = confederaciones.map((c) => c.nombre);

  // 2. Estadísticas de equipos por cada confederación de la BD
  const confederacionStats: ConfederacionStats[] = confederaciones.map((c) => {
    // Equipos que pertenecen a esta confederación según el listado maestro
    const equiposConf = equipos.filter((e) => {
      const info = WORLD_CUP_2026.find((p) => p.code3 === e.id);
      return info?.confederation === c.nombre;
    });

    // Equipo mejor rankeado (menor número = mejor ranking)
    const topEquipo =
      equiposConf.length > 0
        ? equiposConf.reduce((prev, curr) =>
            (curr.ranking_fifa ?? Infinity) < (prev.ranking_fifa ?? Infinity)
              ? curr
              : prev
          )
        : null;

    return {
      nombre: c.nombre,
      color: CONF_COLORS[c.nombre] ?? "#6c757d",
      icon: CONF_ICONS[c.nombre] ?? "🏳️",
      totalEquipos: equiposConf.length,
      topEquipo,
    };
  });

  // 3. Distribución de confederaciones por Grupo
  // Construida a partir de detalle_grupo + WORLD_CUP_2026
  const grupoConf: Record<number, Record<string, number>> = {};

  grupos.forEach((g) => {
    if (g.id == null) return;
    grupoConf[g.id] = {};

    // Filtramos los detalles que pertenecen a este grupo
    const equiposDelGrupo = detalles.filter((d) => d.id_grupo === g.id);

    equiposDelGrupo.forEach((d) => {
      // Buscamos la confederación del equipo en el listado maestro
      const info = WORLD_CUP_2026.find((p) => p.code3 === d.id_equipo);
      const confName = info?.confederation;
      if (confName) {
        grupoConf[g.id!][confName] = (grupoConf[g.id!][confName] ?? 0) + 1;
      }
    });
  });

  return {
    grupos,
    equipos,
    grupoConf,
    confsActivas,
    confederacionStats,
    loading,
  };
}