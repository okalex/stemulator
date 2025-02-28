import { app, BrowserWindow } from 'electron';
import path from 'path';
import processAudio from './processAudio';
import IpcMain from './ipc/IpcMain';
import log from 'electron-log/main';
import fixPath from 'fix-path';
import { installModels } from './install';
import fs from 'fs';

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

// Installation
if (app.isPackaged) {
  installModels();
}

function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

// Hot reload
if (isDev() && process.env.ELECTRON_HMR === 'true') {
  console.log('Setting up file watcher for hot reload');
  const distDir = path.join(__dirname, '../dist');

  fs.watch(distDir, { recursive: true }, (eventType, filename) => {
    if (filename && (filename.endsWith('.js') || filename.endsWith('.css'))) {
      console.log(`File changed: ${filename}, reloading window...`);
      BrowserWindow.getAllWindows().forEach((window) => {
        window.webContents.reloadIgnoringCache();
      });
    }
  });
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: isDev() ? 1000 : 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: false, // TODO: This is a security vulnerability: https://stackoverflow.com/questions/44391448/electron-require-is-not-defined
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  // if (isDev()) {
  //   mainWindow.loadURL('http://localhost:8080');
  // } else {
  //   mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  // }

  if (isDev()) {
    console.log('Loading from dev server: http://localhost:8080');
    mainWindow.loadURL('http://localhost:8080');
  } else {
    const indexPath = path.join(__dirname, '../dist/index.html');
    console.log(`Loading from file: ${indexPath}`);
    mainWindow.loadFile(indexPath);
  }

  // Open the DevTools.
  if (isDev()) {
    mainWindow.webContents.openDevTools();
  }

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
