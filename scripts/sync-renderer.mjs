#!/usr/bin/env node
/**
 * sync-renderer — vendor the studio builder renderer into this template.
 *
 * The published site template is a standalone GitHub repo: a user's CI runs
 * `npm install && npm run build` with no access to the fancy-studio monorepo or
 * any `@fancy/*` workspace package. So we VENDOR a copy of the renderer instead
 * of depending on a shared package.
 *
 * This copies the renderer + registry + types from apps/studio, plus the small
 * set of `$lib` modules those files import (the `cn` util and the shadcn-style
 * card/badge components). Everything is copied to the SAME `$lib`-relative path
 * it had in studio, so the `$lib/...` imports inside the copied files resolve
 * unchanged here (SvelteKit maps `$lib` -> `src/lib` in both apps).
 *
 * DRIFT WARNING: this is a one-way copy. If the studio renderer changes, re-run
 * `npm run sync-renderer` (it also runs automatically on `prebuild`/`prepare`)
 * and re-publish the template repo. The two can diverge silently otherwise.
 *
 * Source of truth: apps/studio/src/lib. Run from apps/site-template.
 */

import { cp, rm, mkdir, access } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const templateRoot = resolve(__dirname, "..");
const studioLib = resolve(templateRoot, "../studio/src/lib");
const destLib = join(templateRoot, "src/lib");

/** [from (relative to studio/src/lib), to (relative to template/src/lib)] */
const COPIES = [
	["builder/renderer", "builder/renderer"],
	["builder/registry", "builder/registry"],
	["builder/types", "builder/types"],
	["utils.ts", "utils.ts"],
	["components/ui/card", "components/ui/card"],
	["components/ui/badge", "components/ui/badge"],
];

async function exists(p) {
	try {
		await access(p);
		return true;
	} catch {
		return false;
	}
}

async function main() {
	if (!(await exists(studioLib))) {
		console.error(
			`[sync-renderer] studio lib not found at ${studioLib}.\n` +
				`This script only runs inside the fancy-studio monorepo. In a published\n` +
				`template repo the renderer is already vendored — skipping.`,
		);
		// In the standalone repo the files are committed; nothing to do.
		return;
	}

	for (const [from, to] of COPIES) {
		const src = join(studioLib, from);
		const dst = join(destLib, to);
		if (!(await exists(src))) {
			console.error(`[sync-renderer] missing source: ${src}`);
			process.exitCode = 1;
			return;
		}
		await rm(dst, { recursive: true, force: true });
		await mkdir(dirname(dst), { recursive: true });
		await cp(src, dst, { recursive: true });
		console.log(`[sync-renderer] ${from} -> src/lib/${to}`);
	}
	console.log("[sync-renderer] done.");
}

main();
