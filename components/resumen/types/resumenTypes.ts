import { Grupo } from "@/models/grupo/grupoModel";
import { Equipo } from "@/models/equipo/equipoModel";

export interface ConfederacionStats {
  nombre: string;
  color: string;
  icon: string;
  totalEquipos: number;
  topEquipo: Equipo | null;
}

export interface ResumenStats {
  totalEquipos: number;
  totalGrupos: number;
  totalConfsActivas: number;
}

export type EquiposPorConf = Record<string, Equipo[]>;
export type GrupoConf = Record<number, Record<string, number>>;
