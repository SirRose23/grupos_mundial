import fs from "fs";
import path from "path";
import Link from "next/link";

// Helper to recursively gather routes from the app directory
type RouteInfo = {
  name: string;
  route: string;
  filePath: string;
};

function gatherRoutes(dir: string, basePath = ""): RouteInfo[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes: RouteInfo[] = [];

  for (const entry of entries) {
    // Skip hidden or special files
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subBase = path.join(basePath, entry.name);
      routes.push(...gatherRoutes(fullPath, subBase));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (![".tsx", ".jsx", ".ts", ".js"].includes(ext)) continue;

      const nameWithoutExt = entry.name.replace(ext, "");
      // Skip layout files – they are not routes themselves
      if (nameWithoutExt === "layout") continue;

      let routePath: string;
      if (nameWithoutExt === "page") {
        // root of the folder
        routePath = "/" + basePath.replace(/\\/g, "/");
      } else {
        routePath =
          "/" + path.join(basePath, nameWithoutExt).replace(/\\/g, "/");
      }
      // Normalize multiple slashes
      routePath = routePath.replace(/\/+/g, "/");
      routes.push({
        name: nameWithoutExt,
        route: routePath,
        filePath: fullPath,
      });
    }
  }

  return routes;
}

const routes = gatherRoutes(path.join(process.cwd(), "app"));

export default function RouteVisualizer() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Route Visualizer</h1>
      <p className="mb-4 text-gray-600">Lista de rutas detectadas en el sistema:</p>
      <ul className="list-disc pl-6">
        {routes.map((r) => (
          <li key={r.route}>
            <Link href={r.route} className="text-blue-600 hover:underline">
              {r.route}
            </Link>
            <span className="text-sm text-gray-500 ml-2">({r.filePath})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
