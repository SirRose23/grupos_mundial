import { useState, useRef, useEffect } from "react";

export interface Country {
  code: string;
  code3: string;
  name: string;
  flag: string;
  confederation: string;
  federacionNombre: string;
  region: string;
}

export const WORLD_CUP_2026: Country[] = [
  // CONCACAF (8)
  {
    code: "US",
    code3: "USA",
    name: "Estados Unidos",
    flag: "🇺🇸",
    confederation: "CONCACAF",
    federacionNombre: "United States Soccer Federation (USSF)",
    region: "América del Norte",
  },
  {
    code: "MX",
    code3: "MEX",
    name: "México",
    flag: "🇲🇽",
    confederation: "CONCACAF",
    federacionNombre: "Federación Mexicana de Fútbol (FMF)",
    region: "América del Norte",
  },
  {
    code: "CA",
    code3: "CAN",
    name: "Canadá",
    flag: "🇨🇦",
    confederation: "CONCACAF",
    federacionNombre: "Canada Soccer",
    region: "América del Norte",
  },
  {
    code: "PA",
    code3: "PAN",
    name: "Panamá",
    flag: "🇵🇦",
    confederation: "CONCACAF",
    federacionNombre: "Federación Panameña de Fútbol (FEPAFUT)",
    region: "América Central",
  },
  {
    code: "HT",
    code3: "HAI",
    name: "Haití",
    flag: "🇭🇹",
    confederation: "CONCACAF",
    federacionNombre: "Fédération Haïtienne de Football (FHF)",
    region: "Caribe",
  },
  {
    code: "CW",
    code3: "CUW",
    name: "Curazao",
    flag: "🇨🇼",
    confederation: "CONCACAF",
    federacionNombre: "Federashon Futbòl Kòrsou (FFK)",
    region: "Caribe",
  },
  {
    code: "JM",
    code3: "JAM",
    name: "Jamaica",
    flag: "🇯🇲",
    confederation: "CONCACAF",
    federacionNombre: "Jamaica Football Federation (JFF)",
    region: "Caribe",
  },
  {
    code: "SR",
    code3: "SUR",
    name: "Surinam",
    flag: "🇸🇷",
    confederation: "CONCACAF",
    federacionNombre: "Surinaamse Voetbal Bond (SVB)",
    region: "Caribe",
  },
  // CONMEBOL (7)
  {
    code: "AR",
    code3: "ARG",
    name: "Argentina",
    flag: "🇦🇷",
    confederation: "CONMEBOL",
    federacionNombre: "Asociación del Fútbol Argentino (AFA)",
    region: "América del Sur",
  },
  {
    code: "BR",
    code3: "BRA",
    name: "Brasil",
    flag: "🇧🇷",
    confederation: "CONMEBOL",
    federacionNombre: "Confederação Brasileira de Futebol (CBF)",
    region: "América del Sur",
  },
  {
    code: "CO",
    code3: "COL",
    name: "Colombia",
    flag: "🇨🇴",
    confederation: "CONMEBOL",
    federacionNombre: "Federación Colombiana de Fútbol (FCF)",
    region: "América del Sur",
  },
  {
    code: "EC",
    code3: "ECU",
    name: "Ecuador",
    flag: "🇪🇨",
    confederation: "CONMEBOL",
    federacionNombre: "Federación Ecuatoriana de Fútbol (FEF)",
    region: "América del Sur",
  },
  {
    code: "UY",
    code3: "URU",
    name: "Uruguay",
    flag: "🇺🇾",
    confederation: "CONMEBOL",
    federacionNombre: "Asociación Uruguaya de Fútbol (AUF)",
    region: "América del Sur",
  },
  {
    code: "PY",
    code3: "PAR",
    name: "Paraguay",
    flag: "🇵🇾",
    confederation: "CONMEBOL",
    federacionNombre: "Asociación Paraguaya de Fútbol (APF)",
    region: "América del Sur",
  },
  {
    code: "BO",
    code3: "BOL",
    name: "Bolivia",
    flag: "🇧🇴",
    confederation: "CONMEBOL",
    federacionNombre: "Federación Boliviana de Fútbol (FBF)",
    region: "América del Sur",
  },
  // UEFA (16)
  {
    code: "ES",
    code3: "ESP",
    name: "España",
    flag: "🇪🇸",
    confederation: "UEFA",
    federacionNombre: "Real Federación Española de Fútbol (RFEF)",
    region: "Europa",
  },
  {
    code: "FR",
    code3: "FRA",
    name: "Francia",
    flag: "🇫🇷",
    confederation: "UEFA",
    federacionNombre: "Fédération Française de Football (FFF)",
    region: "Europa",
  },
  {
    code: "DE",
    code3: "GER",
    name: "Alemania",
    flag: "🇩🇪",
    confederation: "UEFA",
    federacionNombre: "Deutscher Fußball-Bund (DFB)",
    region: "Europa",
  },
  {
    code: "GB-ENG",
    code3: "ENG",
    name: "Inglaterra",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    confederation: "UEFA",
    federacionNombre: "The Football Association (FA)",
    region: "Europa",
  },
  {
    code: "PT",
    code3: "POR",
    name: "Portugal",
    flag: "🇵🇹",
    confederation: "UEFA",
    federacionNombre: "Federação Portuguesa de Futebol (FPF)",
    region: "Europa",
  },
  {
    code: "NL",
    code3: "NED",
    name: "Países Bajos",
    flag: "🇳🇱",
    confederation: "UEFA",
    federacionNombre: "Koninklijke Nederlandse Voetbalbond (KNVB)",
    region: "Europa",
  },
  {
    code: "BE",
    code3: "BEL",
    name: "Bélgica",
    flag: "🇧🇪",
    confederation: "UEFA",
    federacionNombre: "Union Royale Belge des Sociétés de Football (URBSFA)",
    region: "Europa",
  },
  {
    code: "HR",
    code3: "CRO",
    name: "Croacia",
    flag: "🇭🇷",
    confederation: "UEFA",
    federacionNombre: "Hrvatski Nogometni Savez (HNS)",
    region: "Europa",
  },
  {
    code: "NO",
    code3: "NOR",
    name: "Noruega",
    flag: "🇳🇴",
    confederation: "UEFA",
    federacionNombre: "Norges Fotballforbund (NFF)",
    region: "Europa",
  },
  {
    code: "AT",
    code3: "AUT",
    name: "Austria",
    flag: "🇦🇹",
    confederation: "UEFA",
    federacionNombre: "Österreichischer Fußball-Bund (ÖFB)",
    region: "Europa",
  },
  {
    code: "CH",
    code3: "SUI",
    name: "Suiza",
    flag: "🇨🇭",
    confederation: "UEFA",
    federacionNombre: "Schweizerischer Fussballverband (SFV)",
    region: "Europa",
  },
  {
    code: "GB-SCT",
    code3: "SCO",
    name: "Escocia",
    flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    confederation: "UEFA",
    federacionNombre: "Scottish Football Association (SFA)",
    region: "Europa",
  },
  {
    code: "TR",
    code3: "TUR",
    name: "Turquía",
    flag: "🇹🇷",
    confederation: "UEFA",
    federacionNombre: "Türkiye Futbol Federasyonu (TFF)",
    region: "Europa",
  },
  {
    code: "BA",
    code3: "BIH",
    name: "Bosnia y Herzegovina",
    flag: "🇧🇦",
    confederation: "UEFA",
    federacionNombre: "Fudbalski Savez Bosne i Hercegovine (FSBIH)",
    region: "Europa",
  },
  {
    code: "SE",
    code3: "SWE",
    name: "Suecia",
    flag: "🇸🇪",
    confederation: "UEFA",
    federacionNombre: "Svenska Fotbollförbundet (SvFF)",
    region: "Europa",
  },
  {
    code: "CZ",
    code3: "CZE",
    name: "República Checa",
    flag: "🇨🇿",
    confederation: "UEFA",
    federacionNombre: "Fotbalová asociace České republiky (FAČR)",
    region: "Europa",
  },
  // CAF - África (10)
  {
    code: "MA",
    code3: "MAR",
    name: "Marruecos",
    flag: "🇲🇦",
    confederation: "CAF",
    federacionNombre: "Fédération Royale Marocaine de Football (FRMF)",
    region: "África del Norte",
  },
  {
    code: "TN",
    code3: "TUN",
    name: "Túnez",
    flag: "🇹🇳",
    confederation: "CAF",
    federacionNombre: "Fédération Tunisienne de Football (FTF)",
    region: "África del Norte",
  },
  {
    code: "EG",
    code3: "EGY",
    name: "Egipto",
    flag: "🇪🇬",
    confederation: "CAF",
    federacionNombre: "Egyptian Football Association (EFA)",
    region: "África del Norte",
  },
  {
    code: "DZ",
    code3: "ALG",
    name: "Argelia",
    flag: "🇩🇿",
    confederation: "CAF",
    federacionNombre: "Fédération Algérienne de Football (FAF)",
    region: "África del Norte",
  },
  {
    code: "GH",
    code3: "GHA",
    name: "Ghana",
    flag: "🇬🇭",
    confederation: "CAF",
    federacionNombre: "Ghana Football Association (GFA)",
    region: "África Occidental",
  },
  {
    code: "CV",
    code3: "CPV",
    name: "Cabo Verde",
    flag: "🇨🇻",
    confederation: "CAF",
    federacionNombre: "Federação Cabo-verdiana de Futebol (FCF)",
    region: "África Occidental",
  },
  {
    code: "ZA",
    code3: "RSA",
    name: "Sudáfrica",
    flag: "🇿🇦",
    confederation: "CAF",
    federacionNombre: "South African Football Association (SAFA)",
    region: "África del Sur",
  },
  {
    code: "CI",
    code3: "CIV",
    name: "Costa de Marfil",
    flag: "🇨🇮",
    confederation: "CAF",
    federacionNombre: "Fédération Ivoirienne de Football (FIF)",
    region: "África Occidental",
  },
  {
    code: "SN",
    code3: "SEN",
    name: "Senegal",
    flag: "🇸🇳",
    confederation: "CAF",
    federacionNombre: "Fédération Sénégalaise de Football (FSF)",
    region: "África Occidental",
  },
  {
    code: "CD",
    code3: "COD",
    name: "Rep. Dem. del Congo",
    flag: "🇨🇩",
    confederation: "CAF",
    federacionNombre: "Fédération Congolaise de Football-Association (Fécofa)",
    region: "África Central",
  },
  // AFC - Asia (9)
  {
    code: "JP",
    code3: "JPN",
    name: "Japón",
    flag: "🇯🇵",
    confederation: "AFC",
    federacionNombre: "Japan Football Association (JFA)",
    region: "Asia Oriental",
  },
  {
    code: "IR",
    code3: "IRN",
    name: "Irán",
    flag: "🇮🇷",
    confederation: "AFC",
    federacionNombre:
      "Football Federation of the Islamic Republic of Iran (FFIRI)",
    region: "Asia Occidental",
  },
  {
    code: "UZ",
    code3: "UZB",
    name: "Uzbekistán",
    flag: "🇺🇿",
    confederation: "AFC",
    federacionNombre: "Uzbekistan Football Association (UFA)",
    region: "Asia Central",
  },
  {
    code: "KR",
    code3: "KOR",
    name: "Corea del Sur",
    flag: "🇰🇷",
    confederation: "AFC",
    federacionNombre: "Korea Football Association (KFA)",
    region: "Asia Oriental",
  },
  {
    code: "JO",
    code3: "JOR",
    name: "Jordania",
    flag: "🇯🇴",
    confederation: "AFC",
    federacionNombre: "Jordan Football Association (JFA)",
    region: "Asia Occidental",
  },
  {
    code: "AU",
    code3: "AUS",
    name: "Australia",
    flag: "🇦🇺",
    confederation: "AFC",
    federacionNombre: "Football Australia (FA)",
    region: "Oceanía",
  },
  {
    code: "QA",
    code3: "QAT",
    name: "Qatar",
    flag: "🇶🇦",
    confederation: "AFC",
    federacionNombre: "Qatar Football Association (QFA)",
    region: "Asia Occidental",
  },
  {
    code: "SA",
    code3: "KSA",
    name: "Arabia Saudita",
    flag: "🇸🇦",
    confederation: "AFC",
    federacionNombre: "Saudi Arabian Football Federation (SAFF)",
    region: "Asia Occidental",
  },
  {
    code: "IQ",
    code3: "IRQ",
    name: "Irak",
    flag: "🇮🇶",
    confederation: "AFC",
    federacionNombre: "Iraq Football Association (IFA)",
    region: "Asia Occidental",
  },
  // OFC - Oceanía (1)
  {
    code: "NZ",
    code3: "NZL",
    name: "Nueva Zelanda",
    flag: "🇳🇿",
    confederation: "OFC",
    federacionNombre: "New Zealand Football (NZF)",
    region: "Oceanía",
  },
];

export const CONF_COLORS: Record<string, string> = {
  CONCACAF: "#3b82f6",
  CONMEBOL: "#f59e0b",
  UEFA: "#6366f1",
  CAF: "#10b981",
  AFC: "#ef4444",
  OFC: "#8b5cf6",
};

/** Región geográfica oficial de cada confederación FIFA */
export const CONF_REGIONS: Record<string, string> = {
  UEFA: "Europa",
  CONMEBOL: "América del Sur",
  CONCACAF: "América del Norte, Central y Caribe",
  CAF: "África",
  AFC: "Asia",
  OFC: "Oceanía",
};

interface CountrySelectProps {
  value?: string;
  onChange?: (country: Country | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function WorldCupSelect({
  value,
  onChange,
  placeholder = "Selecciona un país",
  disabled = false,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterConf, setFilterConf] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = WORLD_CUP_2026.find((c) => c.code3 === value) ?? null;

  const filtered = WORLD_CUP_2026.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code3.toLowerCase().includes(search.toLowerCase());
    const matchConf = filterConf ? c.confederation === filterConf : true;
    return matchSearch && matchConf;
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSelect = (country: Country) => {
    onChange?.(country);
    setOpen(false);
    setSearch("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
  };

  const confederations = Array.from(
    new Set(WORLD_CUP_2026.map((c) => c.confederation)),
  );

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", maxWidth: 400 }}
    >
      {/* Trigger button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "11px 14px",
          border: `2px solid ${open ? "#6366f1" : "#e5e7eb"}`,
          borderRadius: 12,
          background: disabled ? "#f9fafb" : "#fff",
          cursor: disabled ? "not-allowed" : "pointer",
          fontSize: 15,
          color: selected ? "#111827" : "#9ca3af",
          boxShadow: open
            ? "0 0 0 3px rgba(99,102,241,0.12)"
            : "0 1px 3px rgba(0,0,0,0.06)",
          transition: "all 0.15s",
          gap: 8,
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flex: 1,
            minWidth: 0,
          }}
        >
          {selected ? (
            <>
              <span style={{ fontSize: 22 }}>{selected.flag}</span>
              <span style={{ fontWeight: 600, color: "#111827" }}>
                {selected.name}
              </span>
              <span
                style={{
                  background: CONF_COLORS[selected.confederation] + "22",
                  color: CONF_COLORS[selected.confederation],
                  border: `1px solid ${CONF_COLORS[selected.confederation]}44`,
                  borderRadius: 6,
                  padding: "1px 7px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                  flexShrink: 0,
                }}
              >
                {selected.code3}
              </span>
            </>
          ) : (
            <span style={{ fontSize: 14 }}>{placeholder}</span>
          )}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flexShrink: 0,
          }}
        >
          {selected && !disabled && (
            <span
              onClick={handleClear}
              style={{
                color: "#9ca3af",
                cursor: "pointer",
                fontSize: 14,
                padding: "0 2px",
              }}
              title="Limpiar"
            >
              ✕
            </span>
          )}
          <span
            style={{
              color: "#6b7280",
              fontSize: 12,
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
              display: "inline-block",
            }}
          >
            ▾
          </span>
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            borderRadius: 12,
            boxShadow: "0 12px 40px rgba(0,0,0,0.13)",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          {/* Search */}
          <div style={{ padding: "10px 10px 6px" }}>
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍  Buscar por país o código..."
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1.5px solid #e5e7eb",
                borderRadius: 8,
                fontSize: 13,
                outline: "none",
                boxSizing: "border-box",
                background: "#f9fafb",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: 4,
              padding: "4px 10px 8px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setFilterConf(null)}
              style={{
                padding: "3px 9px",
                border: `1.5px solid ${filterConf === null ? "#6366f1" : "#e5e7eb"}`,
                borderRadius: 20,
                background: filterConf === null ? "#eef2ff" : "#fff",
                color: filterConf === null ? "#4338ca" : "#6b7280",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Todos
            </button>
            {confederations.map((conf) => (
              <button
                key={conf}
                onClick={() => setFilterConf(filterConf === conf ? null : conf)}
                style={{
                  padding: "3px 9px",
                  border: `1.5px solid ${filterConf === conf ? CONF_COLORS[conf] : "#e5e7eb"}`,
                  borderRadius: 20,
                  background:
                    filterConf === conf ? CONF_COLORS[conf] + "22" : "#fff",
                  color: filterConf === conf ? CONF_COLORS[conf] : "#6b7280",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {conf}
              </button>
            ))}
          </div>

          {/* Listado de paises */}
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "4px 0",
              maxHeight: 260,
              overflowY: "auto",
              borderTop: "1px solid #f3f4f6",
            }}
          >
            {filtered.length === 0 ? (
              <li
                style={{
                  padding: "14px 16px",
                  color: "#9ca3af",
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                Sin resultados
              </li>
            ) : (
              filtered.map((country) => {
                const isSelected = value === country.code3;
                return (
                  <li
                    key={country.code3}
                    onClick={() => handleSelect(country)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 14px",
                      cursor: "pointer",
                      background: isSelected ? "#eef2ff" : "transparent",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected)
                        (e.currentTarget as HTMLElement).style.background =
                          "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected)
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                    }}
                  >
                    <span
                      style={{ fontSize: 20, width: 28, textAlign: "center" }}
                    >
                      {country.flag}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontSize: 14,
                        color: isSelected ? "#4338ca" : "#111827",
                        fontWeight: isSelected ? 600 : 400,
                      }}
                    >
                      {country.name}
                    </span>
                    <span
                      style={{
                        background: CONF_COLORS[country.confederation] + "18",
                        color: CONF_COLORS[country.confederation],
                        borderRadius: 5,
                        padding: "2px 7px",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 0.8,
                        minWidth: 36,
                        textAlign: "center",
                      }}
                    >
                      {country.code3}
                    </span>
                    {isSelected && (
                      <span style={{ color: "#6366f1", fontSize: 14 }}>✓</span>
                    )}
                  </li>
                );
              })
            )}
          </ul>

          <div
            style={{ padding: "6px 14px 8px", borderTop: "1px solid #f3f4f6" }}
          >
            <span style={{ fontSize: 11, color: "#9ca3af" }}>
              {filtered.length} de 48 selecciones — FIFA World Cup 2026
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [country, setCountry] = useState<Country | null>(null);

  return (
    <div
      style={{
        padding: 40,
        fontFamily: "system-ui, sans-serif",
        maxWidth: 500,
      }}
    >
      <div
        style={{
          marginBottom: 6,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 22 }}>🏆</span>
        <h2 style={{ margin: 0, fontSize: 20, color: "#111827" }}>
          FIFA World Cup 2026
        </h2>
      </div>
      <p style={{ marginBottom: 20, color: "#6b7280", fontSize: 13 }}>
        48 selecciones clasificadas
      </p>

      <WorldCupSelect
        value={country?.code3}
        onChange={(c) => setCountry(c)}
        placeholder="Selecciona una selección..."
      />

      {country && (
        <div
          style={{
            marginTop: 16,
            padding: "14px 16px",
            background: "#f8faff",
            borderRadius: 10,
            border: `1.5px solid ${CONF_COLORS[country.confederation]}33`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 32 }}>{country.flag}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>
              {country.name}
            </div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
              Código FIFA:{" "}
              <code
                style={{
                  background: CONF_COLORS[country.confederation] + "22",
                  color: CONF_COLORS[country.confederation],
                  padding: "1px 6px",
                  borderRadius: 4,
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {country.code3}
              </code>
              {" · "}
              Confederación:{" "}
              <strong style={{ color: CONF_COLORS[country.confederation] }}>
                {country.confederation}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
