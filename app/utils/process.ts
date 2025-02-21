import log from 'electron-log/main';
import { ChildProcess, SpawnOptions, spawn as _spawn } from 'child_process';

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
