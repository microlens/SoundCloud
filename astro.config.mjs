import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://astro-sound.netlify.app",
  integrations: [svelte()],
});
