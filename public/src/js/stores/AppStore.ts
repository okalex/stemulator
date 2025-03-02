import { create } from 'zustand';

type AppStore = {
  reset: () => void;

  currentFile: string | null;
  setCurrentFile: (file: string | null) => void;

  isProcessing: boolean;
  setProcessing: (processing: boolean) => void;

  isProcessed: boolean;
  setProcessed: (processed: boolean) => void;

  processedFiles: ProcessedFileObject;
  setProcessedFiles: (files: ProcessedFileObject) => void;

  progress: number;
  setProgress: (progress: number) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  reset: () => {
    set({ currentFile: null });
    set({ isProcessing: false });
    set({ isProcessed: false });
    set({ processedFiles: { orig: "" } });
    set({ progress: 0 });
  },

  currentFile: null,
  setCurrentFile: (file: string) => set({ currentFile: file }),

  isProcessing: false,
  setProcessing: (processing: boolean) => set({ isProcessing: processing }),

  isProcessed: false,
  setProcessed: (processed: boolean) => set({ isProcessed: processed }),

  processedFiles: { orig: "" },
  setProcessedFiles: (files: ProcessedFileObject) => set({ processedFiles: files }),

  progress: 0,
  setProgress: (progress: number) => set({ progress }),
}));
