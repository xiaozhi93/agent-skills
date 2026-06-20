#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'skills.manifest.json');
const SKILLS_DIR = path.join(ROOT, 'skills');

function main() {
  const errors = [];

  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('ERROR: skills.manifest.json not found');
    process.exit(1);
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  } catch (err) {
    console.error(`ERROR: invalid JSON in skills.manifest.json: ${err.message}`);
    process.exit(1);
  }

  if (!manifest.repo) errors.push("Missing top-level field: 'repo'");
  if (!Array.isArray(manifest.skills) || manifest.skills.length === 0) {
    errors.push("'skills' must be a non-empty array");
  }

  const dirNames = fs.existsSync(SKILLS_DIR)
    ? fs.readdirSync(SKILLS_DIR).filter(d =>
        fs.statSync(path.join(SKILLS_DIR, d)).isDirectory()
      )
    : [];

  const manifestNames = new Set();
  for (const skill of manifest.skills || []) {
    if (!skill.name) {
      errors.push('Skill entry missing name');
      continue;
    }
    if (manifestNames.has(skill.name)) {
      errors.push(`Duplicate manifest name: ${skill.name}`);
    }
    manifestNames.add(skill.name);

    if (!skill.description) errors.push(`${skill.name}: missing description`);
    if (!Array.isArray(skill.triggers) || skill.triggers.length === 0) {
      errors.push(`${skill.name}: triggers must be a non-empty array`);
    }
    if (!dirNames.includes(skill.name)) {
      errors.push(`${skill.name}: in manifest but missing directory skills/${skill.name}/`);
    }
  }

  for (const dir of dirNames) {
    if (!manifestNames.has(dir)) {
      errors.push(`${dir}: directory exists but missing from manifest`);
    }
  }

  if (errors.length > 0) {
    for (const e of errors) console.error(`  ERROR: ${e}`);
    console.error(`\nFAILED — ${errors.length} error(s)`);
    process.exit(1);
  }

  console.log(`PASSED — ${manifest.skills.length} skills in manifest, ${dirNames.length} directories`);
}

main();
