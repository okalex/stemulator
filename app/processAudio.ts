import { OutputObject } from '../public/src/js/App';
import { Model } from '../public/src/js/components/ModelSelector/Model';
import IpcMain from './ipc/IpcMain';
import log from 'electron-log/main';
import melBandRoformer from './models/mel_band_roformer';

export function formatProgress(value: number): OutputObject {
    return IpcMain.formatOutputJson('progress', value);
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
