import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { setupAutoUpdater } from './autoUpdater' // Import the autoUpdater setup function
import { setupIpcHandlers } from './ipcHandlers' // Import the IPC handlers setup function

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
      webSecurity: true,
      nodeIntegration: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  //   const nonce = crypto.randomBytes(16).toString('base64')
  //   const csp = `script-src 'self' 'unsafe-eval' 'nonce-${nonce}';`

  //   mainWindow.webContents.on('did-finish-load', () => {
  //     mainWindow.webContents.executeJavaScript(`
  //     const meta = document.createElement('meta');
  //     meta.httpEquiv = "Content-Security-Policy";
  //     meta.content = "${csp}";
  //     document.head.appendChild(meta);
  // `)
  //   })

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

async function initializeApp() {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
}

// Run initialization when the app is ready
app.whenReady().then(() => {
  initializeApp()
  setupIpcHandlers() // Call the IPC setup function
  setupAutoUpdater() // Call the autoUpdater setup function
})

// Quit the app when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
