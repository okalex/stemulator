import log from 'electron-log/main';
import { quoted } from './string';
import { spawn, spawnSync } from './process';
import path from 'path';
import fs from 'fs';

export function ffmpegPath() {
  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path.replace('app.asar', 'app.asar.unpacked');
  return ffmpegPath;
}

export function ffmpeg(
  args: string[],
  onExit: (code: number) => void,
  onData?: (data: string) => void,
) {
  return spawn(ffmpegPath(), args, onExit, onData);
}

export function ffmpegSync(args: string[] = []) {
  return spawnSync(ffmpegPath(), args);
}

export function convertToWav(
  src: string,
  dest: string,
  onExit: (code: number) => void,
  onData?: (data: string) => void,
) {
  log.info(`Converting ${src} to wav...`);
  if (onData) {
    onData(`Converting ${src} to wav...`);
  }
  const args = ['-y', '-i', quoted(src), quoted(dest)];
  return ffmpeg(args, onExit, onData);
}

export function getMetadata(src: string, destDir: string) {
  log.info(`Getting metadata for ${src}...`);
  const destFile = path.join(destDir, 'metadata.txt')
  const args = ['-i', quoted(src), '-y', '-f', 'ffmetadata', quoted(destFile)];
  ffmpegSync(args);
  const metadata = parseMetadata(destFile);
  return metadata;
}

function parseMetadata(src: string) {
  let artist = '';
  let title = '';
  let album = '';

  fs.readFileSync(src, 'utf8').split('\n').forEach((line) => {
    if (line.startsWith('artist=')) {
      artist = line.split('=')[1];
    } else if (line.startsWith('title=')) {
      title = line.split('=')[1];
    } else if (line.startsWith('album=')) {
      album = line.split('=')[1];
    }
  });

  return {
    artist,
    title,
    album,
  }
}
