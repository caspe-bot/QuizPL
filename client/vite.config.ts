import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(), // obsługa React + TSX
    tsconfigPaths(), // obsługa aliasów z tsconfig.json
  ],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist/public", // zgodne z vercel.json
  },
});
