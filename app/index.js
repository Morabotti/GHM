const electron = require('electron')
const fs = require('fs')
const { app, BrowserWindow, globalShortcut } = require('electron')
require('electron-reload')(__dirname)

// TODO: Add support for Native functions
const getConfig = async () => fs.readFileSync('config.json')

const defConfig = {
  controlRefresh: 'Alt+R',
  controlQuit: 'Alt+P',
  controlHide: 'Alt+C',
  overlayUrl: 'http://localhost:8080/overlay'
}

app.on('ready', async () => {
  let OVERLAY_URL,
    CONTROLS_REFRESH,
    CONTROLS_QUIT,
    CONTROLS_HIDE

  try {
    const raw = await getConfig()
    const config = JSON.parse(raw)
    OVERLAY_URL = config.url !== undefined ? config.url : defConfig.overlayUrl
    CONTROLS_REFRESH = config.controls.refresh !== undefined ? config.controls.refresh : defConfig.controlRefresh
    CONTROLS_QUIT = config.controls.quit !== undefined ? config.controls.quit : defConfig.controlQuit
    CONTROLS_HIDE = config.controls.hide !== undefined ? config.controls.hide : defConfig.controlHide
  } catch (e) {
    console.log('No config found! Create config.json into /app folder.')
    console.log('Loading default configs.')
    OVERLAY_URL = defConfig.overlayUrl
    CONTROLS_REFRESH = defConfig.controlRefresh
    CONTROLS_QUIT = defConfig.controlQuit
    CONTROLS_HIDE = defConfig.controlHide
  }

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
    globalShortcut.register(CONTROLS_REFRESH, () => {
      const isVisible = win.isVisible()
      if (isVisible)
        win.minimize()
      else
        win.showInactive()
    })

    // EXIT PROGRAM
    globalShortcut.register(CONTROLS_QUIT, () => {
      win.close()
    })

    // REFRESH OVERLAY
    globalShortcut.register(CONTROLS_REFRESH, () => {
      win.reload()
    })

    win.loadURL(OVERLAY_URL)
  }
})
