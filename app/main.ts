import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import processAudio from './processAudio';
import IpcMain from './ipc/IpcMain';
import log from 'electron-log/main';
import fs from 'fs';
import { execSync } from 'child_process';
import fixPath from 'fix-path';
import { mkdir } from './utils/files';
import { installModels } from './install';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Fix path
fixPath();

// Initialize logging
log.initialize();
log.transports.console.level = 'info';
log.transports.file.level = 'info';
log.transports.ipc.level = 'info';

// Install models
if (app.isPackaged) {
  installModels();
}

// Auto-reload
// if (process.env.NODE_ENV === 'development') {
//   require('electron-reload')(path.join(__dirname, '/app'));
// }

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: false, // TODO: This is a security vulnerability: https://stackoverflow.com/questions/44391448/electron-require-is-not-defined
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  // mainWindow.loadURL('http://localhost:8080');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  return mainWindow;
};

function setupIpcHandlers() {
  IpcMain.handleGetRootPath();
  IpcMain.handleProcessAudio(processAudio);
  IpcMain.handleDragStart();
  IpcMain.handleCopyToClipboard();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  setupIpcHandlers();
  createWindow();

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
