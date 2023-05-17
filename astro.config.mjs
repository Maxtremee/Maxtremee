import { defineConfig } from "astro/config"

import vercelStatic from "@astrojs/vercel/static"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  adapter: vercelStatic(),
  experimental: {
    assets: true,
  },
})
