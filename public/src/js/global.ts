export { };

declare global {
    interface Window {
        api: {
            getRootPath: () => Promise<string>,
            processAudio: (path: string, model: string) => Promise<void>,
            handleOutput: (callback: (event: any, output: any) => void) => void,
            handleError: (callback: (event: any, output: any) => void) => void,
            handleComplete: (callback: (event: any, code: number) => void) => void,
            startDrag: (file: string) => void,
            removeListeners: () => void,
            copyToClipboard: (filePath: string) => void,
        };
    }
}
