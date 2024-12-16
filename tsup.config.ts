import { defineConfig } from "tsup";

export default defineConfig({
    format: [
        "cjs",
        "esm"
    ],
    entry: [
        "./src/index.ts"
    ],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
});
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */