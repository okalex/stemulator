import { ipcRenderer } from "electron";
import { Model } from "../../public/src/js/components/ModelSelector/Model";
import { OutputObject } from "../../public/src/js/App";
import { IpcChannel } from "./IpcChannel";
import { FileObject } from "../../public/src/js/types/FileObject";

export default class IpcRenderer {

    static getRootPath() {
        console.log("IpcRenderer.getRootPath");
        return ipcRenderer.invoke(IpcChannel.GET_ROOT_PATH);
    }

    static processAudio(file: string, model: Model): void {
        console.log("IpcRenderer.processAudio", file, model);
        ipcRenderer.invoke(IpcChannel.PROCESS_AUDIO, file, model);
    }

    static handleOutput(callback: (output: OutputObject) => void): void {
        const _callback = (event: any, output: OutputObject) => {
            console.log("IpcRenderer.handleOutput", output);
            callback(output);
        }
        ipcRenderer.on(IpcChannel.HANDLE_OUTPUT, _callback);
    }

    static handleError(callback: (data: string) => void): void {
        const _callback = (event: any, data: string) => {
            console.error("IpcRenderer.handleError", data);
            callback(data);
        }
        ipcRenderer.on(IpcChannel.HANDLE_ERROR, _callback)
    }

    static handleComplete(callback: (code: number) => void): void {
        const _callback = (event: any, code: number) => {
            console.log("IpcRenderer.handleComplete", code);
            callback(code);
        }
        ipcRenderer.on(IpcChannel.HANDLE_COMPLETE, _callback)
    }

    static startDrag(file: string): void {
        ipcRenderer.send(IpcChannel.ON_DRAG_START, file);
    }

    static removeListeners(): void {
        ipcRenderer.removeAllListeners(IpcChannel.HANDLE_OUTPUT);
        ipcRenderer.removeAllListeners(IpcChannel.HANDLE_ERROR);
        ipcRenderer.removeAllListeners(IpcChannel.HANDLE_COMPLETE);
    }

    static copyToClipboard(filePath: string): void {
        ipcRenderer.send(IpcChannel.COPY_TO_CLIPBOARD, filePath);
    }

}