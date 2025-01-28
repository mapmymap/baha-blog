import fs from 'fs';
import path from 'path';

const TASKS_DIR = path.join(__dirname, 'tasks');

function runAllScripts() {
  const tasks = fs
    .readdirSync(TASKS_DIR)
    .filter((file) => file.endsWith('.ts'))
    .map((file) => path.join(TASKS_DIR, file));

  try {
    tasks.forEach(async (task) => {
      console.log(`Running ${path.basename(task)}...`);
      await import(task).then((module) => {
        if (typeof module.default === 'function') {
          return module.default();
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}

runAllScripts();
