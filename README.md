# gmi-cloud-component

A Cursor plugin scaffold for working with [GMI Cloud inference](https://docs.gmicloud.ai/inference-engine/ie-intro). It provides a Cursor rule and skill for integrating or reviewing GMI Cloud inference calls; it does not invoke the API itself.

This repository follows the [official Cursor plugin template](https://github.com/cursor/plugin-template/tree/46216072ac5750f782f95bb325b4d12b7c3ae9c9), using its marketplace layout with one plugin based on the simple starter.

## Repository layout

- `.cursor-plugin/marketplace.json` registers the plugin.
- `plugins/gmi-cloud-component/` contains the plugin manifest, rule, skill, and logo.
- `scripts/validate-template.mjs` is the Cursor template validator.
- `test/` contains automated tests for valid and broken plugin layouts.
- `verification/` contains the local plugin verification entry point.

## Local checks

From the repository root, use Node.js 22 or newer. No package installation, network access, or GMI Cloud credentials are required.

```sh
node --test
node verification/verify.mjs
```

Verification checks the marketplace entry, plugin manifest, referenced assets, and rule and skill frontmatter. The template validator reports optional hooks and MCP configuration as warnings; this scaffold intentionally does not include either.
