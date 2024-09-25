import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, dialog, ipcMain, shell } from 'electron'
import { autoUpdater } from 'electron-updater'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Load the remote URL for development or the local HTML file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Function to set up the auto updater with user interactions
const setupAutoUpdater = () => {
  autoUpdater.on('update-available', async () => {
    const response = await dialog.showMessageBox({
      type: 'info',
      buttons: ['Update', 'Later'],
      title: 'Update Available',
      message: 'A new update is available. Would you like to update now?'
    })

    if (response.response === 0) {
      autoUpdater.downloadUpdate() // Start downloading the update
    }
  })

  autoUpdater.on('update-not-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'No Update Available',
      message: 'Your application is up to date.'
    })
  })

  autoUpdater.on('error', (error) => {
    dialog.showMessageBox({
      type: 'error',
      title: 'Update Error',
      message: `Error in auto-updater: ${error.message}`
    })
  })

  autoUpdater.on('download-progress', (progressObj) => {
    const percent = Math.round(progressObj.percent)
    console.log(`Download speed: ${progressObj.bytesPerSecond}`)
    console.log(`Downloaded ${percent}%`)
    console.log(`Downloaded ${progressObj.transferred} of ${progressObj.total} bytes`)
  })

  autoUpdater.on('update-downloaded', async () => {
    const response = await dialog.showMessageBox({
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Update Ready',
      message: 'Update downloaded. Would you like to restart the application now?'
    })

    if (response.response === 0) {
      autoUpdater.quitAndInstall() // Restart and install the update
    }
  })

  // Start checking for updates
  autoUpdater.checkForUpdates()
}

// This method will be called when Electron has finished initialization.
app.whenReady().then(() => {
  // Set app user model id for Windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // Setup auto updater
  setupAutoUpdater()

  // Create the main window
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
