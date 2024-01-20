import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import * as path from "path";

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.webContents.openDevTools();
  win.loadFile("index.html");
};

ipcMain.handle("invoke", (event: IpcMainInvokeEvent, ...args: any[]) => {
  console.log(`[Main] ${args} received.`);

  // Main -> Renderer
  return "pong";
});

app.whenReady().then(createWindow);
