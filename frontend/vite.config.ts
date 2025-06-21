import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "ai-chatbot-frontend-7tdd.onrender.com",
    ],
  },
  build: {
    chunkSizeWarningLimit: 10000, // in kB, e.g., 1000kB = 1MB
  },
});
