const electron = require('electron')
const { app, BrowserWindow } = require('electron')

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
      disableAutoHideCursor: false,
    })

    win.setIgnoreMouseEvents(true)

    win.loadURL('http://localhost:8080/overlay')
  }
})