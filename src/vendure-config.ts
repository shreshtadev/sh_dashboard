import { join } from "node:path";
import type { VendureConfig } from "@vendure/core";
import { DashboardPlugin } from "@vendure/dashboard/plugin";

export const config: VendureConfig = {
  apiOptions: {
    port: 3000,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",
  },
  authOptions: {
    superadminCredentials: {
      identifier: process.env.SUPERADMIN_USERNAME || "admin1",
      password: process.env.SUPERADMIN_PASSWORD || "password1",
    },
    tokenMethod: "bearer",
  },
  dbConnectionOptions: {
    type: "sqlite",
    database: ":memory:", // can be dummy, not used by dashboard build
    synchronize: false,
  },
  paymentOptions: {
    paymentMethodHandlers: [],
  },
  plugins: [
    DashboardPlugin.init({
      route: "dashboard",
      appDir: join(__dirname, "./dist"),
      viteDevServerPort: 5173,
    }),
  ],
};
