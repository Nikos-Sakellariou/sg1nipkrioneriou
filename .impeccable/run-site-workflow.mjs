import { spawn } from 'node:child_process';

const helper = 'C:\\Users\\Giannis\\.codex\\plugins\\cache\\openai-curated-remote\\sites\\1.1.3\\scripts\\site-workflow.mjs';
const projectId = 'appgprj_6aeaf3af02b0819197e15cabd37fc577';
const env = {
  ...process.env,
  GIT_CONFIG_COUNT: '1',
  GIT_CONFIG_KEY_0: 'safe.directory',
  GIT_CONFIG_VALUE_0: 'C:/Users/Giannis/source/repos/1oNipiaKrioneriou',
};

const child = spawn(process.execPath, [helper, '--project-id', projectId], {
  cwd: process.cwd(),
  env,
  stdio: 'inherit',
});

child.on('exit', (code) => process.exit(code ?? 1));
