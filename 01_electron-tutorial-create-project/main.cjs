const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  // ウィンドウを作成する。
  const win = new BrowserWindow();

  // 画面を読み込む。
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow(); // 初期化に成功した場合、ウィンドウを作成する。

  // アプリがアクティブになった場合
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// すべてのウィンドウが閉じられた場合
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
