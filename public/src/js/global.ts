export { };

declare global {
    interface Window {
        api: {
            getRootPath: () => Promise<string>,
            processAudio: (path: string, model: string) => Promise<void>,
            getMetadata: (path: string) => Promise<void>,
            handleSetMetadata: (callback: (metadata: object) => void) => void,
            handleOutput: (callback: (event: any, output: any) => void) => void,
            handleError: (callback: (event: any, output: any) => void) => void,
            handleComplete: (callback: (code: number, files: object) => void) => void,
            startDrag: (file: string) => void,
            removeListeners: () => void,
            copyToClipboard: (filePath: string) => void,
        };
    }
}
