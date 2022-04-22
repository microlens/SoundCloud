import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://retro90s-soundcloud.netlify.app",
  integrations: [svelte()],
});
