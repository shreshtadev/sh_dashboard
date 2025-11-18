import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { vendureDashboardPlugin } from "@vendure/dashboard/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const apiHost = process.env.VENDURE_API_HOST;
const apiPort = process.env.VENDURE_API_PORT
  ? parseInt(process.env.VENDURE_API_PORT, 10)
  : undefined;
export default defineConfig({
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
});
