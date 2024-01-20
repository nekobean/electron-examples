import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld("Electron", {
  // Renderer -> Main
  send: (...args: any[]) => ipcRenderer.send("sendAsync", ...args),
  // Main -> Renderer
  recieved: (listener: (...args: any[]) => void) => {
    ipcRenderer.on("sendAsync", (event: IpcRendererEvent, ...args: any[]) =>
      listener(...args)
    );
  },
});
