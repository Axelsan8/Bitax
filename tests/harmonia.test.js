const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("scripts/harmonia.js", "utf8");
const context = { window: {} };
vm.runInNewContext(source, context);
const match = context.window.Harmonia.match;

test("matches a declared capability to a project need", () => {
  const result = match(
    { skills: "danza, diseño", interests: "arte", availability: "sábados" },
    { needs: "diseño", interests: "arte", availability: "sábados" }
  );
  assert.equal(result.covered.length, 1);
  assert.equal(result.covered[0], "diseño");
  assert.equal(result.score, 100);
});

test("does not award points for missing criteria", () => {
  const result = match(
    { skills: "cocina", interests: "", availability: "" },
    { needs: "electricidad", interests: "", availability: "" }
  );
  assert.equal(result.score, 0);
  assert.deepEqual(Array.from(result.missing), ["electricidad"]);
});

test("normalizes accents and case", () => {
  const result = match(
    { skills: "MÚSICA", interests: "ARTE" },
    { needs: "musica", interests: "arte" }
  );
  assert.equal(result.covered.length, 1);
  assert.equal(result.shared.length, 1);
});
