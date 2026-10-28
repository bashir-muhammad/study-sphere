#!/usr/bin/env node
/**
 * Creates GitHub labels, milestones, issues, and project items from docs/project-backlog.md.
 *
 * Usage:
 *   node scripts/create-github-issues.mjs                       # validate and preview (changes nothing)
 *   node scripts/create-github-issues.mjs --apply               # create labels, milestones, issues
 *   node scripts/create-github-issues.mjs --apply --project 3 --owner my-login
 *
 * Options:
 *   --file <path>   backlog file (default: docs/project-backlog.md)
 *   --map <path>    file that remembers created issues (default: scripts/.backlog-map.json)
 *
 * Requires the GitHub CLI (`gh`), logged in with the `repo` and `project` scopes.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const PRIORITIES = ['P0', 'P1', 'P2'];
const SIZES = ['S', 'M', 'L'];

// ---------- arguments ----------
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const APPLY = flag('--apply');
const FILE = option('--file', 'docs/project-backlog.md');
const MAP_FILE = option('--map', 'scripts/.backlog-map.json');
const PROJECT = option('--project', null);
const OWNER = option('--owner', null);

// ---------- parsing ----------
export function parseBacklog(markdown) {
  const lines = markdown.split(/\r?\n/);
  const milestoneGoals = new Map();
  const tasks = [];
  let milestone = null;
  let task = null;
  let inMeta = false;

  const finishTask = () => {
    if (task) {
      task.body = task.bodyLines.join('\n').trim();
      delete task.bodyLines;
      tasks.push(task);
      task = null;
    }
  };

  for (const line of lines) {
    const goal = line.match(/^\|\s*(M\d+ — [^|]+?)\s*\|\s*(.+?)\s*\|$/);
    if (goal) milestoneGoals.set(goal[1].trim(), goal[2].trim());

    const milestoneHeading = line.match(/^## Milestone (M\d+ — .+)$/);
    if (milestoneHeading) {
      finishTask();
      milestone = milestoneHeading[1].trim();
      continue;
    }
    if (/^## /.test(line)) {
      finishTask();
      milestone = null;
      continue;
    }

    const taskHeading = line.match(/^### (T\d+) — (.+)$/);
    if (taskHeading && milestone) {
      finishTask();
      task = {
        id: taskHeading[1],
        title: taskHeading[2].trim(),
        milestone,
        priority: null,
        size: null,
        labels: [],
        dependsOn: [],
        bodyLines: [],
      };
      inMeta = true;
      continue;
    }
    if (!task) continue;

    if (inMeta) {
      const meta = line.match(/^- \*\*(Priority|Size|Labels|Depends on):\*\*\s*(.*)$/);
      if (meta) {
        const [, key, value] = meta;
        if (key === 'Priority') task.priority = value.trim();
        if (key === 'Size') task.size = value.trim();
        if (key === 'Labels') task.labels = value.split(',').map((s) => s.trim()).filter(Boolean);
        if (key === 'Depends on') {
          task.dependsOn = value.split(',').map((s) => s.trim()).filter((s) => /^T\d+$/.test(s));
        }
        continue;
      }
      if (line.trim() === '' && (task.priority || task.size)) {
        inMeta = false;
        continue;
      }
      if (line.trim() === '') continue;
      inMeta = false;
    }
    task.bodyLines.push(line);
  }
  finishTask();
  return { tasks, milestoneGoals };
}

// ---------- validation ----------
export function validate(tasks) {
  const errors = [];
  const index = new Map();
  tasks.forEach((t, i) => {
    if (index.has(t.id)) errors.push(`${t.id}: duplicate id`);
    index.set(t.id, i);
  });
  const byId = new Map(tasks.map((t) => [t.id, t]));
  for (const t of tasks) {
    if (!PRIORITIES.includes(t.priority)) errors.push(`${t.id}: invalid priority "${t.priority}"`);
    if (!SIZES.includes(t.size)) errors.push(`${t.id}: invalid size "${t.size}"`);
    if (t.labels.length === 0) errors.push(`${t.id}: no labels`);
    if (!t.body.includes('**Acceptance criteria**')) errors.push(`${t.id}: missing acceptance criteria`);
    for (const dep of t.dependsOn) {
      if (!byId.has(dep)) {
        errors.push(`${t.id}: depends on unknown ${dep}`);
        continue;
      }
      if (index.get(dep) >= index.get(t.id)) errors.push(`${t.id}: depends on ${dep}, which is not earlier in the file`);
      if (PRIORITIES.indexOf(byId.get(dep).priority) > PRIORITIES.indexOf(t.priority)) {
        errors.push(`${t.id} (${t.priority}) depends on ${dep} (${byId.get(dep).priority}): a task cannot depend on a lower priority`);
      }
    }
  }
  return errors;
}

// ---------- gh helpers ----------
function gh(ghArgs, input) {
  const result = spawnSync('gh', ghArgs, { input, encoding: 'utf8' });
  if (result.error) throw new Error(`Could not run gh: ${result.error.message}`);
  if (result.status !== 0) throw new Error(`gh ${ghArgs.join(' ')} failed:\n${result.stderr}`);
  return result.stdout.trim();
}
const log = (msg) => console.log(msg);

function labelColor(name) {
  if (name.startsWith('area:')) return '1d76db';
  if (name.startsWith('type:')) return '0e8a16';
  return 'ededed';
}

function buildBody(task, map) {
  const header = `> Backlog ID **${task.id}** · Priority **${task.priority}** · Size **${task.size}**`;
  let body = `${header}\n\n${task.body}`;
  if (task.dependsOn.length > 0) {
    const refs = task.dependsOn.map((d) => (map[d] ? `#${map[d].number}` : d)).join(', ');
    body += `\n\n**Blocked by:** ${refs}`;
  }
  return body;
}

// ---------- main ----------
function main() {
  if (!existsSync(FILE)) {
    console.error(`Backlog file not found: ${FILE} (run from the repository root)`);
    process.exit(1);
  }
  const { tasks, milestoneGoals } = parseBacklog(readFileSync(FILE, 'utf8'));
  const errors = validate(tasks);
  if (errors.length > 0) {
    console.error('Backlog validation failed:\n- ' + errors.join('\n- '));
    process.exit(1);
  }
  const counts = PRIORITIES.map((p) => `${p}: ${tasks.filter((t) => t.priority === p).length}`).join(', ');
  log(`Parsed ${tasks.length} tasks (${counts}). Validation passed.`);

  const map = existsSync(MAP_FILE) ? JSON.parse(readFileSync(MAP_FILE, 'utf8')) : {};
  const saveMap = () => writeFileSync(MAP_FILE, JSON.stringify(map, null, 2) + '\n');
  const labels = [...new Set(tasks.flatMap((t) => t.labels))].sort();
  const milestones = [...new Set(tasks.map((t) => t.milestone))];

  if (!APPLY) {
    log('\nDry run. Nothing was changed. Add --apply to create:');
    log(`- ${labels.length} labels: ${labels.join(', ')}`);
    log(`- ${milestones.length} milestones: ${milestones.join(' | ')}`);
    for (const t of tasks) {
      const state = map[t.id] ? `exists as #${map[t.id].number}` : 'will create';
      const deps = t.dependsOn.length ? ` (after ${t.dependsOn.join(', ')})` : '';
      log(`- ${t.id} [${t.priority}/${t.size}] ${t.title}${deps}: ${state}`);
    }
    return;
  }

  // labels
  for (const name of labels) {
    gh(['label', 'create', name, '--color', labelColor(name), '--force']);
  }
  log(`Labels ready (${labels.length}).`);

  // milestones
  const existing = gh(['api', 'repos/{owner}/{repo}/milestones?state=all&per_page=100', '--jq', '.[].title'])
    .split('\n')
    .filter(Boolean);
  for (const title of milestones) {
    if (existing.includes(title)) continue;
    gh([
      'api', 'repos/{owner}/{repo}/milestones',
      '-f', `title=${title}`,
      '-f', `description=${milestoneGoals.get(title) ?? ''}`,
    ]);
    log(`Created milestone: ${title}`);
  }

  // project metadata
  let project = null;
  if (PROJECT) {
    if (!OWNER) {
      console.error('--project requires --owner');
      process.exit(1);
    }
    const info = JSON.parse(gh(['project', 'view', PROJECT, '--owner', OWNER, '--format', 'json']));
    const fieldList = JSON.parse(gh(['project', 'field-list', PROJECT, '--owner', OWNER, '--format', 'json', '--limit', '50']));
    const fields = fieldList.fields ?? fieldList;
    const find = (name) => fields.find((f) => f.name === name);
    project = { id: info.id, priority: find('Priority'), size: find('Size') };
    if (!project.priority) log('Warning: project has no "Priority" single-select field. Priority will not be set.');
    if (!project.size) log('Warning: project has no "Size" single-select field. Size will not be set.');
  }

  const setField = (itemId, field, valueName) => {
    if (!field) return;
    const option = (field.options ?? []).find((o) => o.name === valueName);
    if (!option) {
      log(`  Warning: field "${field.name}" has no option "${valueName}"`);
      return;
    }
    gh(['project', 'item-edit', '--id', itemId, '--project-id', project.id, '--field-id', field.id, '--single-select-option-id', option.id]);
  };

  // issues, in file order so dependencies always exist already
  for (const task of tasks) {
    if (!map[task.id]) {
      const ghArgs = ['issue', 'create', '--title', task.title, '--body-file', '-', '--milestone', task.milestone];
      for (const l of task.labels) ghArgs.push('--label', l);
      const url = gh(ghArgs, buildBody(task, map)).split('\n').pop();
      const number = Number(url.match(/\/issues\/(\d+)/)?.[1]);
      map[task.id] = { number, url };
      saveMap();
      log(`Created #${number} ${task.id} ${task.title}`);
    } else {
      log(`Skipped ${task.id} (already #${map[task.id].number})`);
    }

    if (project && !map[task.id].projectItemId) {
      const item = JSON.parse(gh(['project', 'item-add', PROJECT, '--owner', OWNER, '--url', map[task.id].url, '--format', 'json']));
      map[task.id].projectItemId = item.id;
      setField(item.id, project.priority, task.priority);
      setField(item.id, project.size, task.size);
      saveMap();
    }
  }
  log('\nDone.');
}

import { fileURLToPath } from 'node:url';
if (process.argv[1] === fileURLToPath(import.meta.url)) main();
