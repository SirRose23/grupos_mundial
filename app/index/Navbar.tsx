"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.css";

export type TabType =
  | "confederaciones"
  | "federaciones"
  | "equipos"
  | "grupos"
  | "resumen";

export default function Navbar() {
  const pathname = usePathname();

  // Función para determinar si la pestaña está activa basándose en la URL
  const getActiveClass = (path: string) => {
    // Si estamos en el home (/), resaltamos "Resumen"
    if (pathname === "/" && path === "/resumen") return "wc-tab--active";
    
    return pathname === path ? "wc-tab--active" : "";
  };

  return (
    <nav className="wc-nav sticky-top shadow-sm">
      <div className="wc-stripe"></div>

      <Link href="/" className="wc-brand text-decoration-none">
        <span className="wc-trophy">🏆</span>
        <div className="wc-brand-text">
          <span className="wc-brand-main">MundialManager</span>
          <span className="wc-brand-sub">FIFA World Cup 2026™</span>
        </div>
      </Link>

      <div className="wc-divider"></div>

      <div className="wc-tabs">
        <Link
          href="/resumen"
          className={`wc-tab wc-tab--resumen text-decoration-none ${getActiveClass("/resumen")}`}
        >
          Resumen
        </Link>
        <Link
          href="/confederaciones"
          className={`wc-tab text-decoration-none ${getActiveClass("/confederaciones")}`}
        >
          Confederaciones
        </Link>
        <Link
          href="/federaciones"
          className={`wc-tab text-decoration-none ${getActiveClass("/federaciones")}`}
        >
          Federaciones
        </Link>
        <Link
          href="/equipos"
          className={`wc-tab text-decoration-none ${getActiveClass("/equipos")}`}
        >
          Equipos Nacionales
        </Link>
        <Link
          href="/grupos"
          className={`wc-tab wc-tab--grupos text-decoration-none ${getActiveClass("/grupos")}`}
        >
          Sorteo / Grupos
          <span className="wc-badge"></span>
        </Link>
      </div>
    </nav>
  );
}
