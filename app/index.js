const electron = require('electron')
const { app, BrowserWindow, globalShortcut } = require('electron')
require('electron-reload')(__dirname);

// TODO: Add support for Native functions

app.on('ready', () => {
  const displays = electron.screen.getAllDisplays()
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  if (externalDisplay) {
    const win = new BrowserWindow({
      width: 1920,
      height: 1080,
      frame: false,
      transparent: true,
      resizable: false,
      alwaysOnTop: true,
      focusable: false,
      disableAutoHideCursor: false,
    })

    win.setIgnoreMouseEvents(true)

    // TOGGLE HUD
    globalShortcut.register('Alt+C', () => {
      const isVisible = win.isVisible()
      if (isVisible)
        win.minimize()
      else
        win.showInactive()
    })

    // EXIT PROGRAM
    globalShortcut.register('Alt+P', () => {
      win.close()
    })

    // REFRESH OVERLAY
    globalShortcut.register('Alt+R', () => {
      win.reload()
    })

    win.loadURL('http://localhost:8080/overlay')
  }
})