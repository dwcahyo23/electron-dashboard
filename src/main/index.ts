import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, dialog, ipcMain, shell } from 'electron'
import ProgressBar from 'electron-progressbar'
import { autoUpdater } from 'electron-updater'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

// Function to create the main window
function createMainWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    icon: process.platform === 'linux' ? icon : undefined,
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

  const loadURL =
    is.dev && process.env['ELECTRON_RENDERER_URL']
      ? process.env['ELECTRON_RENDERER_URL']
      : join(__dirname, '../renderer/index.html')

  mainWindow.loadURL(is.dev ? process.env['ELECTRON_RENDERER_URL']! : loadURL)

  // Send app version to renderer
  const appVersion = app.getVersion()
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('version', appVersion)
  })
}

// Function to set up the auto-updater
function setupAutoUpdater() {
  let progressBar: ProgressBar | null = null

  autoUpdater.on('update-available', async () => {
    const response = await dialog.showMessageBox({
      type: 'info',
      buttons: ['Update', 'Later'],
      title: 'Update Available',
      message: 'A new update is available. Would you like to update now?'
    })

    if (response.response === 0) {
      // Initialize ProgressBar only if it doesn't exist
      if (!progressBar) {
        progressBar = new ProgressBar({
          title: 'Downloading Update...',
          text: 'Downloading...',
          detail: 'Please wait.',
          indeterminate: false,
          closeOnComplete: true,
          browserWindow: {
            closable: false
          }
        })

        // Handle 'completed' event
        progressBar.on('completed', () => {
          console.log('Update download completed')
          progressBar!.detail = 'Download complete.'
          progressBar!.close()
          progressBar = null
        })

        // Handle 'aborted' event
        progressBar.on('aborted', () => {
          console.log('Update download aborted')
          progressBar!.close()
          progressBar = null
        })

        // Start downloading the update
        autoUpdater.downloadUpdate()
      }
    }
  })

  autoUpdater.on('download-progress', (progressObj) => {
    if (progressBar) {
      const percent = Math.round(progressObj.percent)
      progressBar.value = percent
      progressBar.detail = `Downloaded ${percent}% (${formatBytes(progressObj.transferred)} of ${formatBytes(progressObj.total)} at ${formatBytes(progressObj.bytesPerSecond)}/s)`
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

    if (progressBar) {
      progressBar.close()
      progressBar = null
    }
  })

  autoUpdater.on('update-downloaded', async () => {
    if (progressBar) {
      progressBar.setCompleted()
      progressBar = null
    }

    const response = await dialog.showMessageBox({
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Update Ready',
      message: 'Update downloaded. Would you like to restart the application now?'
    })

    if (response.response === 0) {
      autoUpdater.quitAndInstall()
    }
  })

  // Start checking for updates
  autoUpdater.checkForUpdates()
}

// Function to set up IPC handlers with dynamic imports
function setupIpcHandlers() {
  // Handler for 'getBaseUrl'
  ipcMain.handle('getBaseUrl', async () => {
    const { default: Store } = await import('electron-store')
    const store = new Store()
    return store.get('axiosBaseUrl')
  })

  // Handler for 'setBaseUrl'
  ipcMain.handle('setBaseUrl', async (_event, newUrl: string) => {
    const { default: Store } = await import('electron-store')
    const store = new Store()
    store.set('axiosBaseUrl', newUrl)
  })

  // Handler for 'getAccessToken'
  ipcMain.handle('getAccessToken', async () => {
    const { default: Store } = await import('electron-store')
    const store = new Store()
    return store.get('accessToken') || null
  })

  // Handler for 'setAccessToken'
  ipcMain.handle('setAccessToken', async (_event, token: string) => {
    const { default: Store } = await import('electron-store')
    const store = new Store()
    store.set('accessToken', token)
  })

  // Handler for 'removeAccessToken'
  ipcMain.handle('removeAccessToken', async () => {
    const { default: Store } = await import('electron-store')
    const store = new Store()
    store.delete('accessToken')
  })

  // Handler for 'getUserData'
  ipcMain.handle('getUserData', async () => {
    const { default: Store } = await import('electron-store')
    const store = new Store()
    return store.get('userData') || null
  })

  // Handler for 'setUserData'
  ipcMain.handle(
    'setUserData',
    async (_event, userData: { uid?: string; displayName?: string }) => {
      const { default: Store } = await import('electron-store')
      const store = new Store()
      store.set('userData', userData)
    }
  )

  // Handler for 'removeUserData'
  ipcMain.handle('removeUserData', async () => {
    const { default: Store } = await import('electron-store')
    const store = new Store()
    store.delete('userData')
  })

  // Handler for 'getLoginStatus'
  ipcMain.handle('getLoginStatus', async () => {
    const { default: Store } = await import('electron-store')
    const store = new Store()
    return store.get('isLoggedIn') || false
  })

  // Handler for 'setLoginStatus'
  ipcMain.handle('setLoginStatus', async (_event, status: boolean) => {
    const { default: Store } = await import('electron-store')
    const store = new Store()
    store.set('isLoggedIn', status)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
}

// Utility function to format bytes into a readable string
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Main initialization function
async function initializeApp() {
  // Set app user model id for Windows
  electronApp.setAppUserModelId('com.electron')

  // Watch window shortcuts
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Set up auto-updater
  setupAutoUpdater()

  // Create the main window
  createMainWindow()

  // Set up IPC handlers
  setupIpcHandlers()

  // Handle app activation (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
}

// Run initialization when the app is ready
app.whenReady().then(() => {
  initializeApp()
})

// Quit the app when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
