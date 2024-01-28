import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import * as path from "path";
import * as fs from "fs";

interface ConfigProps {
  name: string;
  age: number;
}

let config: ConfigProps;

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  try {
    let data = fs.readFileSync("config/config.json", "utf8");
    config = JSON.parse(data);
    console.log(config);
  } catch (e) {
    console.error("Failed to load config file:", e);
  }
});

ipcMain.on("getConfig", (event: IpcMainEvent) => {
  event.returnValue = config;
});
