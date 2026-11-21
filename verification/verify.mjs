import { chdir } from "node:process";
import { fileURLToPath } from "node:url";

chdir(fileURLToPath(new URL("..", import.meta.url)));
await import("../scripts/validate-template.mjs");
