const electron = require('electron')
const { app, BrowserWindow, globalShortcut } = require('electron')

const defConfig = {
  controlRefresh: 'Alt+R',
  controlQuit: 'Alt+P',
  controlHide: 'Alt+C',
  overlayUrl: 'http://localhost:8080/overlay'
}

app.on('ready', async () => {
  let isVisible = true
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
    globalShortcut.register(defConfig.controlHide, () => {
      if (isVisible) {
        isVisible = false
        win.minimize()
      }
      else {
        isVisible = true
        win.showInactive()
      }
    })

    // EXIT PROGRAM
    globalShortcut.register(defConfig.controlQuit, () => {
      win.close()
    })

    // REFRESH OVERLAY
    globalShortcut.register(defConfig.controlRefresh, () => {
      win.reload()
    })

    win.loadURL(defConfig.overlayUrl)
  }
})
