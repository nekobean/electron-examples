import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("Electron", {
  send: () => ipcRenderer.sendSync("getConfig"),
});
