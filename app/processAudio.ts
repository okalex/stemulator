import { Model } from '../public/src/js/components/ModelSelector/Model';
import IpcMain from './ipc/IpcMain';
import log from 'electron-log/main';
import melBandRoformer from './models/mel_band_roformer';
import { convertToWav, getMetadata } from './utils/ffmpeg';
import path from 'path';
import fs from 'fs';
import { app } from 'electron';
import { copyFile, getFileExtension, getFilenameWithoutExtension, mkdir } from './utils/files';
import albumArt from 'album-art';
import https from 'https';

function getWorkingDir(file: string): string {
    const dataDir = app.getPath('userData');
    const workingDir = path.join(dataDir, 'separated', getFilenameWithoutExtension(file));
    return workingDir;
}

function initWorkingDir(file: string): string {
    const workingDir = getWorkingDir(file);
    if (fs.existsSync(workingDir)) {
        fs.rmdirSync(workingDir, { recursive: true });
    }
    return mkdir(workingDir);
}

function downloadFile(url: string, dest: string, callback: () => void): void {
    log.info(`Downloading ${url} to ${dest}`);
    const file = fs.createWriteStream(dest);
    const request = https.get(url, (response) => {
        response.pipe(file);

        file.on("finish", () => {
            file.close();
            console.log("Download Completed");
            callback();
        });
    }); // TODO: handle errors
}

export async function fetchMetadata(event: any, file: string): Promise<void> {
    log.info(`Fetching metadata for ${file}`);
    const ipc = new IpcMain(event);

    const workingDir = initWorkingDir(file);

    const metadata = getMetadata(file, workingDir);
    ipc.sendMetadata(metadata);

    const albumArtUrl = await albumArt(metadata.artist, { album: metadata.album, size: 'large' });
    const albumArtPath = path.join(workingDir, 'albumArt.jpg')
    downloadFile(albumArtUrl, albumArtPath, () => {
        ipc.sendMetadata({ ...metadata, albumArtUrl: `file://${albumArtPath}` });
    });
}

export default function processAudio(event: any, file: string, model: Model): void {

    log.info(`Processing audio file ${file} with model ${model}`);

    const ipc = new IpcMain(event);

    function updateProgress(value: number): void {
        log.info(`Progress: ${value}`);
        ipc.sendOutput(IpcMain.formatOutputJson('progress', value));
    }

    function sendStdout(channel: string, data: string): void {
        ipc.sendOutput(IpcMain.formatOutputJson(channel, data));
    }

    function processingComplete(files: object) {
        return (exitCode) => {
            if (exitCode === 0) {
                log.info("Process exited with code", exitCode, files);
                ipc.sendComplete(exitCode, files);
            } else {
                log.error("Error running mel-band roformer inference");
                ipc.sendComplete(exitCode, {});
            }
        };
    }

    const workingDir = getWorkingDir(file);
    const wavFile = path.join(workingDir, 'orig.wav');

    function runModel() {
        if (model === Model.mel_band_roformer) {
            melBandRoformer(wavFile, workingDir, sendStdout, updateProgress, processingComplete);
        } else {
            ipc.sendError("Model not implemented");
        }
    }

    function convertToWavComplete(code: number) {
        if (code === 0) {
            runModel();
        } else {
            ipc.sendError("Error converting to wav");
        }
    }

    if (getFileExtension(file) !== 'wav') {
        convertToWav(file, wavFile, convertToWavComplete, sendStdout);
    } else {
        copyFile(file, wavFile);
        runModel();
    }



}
