import { app } from 'electron';
import path from 'path';
import log from 'electron-log/main';
import { copyFile, getFileExtension, getFilenameWithoutExtension, mkdir } from '../utils/files';
import { spawn, spawnOptions } from '../utils/process';
import fs from 'fs';
import { quoted } from '../utils/string';
import { convertToWav } from '../utils/ffmpeg';

let resourcePath = app.getAppPath()
if (app.isPackaged) {
  resourcePath = path.join(process.resourcesPath, 'app.asar.unpacked');
}

export default function melBandRoformer(
  wavFile: string,
  workingDir: string,
  sendOutput: (channel: string, data: string) => void,
  updateProgress: (value: number) => void,
  processingComplete: (files: object) => (exitCode: number) => void
): void {
  const modelPath = path.join(resourcePath, 'models', 'mel_band_roformer');
  const inference = path.join(modelPath, 'inference');

  let totalTime: number = 1000000000;

  function handleStdout(channel: string, data: string) {
    sendOutput(channel, data);

    // Get total time estimate
    const totalTimeRegex = /Estimated total processing time for this track: ([0-9]+\.[0-9]+) seconds/;
    const totalTimeMatch = data.match(totalTimeRegex);
    if (totalTimeMatch) {
      totalTime = Number(totalTimeMatch[1]);
      log.info(`Total time: ${totalTime}`);
    }

    // Get remaining time estimate
    const timeLeftRegex = /Estimated time remaining: ([0-9]+\.[0-9]+) seconds/;
    const timeLeftMatch = data.match(timeLeftRegex);
    if (timeLeftMatch) {
      const timeLeft = Number(timeLeftMatch[1]);
      log.info(`Time left: ${timeLeft}`);
      const progress = Math.round((totalTime - timeLeft) / totalTime * 100);
      updateProgress(progress);
    }
  }

  const modelArgs = [
    '--config_path', quoted(`${modelPath}/configs/config_vocals_mel_band_roformer.yaml`),
    '--model_path', quoted(`${modelPath}/MelBandRoformer.ckpt`),
    '--input_folder', quoted(workingDir),
    '--store_dir', quoted(workingDir)
  ];

  const files = {
    orig: wavFile,
    vocals: path.join(workingDir, 'orig_vocals.wav'),
    other: path.join(workingDir, 'orig_instrumental.wav'),
  }

  log.info("Running mel-band roformer inference");
  spawn(inference, modelArgs, processingComplete(files), handleStdout, spawnOptions(modelPath));

}
