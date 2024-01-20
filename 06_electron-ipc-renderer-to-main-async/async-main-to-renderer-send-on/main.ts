import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import * as path from "path";

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.webContents.openDevTools();
  win.loadFile("index.html");

  win.webContents.on("did-finish-load", () => {
    // Main -> Renderer
    console.log(`[Main] send "ping".`);
    win.webContents.send("sendAsync", "ping");
  });
};

ipcMain.on("sendAsync", (event: IpcMainEvent, ...args: any[]) => {
  console.log(`[Main] ${args} received.`);
});

app.whenReady().then(createWindow);
