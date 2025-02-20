import { ChildProcess, SpawnOptions, spawn } from 'child_process';
import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import { OutputObject } from '../public/src/js/App';
import { Model } from '../public/src/js/components/ModelSelector/Model';
import IpcMain from './ipc/IpcMain';

function extractProgress(data: string): number | null {
    const regex = /(\d+)%\|.*/;
    const match = data.match(regex);

    if (match) {
        const percentage = match[1];
        console.log(`Percentage: ${percentage}`);
        return Number(percentage);
    } else {
        return null;
    }
}

function formatProgress(value: number): OutputObject {
    return IpcMain.formatOutputJson('progress', value);
}

function copyFile(sourceFile: string, destDir: string): string {
    const dest: string = destDir + sourceFile.split('/').pop();
    fs.copyFileSync(sourceFile, dest);
    console.log('File copied successfully to ' + dest);
    return dest;
}

function getFileExtension(file: string): string | null {
    const match = file.match(/\.(\w+)$/);
    return match ? match[1].toLowerCase() : null;
}

const getFilenameWithoutExtension = (filePath: string): string => {
    return path.basename(filePath, path.extname(filePath));
};

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
        console.log("Process exited with code", code, files);
        ipc.sendComplete(code, files);
    });
}

function quoted(s: string): string {
    return '"' + s + '"';
}

export default function processAudio(event: any, file: string, model: Model): void {

    const ipc = new IpcMain(event);

    const options: SpawnOptions = {
        stdio: ['ignore', 'pipe', 'pipe'],
        detached: true,
        shell: true,
        cwd: app.getAppPath(),
    };

    const outDir = app.getPath('userData');
    const inputDir = outDir + "/input/";
    fs.mkdirSync(inputDir, { recursive: true });
    const inputFile = copyFile(file, inputDir);
    const inputFileExt = getFileExtension(inputFile);

    const baseDir = app.getAppPath() + '/models/mel_band_roformer';
    const configPath = `${baseDir}/configs/config_vocals_mel_band_roformer.yaml`;
    const modelPath = `${baseDir}/MelBandRoformer.ckpt`;
    const fileName = getFilenameWithoutExtension(inputFile);
    const fullOutDir = outDir + '/separated/' + model + '/' + fileName + '/';

    const onExit = (exitCode) => {
        if (exitCode === 0) {
            return {
                orig: inputFile,
                vocals: fullOutDir + 'input_vocals.wav',
                other: fullOutDir + 'input_instrumental.wav',
            }
        } else {
            console.log("Error running mel-band roformer inference");
            return {};
        }
    };

    let processor: ChildProcess | null = null;

    if (model === Model.mel_band_roformer) {
        if (inputFileExt !== 'wav') {
            console.log(`Converting ${inputFile} to ${inputDir}input.wav'`);
            const ffmpeg = spawn('ffmpeg', ['-y', '-i', quoted(inputFile), quoted(inputDir + 'input.wav')], options);

            ffmpeg.stdout?.on('data', (data) => {
                console.log(data.toString());
            });

            ffmpeg.stderr?.on('data', (data) => {
                console.log(data.toString());
            });

            ffmpeg.on('exit', (code) => {
                console.log(`Creating output directory ${fullOutDir}`);
                fs.mkdirSync(fullOutDir, { recursive: true });
                console.log("Running mel-band roformer inference");
                processor = spawn(`${baseDir}/inference`, ['--config_path', quoted(configPath), '--model_path', quoted(modelPath), '--input_folder', quoted(inputDir), '--store_dir', quoted(fullOutDir)], options);
                trackProcess(ipc, processor, onExit);
            });
        }
    } else {
        console.log(`Spawning audio processor in ${outDir} with model ${model} for ${file}`);
        processor = spawn('demucs', ['-n', model, "\"" + file + "\""], options);
        trackProcess(ipc, processor);
    }

}
