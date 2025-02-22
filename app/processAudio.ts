import { Model } from '../public/src/js/components/ModelSelector/Model';
import IpcMain from './ipc/IpcMain';
import log from 'electron-log/main';
import melBandRoformer from './models/mel_band_roformer';

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

    if (model === Model.mel_band_roformer) {
        melBandRoformer(file, updateProgress, processingComplete);
    } else {
        ipc.sendError("Model not implemented");
    }

}
