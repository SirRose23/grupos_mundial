import { useState, useEffect } from "react";
import { Grupo } from "@/models/grupo/grupoModel";
import { DetalleGrupo } from "@/models/detalle_grupo/detalleGrupoModel";
import { Equipo } from "@/models/equipo/equipoModel";
import { fetchGrupos } from "@/controllers/grupo/grupoController";
import { fetchDetallesGrupo } from "@/controllers/detalle_grupo/detalleGrupoController";
import { fetchEquipos } from "@/controllers/equipos/equipoController";
import {
  calcularEquiposPorConf,
  calcularGrupoConf,
  calcularConfsActivas,
  calcularTopRankingPorConf,
  buildConfederacionStats,
} from "../utils/resumenUtils";
import {
  ConfederacionStats,
  EquiposPorConf,
  GrupoConf,
} from "../types/resumenTypes";

export interface UseResumenDataReturn {
  grupos: Grupo[];
  equipos: Equipo[];
  equiposPorConf: EquiposPorConf;
  grupoConf: GrupoConf;
  confsActivas: string[];
  confederacionStats: ConfederacionStats[];
}

export function useResumenData(): UseResumenDataReturn {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [detalles, setDetalles] = useState<DetalleGrupo[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);

  useEffect(() => {
    fetchGrupos(setGrupos);
    fetchDetallesGrupo(setDetalles);
    fetchEquipos(setEquipos);
  }, []);

  const equiposPorConf = calcularEquiposPorConf(equipos);
  const grupoConf = calcularGrupoConf(detalles, equipos);
  const confsActivas = calcularConfsActivas(equiposPorConf);
  const topRankingPorConf = calcularTopRankingPorConf(equiposPorConf);
  const confederacionStats = buildConfederacionStats(
    equiposPorConf,
    topRankingPorConf
  );

  return {
    grupos,
    equipos,
    equiposPorConf,
    grupoConf,
    confsActivas,
    confederacionStats,
  };
}
