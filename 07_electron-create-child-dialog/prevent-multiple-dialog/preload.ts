import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("Electron", {
  // Renderer -> Main
  openDialog: (title: string) => ipcRenderer.send("openDialog", title),
});
