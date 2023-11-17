import { contextBridge } from 'electron';
import IpcRenderer from './ipc/IpcRenderer';

contextBridge.exposeInMainWorld('api', {
    getRootPath: IpcRenderer.getRootPath,
    processAudio: IpcRenderer.processAudio,
    handleOutput: IpcRenderer.handleOutput,
    handleError: IpcRenderer.handleError,
    handleComplete: IpcRenderer.handleComplete,
    startDrag: IpcRenderer.startDrag,
    removeListeners: IpcRenderer.removeListeners,
    copyToClipboard: IpcRenderer.copyToClipboard,
});
