import { ChildProcess, SpawnOptions } from 'child_process';
import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import { OutputObject } from '../public/src/js/App';
import { Model } from '../public/src/js/components/ModelSelector/Model';
import IpcMain from './ipc/IpcMain';
import log from 'electron-log/main';
import { copyFile, getFileExtension, getFilenameWithoutExtension, ls, mkdir } from './utils/files';
import { spawn } from './utils/process';

let resourcePath = app.getAppPath()
if (app.isPackaged) {
    resourcePath = path.join(process.resourcesPath, 'app.asar.unpacked');
}
ls(resourcePath);

const spawnOptions: SpawnOptions = {
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true,
    shell: true,
    cwd: path.join(resourcePath, 'models', 'mel_band_roformer'),
};


function extractProgress(data: string): number | null {
    const regex = /(\d+)%\|.*/;
    const match = data.match(regex);

    if (match) {
        const percentage = match[1];
        log.info(`Percentage: ${percentage}`);
        return Number(percentage);
    } else {
        return null;
    }
}

function formatProgress(value: number): OutputObject {
    return IpcMain.formatOutputJson('progress', value);
}

function trackProcess(ipc: IpcMain, processor: ChildProcess, onExit?: (code: number) => object) {
    processor.stdout?.on('data', (data) => {
        ipc.sendOutputString(data.toString());
    });

    processor.stderr?.on('data', (data) => {
        const progress = extractProgress(data.toString());
        if (progress !== null) {
            ipc.sendOutput(formatProgress(progress));
        } else {
            ipc.sendError(data.toString())
        }
    });

    processor.on('exit', (code) => {
        let files = {};
        if (onExit) files = onExit(code ?? 0);
        log.info("Process exited with code", code, files);
        ipc.sendComplete(code, files);
    });
}

function quoted(s: string): string {
    return '"' + s + '"';
}

function melBandRoformer(ipc: IpcMain, file: string) {
    const dataDir = app.getPath('userData');
    log.info("Data path: " + dataDir);

    const inputDir = mkdir(dataDir + "/input/");
    const inputFile = copyFile(file, inputDir);

    const modelPath = path.join(resourcePath, '/models/mel_band_roformer');
    const inference = path.join(modelPath, 'inference');
    ls(modelPath);

    const fullOutDir = mkdir(`${dataDir}/separated/${getFilenameWithoutExtension(inputFile)}/`);

    const modelArgs = [
        '--config_path', quoted(`${modelPath}/configs/config_vocals_mel_band_roformer.yaml`),
        '--model_path', quoted(`${modelPath}/MelBandRoformer.ckpt`),
        '--input_folder', quoted(inputDir),
        '--store_dir', quoted(fullOutDir)
    ];

    const onModelExit = (exitCode) => {
        if (exitCode === 0) {
            const files = {
                orig: inputFile,
                vocals: fullOutDir + 'input_vocals.wav',
                other: fullOutDir + 'input_instrumental.wav',
            }
            log.info("Process exited with code", exitCode, files);
            ipc.sendComplete(exitCode, files);
        } else {
            log.error("Error running mel-band roformer inference");
            ipc.sendComplete(exitCode, {});
        }
    };

    let totalTime: number = 1000000000;

    const onDataReceived = (data: string) => {
        const totalTimeRegex = /Estimated total processing time for this track: ([0-9]+\.[0-9]+) seconds/;
        const totalTimeMatch = data.match(totalTimeRegex);
        if (totalTimeMatch) {
            totalTime = Number(totalTimeMatch[1]);
            log.info(`Total time: ${totalTime}`);
        }

        const timeLeftRegex = /Estimated time remaining: ([0-9]+\.[0-9]+) seconds/;
        const timeLeftMatch = data.match(timeLeftRegex);
        if (timeLeftMatch) {
            const currentTime = Number(timeLeftMatch[1]);
            log.info(`Time left: ${currentTime}`);
            const progress = Math.round((totalTime - currentTime) / totalTime * 100);
            log.info(`Progress: ${progress}`);
            ipc.sendOutput(formatProgress(progress));
        }
    }

    let processor: ChildProcess | null = null;

    if (getFileExtension(inputFile) !== 'wav') {
        log.info(`Converting ${inputFile} to ${inputDir}input.wav'`);
        const ffmpegArgs = ['-y', '-i', quoted(inputFile), quoted(inputDir + 'input.wav')];
        spawn('ffmpeg', ffmpegArgs, spawnOptions, () => { }, () => {
            log.info("Running mel-band roformer inference");
            processor = spawn(inference, modelArgs, spawnOptions, onDataReceived, onModelExit);
        });
    } else {
        log.info("Running mel-band roformer inference");
        processor = spawn(inference, modelArgs, spawnOptions, onDataReceived, onModelExit);

    }

}

export default function processAudio(event: any, file: string, model: Model): void {

    log.info(`Processing audio file ${file} with model ${model}`);

    const ipc = new IpcMain(event);

    if (model === Model.mel_band_roformer) {
        melBandRoformer(ipc, file);
    } else {
        ipc.sendError("Model not implemented");
    }

}
