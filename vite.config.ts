import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { Buffer } from "buffer";
import { tempo } from "tempo-devtools/dist/vite"; // Add tempo import

// Polyfill Buffer for the browser
globalThis.Buffer = Buffer;

// Add this block of code for conditional plugins
const conditionalPlugins = [];
if (process.env.TEMPO === "true") {
  conditionalPlugins.push("tempo-devtools/dist/babel-plugin");
}

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [...conditionalPlugins],
      },
    }),
    tempo(), // Add the tempo plugin
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  define: {
    "process.env": {},
    global: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: "buffer",
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
    proxy: {
      "/auth/v1": {
        target: "https://cfbkroydnewghbokycek.supabase.co",
        changeOrigin: true,
      },
    },
  },
});
