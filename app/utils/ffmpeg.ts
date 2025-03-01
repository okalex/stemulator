import log from 'electron-log/main';
import { quoted } from './string';
import { spawnSync } from './process';
import path from 'path';
import fs from 'fs';

export function ffmpegPath() {
  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path.replace('app.asar', 'app.asar.unpacked');
  return ffmpegPath;
}

export function ffmpegSync(args: string[] = []) {
  return spawnSync(ffmpegPath(), args);
}

export function convertToWav(src: string, dest: string) {
  log.info(`Converting ${src} to wav...`);
  const args = ['-y', '-i', quoted(src), quoted(dest)];
  return ffmpegSync(args);
}

export function getMetadata(src: string, destDir: string) {
  log.info(`Getting metadata for ${src}...`);
  const destFile = path.join(destDir, 'metadata.txt')
  const args = ['-i', quoted(src), '-y', '-f', 'ffmetadata', quoted(destFile)];
  ffmpegSync(args);
  return parseMetadata(destFile);
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
