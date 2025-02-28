import { app, clipboard, ipcMain } from "electron";
import { Model } from "../../public/src/js/components/ModelSelector/Model";
import { IpcChannel } from "./IpcChannel";
import { readFile } from "fs";
import plist from "plist";
import { OutputObject } from "../../types/OutputObject";

export default class IpcMain {
    event: any;

    constructor(event: any) {
        this.event = event;
    }

    static formatOutputJson(type: string, data: any): OutputObject {
        return {
            type,
            data,
        };
    }

    static handleGetRootPath(): void {
        ipcMain.handle(IpcChannel.GET_ROOT_PATH, (event: any) => {
            // const rootPath = app.getAppPath();
            const rootPath = "/tmp/"
            console.log("Returning root path: ", rootPath);
            return rootPath;
        });
    };

    static handleProcessAudio(callback: (event: any, file: string, model: Model, outDir: string) => void): void {
        ipcMain.handle(IpcChannel.PROCESS_AUDIO, (event: any, file: string, model: Model, outDir: string) => {
            console.log("Handling processAudio");
            callback(event, file, model, outDir);
        });
    }

    static handleDragStart(): void {
        ipcMain.on(IpcChannel.ON_DRAG_START, (event: any, file: string) => {
            console.log("Handling dragStart", file);
            event.sender.startDrag({
                file: file,
                icon: '/Users/alex/src/okalex/Stemulator/public/src/img/audio-file.png',
            });
        });
    }

    static handleCopyToClipboard(): void {
        ipcMain.on(IpcChannel.COPY_TO_CLIPBOARD, (event: any, filePath: string) => {
            console.log("Handling copyToClipboard", filePath);
            const buffer = Buffer.from(plist.build([filePath])); // TODO:This is currently MacOS-only
            clipboard.writeBuffer('NSFilenamesPboardType', buffer);
        });
    }

    sendOutput(json: object): void {
        console.log("stdout", json);
        this.event.sender.send('handleOutput', json);
    }

    sendOutputString(data: string): void {
        this.sendOutput(IpcMain.formatOutputJson('string', data));
    }

    sendError(data: string): void {
        console.error("stderr", data);
        this.event.sender.send('handleError', data);
    }

    sendComplete(code: number | null, files: object): void {
        console.log("Sending handleComplete", code, files);
        this.event.sender.send('handleComplete', code, files);
    }
}
