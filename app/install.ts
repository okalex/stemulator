import path from 'path';
import fs from 'fs';
import log from 'electron-log/main';
import { execSync } from 'child_process';
import { mkdir } from './utils/files'

export function installModels() {
  const unpackedPath = path.join(process.resourcesPath, 'app.asar.unpacked');

  const modelsPath = mkdir(path.join(unpackedPath, 'models'));
  if (!fs.existsSync(modelsPath)) {
    mkdir(modelsPath);
  }

  const melBandRoformerPath = path.join(unpackedPath, 'models_dist', 'mel_band_roformer');
  if (!fs.existsSync(melBandRoformerPath)) {
    log.info('Extracting mel_band_roformer.tar.gz...');
    execSync(`tar -xzf ${path.join(unpackedPath, 'models_dist', 'mel_band_roformer.tar.gz')} -C ${modelsPath}`);
  }
}
