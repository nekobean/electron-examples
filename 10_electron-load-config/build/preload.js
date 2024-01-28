"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("Electron", {
    send: () => electron_1.ipcRenderer.sendSync("getConfig"),
});
