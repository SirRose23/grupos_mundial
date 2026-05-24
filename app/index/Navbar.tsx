"use client";

import "./Navbar.css";

export type TabType =
  | "confederaciones"
  | "federaciones"
  | "equipos"
  | "grupos"
  | "resumen";

interface Props {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function Navbar({ activeTab, setActiveTab }: Props) {
  return (
    <nav className="wc-nav sticky-top shadow-sm">
      <div className="wc-stripe"></div>

      <a href="#" className="wc-brand">
        <span className="wc-trophy">🏆</span>
        <div className="wc-brand-text">
          <span className="wc-brand-main">MundialManager</span>
          <span className="wc-brand-sub">FIFA World Cup 2026™</span>
        </div>
      </a>

      <div className="wc-divider"></div>

      <div className="wc-tabs">
        <button
          className={`wc-tab ${activeTab === "confederaciones" ? "wc-tab--active" : ""}`}
          onClick={() => setActiveTab("confederaciones")}
        >
          Confederaciones
        </button>
        <button
          className={`wc-tab ${activeTab === "federaciones" ? "wc-tab--active" : ""}`}
          onClick={() => setActiveTab("federaciones")}
        >
          Federaciones
        </button>
        <button
          className={`wc-tab ${activeTab === "equipos" ? "wc-tab--active" : ""}`}
          onClick={() => setActiveTab("equipos")}
        >
          Equipos Nacionales
        </button>
        <button
          className={`wc-tab wc-tab--grupos ${activeTab === "grupos" ? "wc-tab--active" : ""}`}
          onClick={() => setActiveTab("grupos")}
        >
          Sorteo / Grupos
          <span className="wc-badge"></span>
        </button>
        <button
          className={`wc-tab wc-tab--resumen ${activeTab === "resumen" ? "wc-tab--active" : ""}`}
          onClick={() => setActiveTab("resumen")}
        >
          Resumen
        </button>
      </div>
    </nav>
  );
}
