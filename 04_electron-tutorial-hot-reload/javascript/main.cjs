const { app, BrowserWindow } = require("electron");
const electronReload = require("electron-reload");
const path = require("path");

// 開発環境かどうか
const idDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const createWindow = () => {
  const win = new BrowserWindow();
  win.loadFile("index.html");

  if (idDev) {
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
