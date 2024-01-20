import { app, BrowserWindow } from "electron";
import * as path from "path";

const createWindow = () => {
  const win = new BrowserWindow();
  win.loadFile("index.html");

  if (!app.isPackaged) {
    // バイナリ化されていない場合
    const electronPath = path.join(
      __dirname,
      "..",
      "node_modules",
      ".bin",
      "electron" + (process.platform === "win32" ? ".cmd" : "")
    );

    require("electron-reload")(__dirname, {
      electron: electronPath,
      forceHardReset: true,
    });
  }
};

app.whenReady().then(createWindow);
