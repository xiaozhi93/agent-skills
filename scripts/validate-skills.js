#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, 'skills');
const MAX_DESCRIPTION_LENGTH = 1024;

const REQUIRED_SECTIONS = [
  '## Overview',
  '## When to Use',
  '## Red Flags',
];

const LINK_PATTERN = /\[([^\]]*)\]\(([^)]+)\)/g;

function parseFrontmatter(content) {
  const match = content.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n/);
  if (!match) return null;
  const result = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key) result[key] = value;
  }
  return result;
}

function isExternalLink(href) {
  return /^(https?:\/\/|mailto:|#)/.test(href);
}

function resolveLink(fromFile, href) {
  if (isExternalLink(href)) return null;
  const decoded = decodeURIComponent(href.split('#')[0]);
  return path.normalize(path.join(path.dirname(fromFile), decoded));
}

function collectMarkdownFiles(skillDir) {
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (entry.endsWith('.md')) files.push(full);
    }
  }
  walk(skillDir);
  return files;
}

function validateLinks(skillDir, errors, warnings) {
  for (const file of collectMarkdownFiles(skillDir)) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    LINK_PATTERN.lastIndex = 0;
    while ((match = LINK_PATTERN.exec(content)) !== null) {
      const href = match[2].trim();
      const target = resolveLink(file, href);
      if (!target) continue;
      if (!fs.existsSync(target)) {
        errors.push(`${path.relative(ROOT, file)}: broken link '${href}'`);
      }
    }
  }
}

function validateSkill(dirName, knownSkills) {
  const errors = [];
  const warnings = [];
  const skillPath = path.join(SKILLS_DIR, dirName, 'SKILL.md');

  if (!fs.existsSync(skillPath)) {
    errors.push(`${dirName}: missing SKILL.md`);
    return { errors, warnings };
  }

  const content = fs.readFileSync(skillPath, 'utf8');
  const fm = parseFrontmatter(content);
  if (!fm) {
    errors.push(`${dirName}: missing or malformed YAML frontmatter`);
    return { errors, warnings };
  }
  if (!fm.name) errors.push(`${dirName}: frontmatter missing 'name'`);
  else if (fm.name !== dirName) {
    errors.push(`${dirName}: frontmatter name '${fm.name}' != directory '${dirName}'`);
  }
  if (!fm.description) errors.push(`${dirName}: frontmatter missing 'description'`);
  else if (fm.description.length > MAX_DESCRIPTION_LENGTH) {
    errors.push(`${dirName}: description exceeds ${MAX_DESCRIPTION_LENGTH} chars`);
  }

  for (const section of REQUIRED_SECTIONS) {
    if (!content.includes(section)) {
      errors.push(`${dirName}: missing required section '${section}'`);
    }
  }

  validateLinks(path.join(SKILLS_DIR, dirName), errors, warnings);

  const refPattern = /`([a-z][a-z0-9-]*)`/g;
  let m;
  while ((m = refPattern.exec(content)) !== null) {
    const ref = m[1];
    if (ref.endsWith('-development') || ref.endsWith('-exploring') || ref === dirName) continue;
    if (knownSkills.has(ref)) continue;
    if (['brainstorming', 'writing-plans', 'find-skills', 'frontend-design',
         'test-driven-development', 'verification-before-completion',
         'gitnexus-exploring', 'gitnexus-refactoring', 'creating-skills-guided',
         'subagent-driven-development', 'conversation-to-obsidian',
         'generate-dev-handoff-prompt'].includes(ref)) continue;
    warnings.push(`${dirName}: possible external reference '${ref}'`);
  }

  return { errors, warnings };
}

function main() {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.error('ERROR: skills/ not found');
    process.exit(1);
  }

  const skillDirs = fs.readdirSync(SKILLS_DIR)
    .filter(d => fs.statSync(path.join(SKILLS_DIR, d)).isDirectory())
    .sort();

  const knownSkills = new Set(skillDirs);
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const dir of skillDirs) {
    const { errors, warnings } = validateSkill(dir, knownSkills);
    totalErrors += errors.length;
    totalWarnings += warnings.length;
    if (errors.length === 0 && warnings.length === 0) {
      console.log(`  ✓  ${dir}`);
    } else {
      console.log(`${errors.length ? '  ✗' : '  ⚠'}  ${dir}`);
      errors.forEach(e => console.log(`       ERROR: ${e}`));
      warnings.forEach(w => console.log(`       WARN:  ${w}`));
    }
  }

  const status = totalErrors > 0 ? 'FAILED' : 'PASSED';
  console.log(`\n${skillDirs.length} skills — ${totalErrors} error(s), ${totalWarnings} warning(s) — ${status}`);
  if (totalErrors > 0) process.exit(1);
}

main();
