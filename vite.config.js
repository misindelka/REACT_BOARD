import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],

  /**
   * Use this if you're on Windows using WSL and automatic reloading is not working
   * @see https://github.com/vitejs/vite/issues/1153#issuecomment-785467271
   */
  // server: {
  //   watch: {
  //     usePolling: true,
  //   },
  // },
})
