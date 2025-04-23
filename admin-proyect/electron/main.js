import { app, BrowserWindow }  from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow () {
    // Creamos la ventana del navegador
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    win.loadURL('http://localhost:5173'); // Cambia esto a la URL de tu aplicación React

    app.whenReady().then(() => {
        createWindow();
        app.on('activate', function () {
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
    });

    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit();
    });
}