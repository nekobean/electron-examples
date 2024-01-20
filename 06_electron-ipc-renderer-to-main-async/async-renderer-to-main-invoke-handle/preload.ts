import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("Electron", {
  send: (...args: any[]) => ipcRenderer.invoke("invoke", ...args),
});
