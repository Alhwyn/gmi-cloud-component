import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execPath } from "node:process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const verify = join(root, "verification/verify.mjs");
const validator = join(root, "scripts/validate-template.mjs");

function run(script, cwd) {
  const result = spawnSync(execPath, [script], { cwd, encoding: "utf8" });
  assert.ifError(result.error);
  return result;
}

function copyPluginLayout(t) {
  const directory = mkdtempSync(join(tmpdir(), "gmi-cloud-plugin-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  for (const entry of [".cursor-plugin", "plugins"]) {
    cpSync(join(root, entry), join(directory, entry), { recursive: true });
  }
  return directory;
}

test("the committed plugin layout passes verification from outside the repo", () => {
  const { status, stdout, stderr } = run(verify, tmpdir());
  assert.equal(status, 0, stderr);
  assert.match(stdout, /Validation passed\./);
});

test("verification rejects a missing logo referenced by the plugin manifest", (t) => {
  const directory = copyPluginLayout(t);
  rmSync(join(directory, "plugins/gmi-cloud-component/assets/logo.svg"));

  const { status, stderr } = run(validator, directory);
  assert.equal(status, 1, stderr);
  assert.match(stderr, /field "logo" references missing path "assets\/logo\.svg"/);
});

test("verification rejects a skill without Cursor frontmatter", (t) => {
  const directory = copyPluginLayout(t);
  writeFileSync(join(directory, "plugins/gmi-cloud-component/skills/gmi-cloud-inference/SKILL.md"), "# Missing frontmatter\n");

  const { status, stderr } = run(validator, directory);
  assert.equal(status, 1, stderr);
  assert.match(stderr, /skill file missing YAML frontmatter/);
});
