import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     // Ensure proper handling of CORS and other server settings
//     cors: true,
//     port: 3000, // Customize if needed
//     strictPort: true, // Prevent fallback to another port if 3000 is occupied
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         // Ensure proper handling of asset filenames
//         assetFileNames: '[name].[ext]',
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       // Define aliases for cleaner imports
//       '@': '/src',
//     },
//   },
//   worker: {
//     // Ensure compatibility for web workers
//     format: 'es', // Use ES module format for workers
//   },
//   optimizeDeps: {
//     include: ['@xenova/transformers'], // Pre-bundle transformers to avoid runtime issues
//   },
// });
