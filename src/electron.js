const { app, BrowserWindow, session, globalShortcut } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({ width: 1024, height: 720 });
  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    // Open the DevTools.
    globalShortcut.register("f5", () => {
      mainWindow.reload();
    });
    await session.defaultSession.loadExtension(path.join(__dirname, "../react_dev_tools"));
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
