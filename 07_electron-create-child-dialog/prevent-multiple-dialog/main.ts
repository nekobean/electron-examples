import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import * as path from "path";

let childWin: BrowserWindow | null = null;
const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.webContents.openDevTools();
  win.loadFile("index.html");

  ipcMain.on("openDialog", (event: IpcMainEvent, title: string) => {
    if (childWin !== null) {
      return;
    }

    childWin = new BrowserWindow({
      parent: win,
      title: title,
    });
    childWin.webContents.openDevTools();
    childWin.loadFile("child.html");

    childWin.on("closed", () => (childWin = null));
  });
};

app.whenReady().then(createWindow);
