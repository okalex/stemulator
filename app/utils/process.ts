import log from 'electron-log/main';
import { ChildProcess, SpawnOptions, spawn as _spawn, spawnSync as _spawnSync } from 'child_process';

export function spawn(
  processName: string,
  args: string[],
  spawnOptions: SpawnOptions,
  onData: (data: string) => void,
  onExit: (code: number) => void
): ChildProcess {
  log.info(`Spawning ${processName}`);
  const process = _spawn(processName, args, spawnOptions);

  process.stdout?.on('data', (data) => {
    log.info(data.toString());
    onData(data.toString());
  });

  process.stderr?.on('data', (data) => {
    log.error(data.toString());
  });

  process.on('exit', (code) => {
    log.info(`Process ${processName} exited with code ${code}`);
    onExit(code ?? 0);
  });

  return process;
}

export function spawnSync(processName: string, args: string[]) {
  log.info(`Spawning ${processName}`);
  const result = _spawnSync(processName, args, spawnOptions());

  if (result.error) {
    log.error(result.error);
  }

  if (result.status !== 0) {
    log.error(`Process ${processName} exited with code ${result.status}`);
  }

  return result;
}

export function spawnOptions(cwd?: string): SpawnOptions {
  return {
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true,
    shell: true,
    cwd,
  };
}
