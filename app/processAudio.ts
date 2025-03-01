import { Model } from '../public/src/js/components/ModelSelector/Model';
import IpcMain from './ipc/IpcMain';
import log from 'electron-log/main';
import melBandRoformer from './models/mel_band_roformer';
import { getMetadata } from './utils/ffmpeg';
import path from 'path';
import fs from 'fs';
import { app } from 'electron';
import { getFilenameWithoutExtension, mkdir } from './utils/files';
import albumArt from 'album-art';

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

export async function fetchMetadata(event: any, file: string): Promise<void> {
    log.info(`Fetching metadata for ${file}`);
    const ipc = new IpcMain(event);

    const workingDir = initWorkingDir(file);

    const metadata = getMetadata(file, workingDir);

    let albumArtUrl = '';
    await albumArt(metadata.artist, { album: metadata.album, size: 'large' }).then((url) => {
        log.info('Album art URL: ' + url);
        albumArtUrl = url;
    });

    ipc.sendMetadata({ ...metadata, albumArtUrl });
}

export default function processAudio(event: any, file: string, model: Model): void {

    log.info(`Processing audio file ${file} with model ${model}`);

    const ipc = new IpcMain(event);

    function updateProgress(value: number): void {
        log.info(`Progress: ${value}`);
        ipc.sendOutput(IpcMain.formatOutputJson('progress', value));
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

    if (model === Model.mel_band_roformer) {
        melBandRoformer(file, workingDir, updateProgress, processingComplete);
    } else {
        ipc.sendError("Model not implemented");
    }

}
