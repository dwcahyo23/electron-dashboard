import { dialog } from 'electron'
import ProgressBar from 'electron-progressbar'
import { autoUpdater } from 'electron-updater'


function formatBytes(bytes: number): string {
	if (bytes === 0) return '0 B'
	const k = 1024
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
export function setupAutoUpdater() {
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
