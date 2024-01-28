"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const fs = require("fs");
let config;
const createWindow = () => {
    const win = new electron_1.BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    win.loadFile("index.html");
};
electron_1.app.whenReady().then(() => {
    createWindow();
    try {
        let data = fs.readFileSync("config/config.json", "utf8");
        config = JSON.parse(data);
        console.log(config);
    }
    catch (e) {
        console.error("Failed to load config file:", e);
    }
});
electron_1.ipcMain.on("getConfig", (event) => {
    event.returnValue = config;
});
