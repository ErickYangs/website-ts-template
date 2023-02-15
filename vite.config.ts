import { defineConfig } from "vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
import path from "path";
import viteCompression from "vite-plugin-compression";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [
    vue(),
    viteCompression(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/mixin.scss" as *;`,
      },
    },
    postcss: {
      plugins: [
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-var-requires,global-require
        autoprefixer({
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
            "> 1%",
          ],
          grid: true,
        }),
        {
          postcssPlugin: "internal:charset-removal",
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === "charset") {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
  define: {
    "process.env": {}, // for wallet connect
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      exclude: [
        "node_modules/lodash-es/**",
        "node_modules/@types/lodash-es/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      util: "util", // for wallet connect
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@img": path.resolve(__dirname, "./src/assets/images"),
    },
  },
});
