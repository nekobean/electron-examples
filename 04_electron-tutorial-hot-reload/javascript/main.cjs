const { app, BrowserWindow } = require("electron");
const electronReload = require("electron-reload");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow();
  win.loadFile("index.html");

  if (!app.isPackaged) {
    // パッケージ化されていない場合
    const electronPath = path.join(
      __dirname,
      "node_modules",
      ".bin",
      "electron" + (process.platform === "win32" ? ".cmd" : "")
    );

    electronReload(__dirname, {
      electron: electronPath,
      forceHardReset: true,
    });
  }
};

app.whenReady().then(createWindow);
