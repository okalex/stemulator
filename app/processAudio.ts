import { SpawnOptions, spawn } from 'child_process';
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

export default function processAudio(event: any, file: string, model: Model): void {

    const options: SpawnOptions = {
        stdio: ['ignore', 'pipe', 'pipe'],
        detached: true,
        shell: true,
    };

    console.log(`Spawning audio processor with model ${model} for ${file}`);
    const processor = spawn('demucs', ['-n', model, "\"" + file + "\""], options);

    if (processor.stdout && processor.stderr) {
        const ipc = new IpcMain(event);

        processor.stdout.on('data', (data) => {
            ipc.sendOutputString(data.toString());
        });

        processor.stderr.on('data', (data) => {
            const progress = extractProgress(data.toString());
            if (progress !== null) {
                ipc.sendOutput(formatProgress(progress));
            } else {
                ipc.sendError(data.toString())
            }
        });

        processor.on('exit', (code) => {
            ipc.sendComplete(code)
        });
    }

}
