const electron = require('electron')
const fs = require('fs')
const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('electron-json-config');
require('electron-reload')(__dirname)

const defConfig = {
  controlRefresh: 'Alt+R',
  controlQuit: 'Alt+P',
  controlHide: 'Alt+C',
  overlayUrl: 'http://localhost:8080/overlay'
}

app.on('ready', async () => {
  console.log('Settings: ' + config.file())

  if (!config.has('overlayUrl')) config.set('overlayUrl', defConfig.overlayUrl)
  if (!config.has('controlRefresh')) config.set('controlRefresh', defConfig.controlRefresh)
  if (!config.has('controlHide')) config.set('controlHide', defConfig.controlHide)
  if (!config.has('controlQuit')) config.set('controlQuit', defConfig.controlQuit)

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
    globalShortcut.register(config.get('controlHide', defConfig.controlHide), () => {
      const isVisible = win.isVisible()
      if (isVisible)
        win.minimize()
      else
        win.showInactive()
    })

    // EXIT PROGRAM
    globalShortcut.register(config.get('controlQuit', defConfig.controlQuit), () => {
      win.close()
    })

    // REFRESH OVERLAY
    globalShortcut.register(config.get('controlRefresh', defConfig.controlRefresh), () => {
      win.reload()
    })

    win.loadURL(config.get('overlayUrl', defConfig.overlayUrl))
  }
})
