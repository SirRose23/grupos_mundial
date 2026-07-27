# Grupos Mundial

Aplicación web para la gestión y organización de un torneo mundial de fútbol: confederaciones, federaciones, equipos y grupos, incluyendo generación automática de grupos y un dashboard de resumen con estadísticas por confederación.

## Funcionalidades

- CRUD de Confederaciones (ej. CONMEBOL, UEFA, CONCACAF)
- CRUD de Federaciones asociadas a cada confederación
- CRUD de Equipos, con relación a su federación/país
- Generador de Grupos y gestión de detalle de grupo (equipos asignados a cada grupo)
- Dashboard de resumen con estadísticas: total de equipos, total de grupos, confederaciones activas, distribución de equipos por confederación y su equipo destacado
- Visualizador de rutas del torneo (route-visualizer)
- Notificaciones con toasts y alertas (react-hot-toast, SweetAlert2)

## Stack técnico

- Next.js 16 (App Router) + React 19
- TypeScript
- Supabase (base de datos y backend)
- Tailwind CSS + Bootstrap 5
- ESLint

## Estructura

```
app/
  ├── page.tsx                  # Dashboard principal
  ├── equipos/page.tsx          # Gestión de equipos
  ├── confederaciones/page.tsx  # Gestión de confederaciones
  ├── federaciones/page.tsx     # Gestión de federaciones
  ├── grupos/page.tsx           # Gestión de grupos
  ├── resumen/page.tsx          # Dashboard de estadísticas
  └── route-visualizer/page.tsx # Visualizador de rutas del torneo

models/          # Modelos de datos (equipo, confederación, federación, grupo, detalles)
controllers/     # Lógica de acceso a datos por entidad
components/      # Componentes de UI (tablas, formularios, vistas) organizados por entidad
lib/supabase.js  # Cliente de conexión a Supabase
```

## Cómo ejecutarlo

Requiere un proyecto de Supabase configurado con las variables de entorno correspondientes.

```bash
git clone https://github.com/SirRose23/grupos_mundial.git
cd grupos_mundial
npm install
npm run dev
```

Abre `http://localhost:3000` en el navegador.

## Contexto

Proyecto que aplica una arquitectura por capas (modelos, controladores y componentes separados por entidad) para gestionar de forma escalable la organización de un torneo de fútbol tipo mundial.
