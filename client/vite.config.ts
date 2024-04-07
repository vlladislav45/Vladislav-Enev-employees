import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const config = {
    optimizeDeps: { include: ['react-router-dom'] },
    plugins: [react()],
    server: {
      host: '0.0.0.0', // Set the host to 0.0.0.0 to make the server accessible from any device on the network
    },
    build: {
      // rollupOptions: {
      //   external: ['react', 'react-dom', 'react-router', 'react-router-dom', 'react-redux'],
      //   output: {
      //     globals: {
      //       'react': 'React',
      //       'react-dom': 'ReactDOM',
      //       'react-router': 'ReactRouter',
      //       'react-router-dom': 'ReactRouterDOM',
      //       'react-redux': 'ReactRedux',
      //     },
      //   },
      // },
    },
  };

  if (command !== 'serve') {
    // @ts-ignore
    config.base = env.VITE_BASE_URL;
  }


  return config;
});


