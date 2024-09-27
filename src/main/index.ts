import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, dialog, ipcMain, shell } from 'electron'
import { ProgressBar } from 'electron-progressbar'
import { autoUpdater } from 'electron-updater'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

let progressBar: ProgressBar

async function createStore() {
  await import('electron-store')
}

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
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
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

  // Send the version to the renderer process
  const appVersion = app.getVersion()
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('version', appVersion)
  })
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
      // Initialize the progress bar when starting the download
      const progressBar = new ProgressBar({
        title: 'Downloading Update...',
        text: 'Downloading...',
        detail: 'Please wait.',
        indeterminate: false,
        closeOnComplete: true // Close when complete
      })

      progressBar.show() // Show the progress bar

      autoUpdater.downloadUpdate() // Start downloading the update
    }
  })

  autoUpdater.on('download-progress', (progressObj) => {
    const percent = Math.round(progressObj.percent)
    progressBar.setValue(percent) // Set the determinate progress bar
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

// IPC to get the base URL
ipcMain.handle('getBaseUrl', async () => {
  const { default: Store } = await import('electron-store') // Destructure the default export
  const store = new Store()
  return store.get('axiosBaseUrl')
})

// IPC to set the base URL
ipcMain.handle('setBaseUrl', async (_event, newUrl: string) => {
  const { default: Store } = await import('electron-store') // Destructure the default export
  const store = new Store()
  store.set('axiosBaseUrl', newUrl)
})

// IPC to get the access token
ipcMain.handle('getAccessToken', async () => {
  const { default: Store } = await import('electron-store')
  const store = new Store()
  return store.get('accessToken') || null
})

// IPC to set the access token
ipcMain.handle('setAccessToken', async (_event, token: string) => {
  const { default: Store } = await import('electron-store')
  const store = new Store()
  store.set('accessToken', token)
})

// IPC to remove the access token
ipcMain.handle('removeAccessToken', async () => {
  const { default: Store } = await import('electron-store')
  const store = new Store()
  store.delete('accessToken')
})

// IPC to get the access token
ipcMain.handle('getUserData', async () => {
  const { default: Store } = await import('electron-store')
  const store = new Store()
  return store.get('userData') || null
})

// IPC to set user data (uid, displayName)
ipcMain.handle('setUserData', async (_event, userData: { uid?: string; displayName?: string }) => {
  const { default: Store } = await import('electron-store')
  const store = new Store()
  store.set('userData', userData)
})

// IPC to remove user data
ipcMain.handle('removeUserData', async () => {
  const { default: Store } = await import('electron-store')
  const store = new Store()
  store.delete('userData')
})

// IPC to get the login status
ipcMain.handle('getLoginStatus', async () => {
  const { default: Store } = await import('electron-store')
  const store = new Store()
  return store.get('isLoggedIn') || false // Return false if not set
})

// IPC to set the login status
ipcMain.handle('setLoginStatus', async (_event, status: boolean) => {
  const { default: Store } = await import('electron-store')
  const store = new Store()
  store.set('isLoggedIn', status)
})

// This method will be called when Electron has finished initialization.
app.whenReady().then(async () => {
  await createStore() // Ensure Store is initialized

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
