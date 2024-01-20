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

  ipcMain.on("openDialog", (event: IpcMainEvent, title: string) => {
    const childWin = new BrowserWindow({
      parent: win,
      title: title,
      model: true,
    });
    childWin.webContents.openDevTools();
    childWin.loadFile("child.html");
  });
};

app.whenReady().then(createWindow);
