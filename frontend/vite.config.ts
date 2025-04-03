import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000, // Порт для локального сервера
        open: true, // Автоматически открывать браузер при запуске
    },
    build: {
        outDir: 'dist', // Директория для сборки
        sourcemap: true, // Включить sourcemaps для отладки
    },
});
