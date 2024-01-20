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
};

ipcMain.on("sendAsync", (event: IpcMainEvent, ...args: any[]) => {
  console.log(`[Main] ${args} received.`);

  // Main -> Renderer
  event.sender.send("sendAsync", "pong");
});

app.whenReady().then(createWindow);
