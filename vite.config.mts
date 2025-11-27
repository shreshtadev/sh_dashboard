import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { vendureDashboardPlugin } from "@vendure/dashboard/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const envz = loadEnv(mode, process.cwd(), "VITE_");
  const apiHost = envz.VITE_VENDURE_API_HOST;
  const apiPort = envz.VITE_VENDURE_API_PORT
    ? parseInt(envz.VITE_VENDURE_API_PORT, 10)
    : undefined;
  return {
    base: "/dashboard",
    plugins: [
      react(),
      vendureDashboardPlugin({
        vendureConfigPath: pathToFileURL(
          resolve(__dirname, "./src/vendure-config.ts"),
        ),
        vendureConfigExport: "config",
        api: apiPort ? { host: apiHost, port: apiPort } : { host: apiHost },
        gqlOutputPath: resolve(__dirname, "./src/gql/"),
      }) as unknown as any,
    ],
    resolve: {
      alias: {
        // This allows all plugins to reference a shared set of
        // GraphQL types.
        "@/gql": resolve(__dirname, "./src/gql/graphql.ts"),
      },
    },
  };
});
