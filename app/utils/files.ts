import fs from 'fs';
import path from 'path';
import log from 'electron-log/main';

export function copyFile(sourceFile: string, destDir: string): string {
  const dest = destDir + sourceFile.split('/').pop();
  fs.copyFileSync(sourceFile, dest);
  log.info('File copied successfully to ' + dest);
  return dest;
}

export function getFileExtension(file: string): string | null {
  const match = file.match(/\.(\w+)$/);
  return match ? match[1].toLowerCase() : null;
}

export function getFilenameWithoutExtension(filePath: string): string {
  return path.basename(filePath, path.extname(filePath));
}

export function ls(path: string) {
  const contents = fs.readdirSync(path);
  log.info(`${path}: ${contents}`);
}

export function mkdir(path: string) {
  log.info(`Creating directory ${path}`);
  fs.mkdirSync(path, { recursive: true });
  return path;
}
