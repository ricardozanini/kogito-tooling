#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".");
const packagesDir = path.join(repoRoot, "packages");

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));

// Map: name -> package dir
const packageMap = {};
fs.readdirSync(packagesDir).forEach((pkg) => {
  const pkgPath = path.join(packagesDir, pkg, "package.json");
  if (fs.existsSync(pkgPath)) {
    const json = readJson(pkgPath);
    packageMap[json.name] = path.join("packages", pkg);
  }
});

// Recursively walk dependencies
const visited = new Set();
function walkDeps(pkgName) {
  if (visited.has(pkgName)) return;
  visited.add(pkgName);
  const pkgPath = path.join(repoRoot, packageMap[pkgName], "package.json");
  const json = readJson(pkgPath);
  const deps = {
    ...json.dependencies,
    ...json.devDependencies,
    ...json.optionalDependencies,
  };
  Object.keys(deps || {}).forEach((dep) => {
    if (packageMap[dep]) walkDeps(dep); // only follow local packages
  });
}

// 🌱 Start from multiple root packages
const entryPoints = [
  "@kie-tools/kn-plugin-workflow",
  "@osl/osl-operator-bundle-image",
  "@kie-tools/sonataflow-management-console-image",
  "@osl/osl-data-index-ephemeral-image",
  "@osl/osl-data-index-postgresql-image",
  "@osl/osl-db-migrator-tool-image",
  "@osl/osl-jobs-service-ephemeral-image",
  "@osl/osl-jobs-service-postgresql-image",
  "@osl/osl-management-console-image",
  "@osl/osl-swf-builder-image",
  "@osl/osl-swf-devmode-image",
];

entryPoints.forEach(walkDeps);

// ✅ Result
const used = [...visited];
const all = Object.keys(packageMap);
const unused = all.filter((pkg) => !visited.has(pkg));

console.log("✅ Used workspace packages:");
used.forEach((pkg) => console.log("  -", pkg));

console.log("\n🗑️ Unused workspace packages:");
unused.forEach((pkg) => console.log("  -", pkg));

console.log("\n🧹 Copy and run to delete:");
const deleteCmd = "rm -rf " + unused.map((pkg) => packageMap[pkg]).join(" ");
console.log(deleteCmd);
