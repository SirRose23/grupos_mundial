import { Equipo } from "@/models/equipo/equipoModel";
import { DetalleGrupo } from "@/models/detalle_grupo/detalleGrupoModel";
import {
  WORLD_CUP_2026,
  CONF_COLORS,
} from "@/components/equipo/eleementos/listadoPaises";
import {
  CONFEDERACIONES_ORDER,
  CONF_ICONS,
} from "../constants/resumenConstants";
import {
  ConfederacionStats,
  EquiposPorConf,
  GrupoConf,
} from "../types/resumenTypes";

export function getConfederacion(code3: string): string | null {
  return WORLD_CUP_2026.find((c) => c.code3 === code3)?.confederation ?? null;
}

export function calcularEquiposPorConf(equipos: Equipo[]): EquiposPorConf {
  const result: EquiposPorConf = {};
  for (const eq of equipos) {
    const conf = getConfederacion(eq.id ?? "");
    if (!conf) continue;
    if (!result[conf]) result[conf] = [];
    result[conf].push(eq);
  }
  return result;
}

export function calcularGrupoConf(
  detalles: DetalleGrupo[],
  equipos: Equipo[]
): GrupoConf {
  const result: GrupoConf = {};
  for (const d of detalles) {
    const eq = equipos.find((e) => e.id === d.id_equipo);
    if (!eq) continue;
    const conf = getConfederacion(eq.id ?? "");
    if (!conf) continue;
    if (!result[d.id_grupo]) result[d.id_grupo] = {};
    result[d.id_grupo][conf] = (result[d.id_grupo][conf] ?? 0) + 1;
  }
  return result;
}

export function calcularConfsActivas(equiposPorConf: EquiposPorConf): string[] {
  return CONFEDERACIONES_ORDER.filter(
    (c) => (equiposPorConf[c]?.length ?? 0) > 0
  );
}

export function calcularTopRankingPorConf(
  equiposPorConf: EquiposPorConf
): Record<string, Equipo> {
  const result: Record<string, Equipo> = {};
  for (const [conf, eqs] of Object.entries(equiposPorConf)) {
    const sorted = [...eqs].sort((a, b) => a.ranking_fifa - b.ranking_fifa);
    if (sorted[0]) result[conf] = sorted[0];
  }
  return result;
}

export function buildConfederacionStats(
  equiposPorConf: EquiposPorConf,
  topRankingPorConf: Record<string, Equipo>
): ConfederacionStats[] {
  return CONFEDERACIONES_ORDER.map((conf) => ({
    nombre: conf,
    color: CONF_COLORS[conf] ?? "#6c757d",
    icon: CONF_ICONS[conf] ?? "🌐",
    totalEquipos: equiposPorConf[conf]?.length ?? 0,
    topEquipo: topRankingPorConf[conf] ?? null,
  }));
}
