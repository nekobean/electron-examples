"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const createWindow = () => {
    const win = new electron_1.BrowserWindow();
    win.loadFile("index.html");
};
electron_1.app.whenReady().then(createWindow);
