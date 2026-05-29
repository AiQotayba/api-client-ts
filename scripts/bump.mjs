import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const release = process.argv[2] ?? "patch";

function pkgVersion() {
  return JSON.parse(readFileSync("package.json", "utf8")).version;
}

function fixTag(version) {
  const tag = `v${version}`;
  try {
    execSync(`git tag -d ${tag}`, { stdio: "ignore" });
  } catch {
    /* tag may not exist */
  }
  execSync(`git tag ${tag}`, { stdio: "inherit" });
}

try {
  execSync(`pnpm exec bumpp ${release} -y`, { stdio: "inherit" });
} catch {
  const version = pkgVersion();
  console.log(`\nRecovering: moving tag v${version} to HEAD…`);
  fixTag(version);
  process.exit(0);
}
