const path=require("path");
const {app, BrowserWindow} = require('electron');


function createMainWindow(){
    const { screen } = require('electron')
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize
    const MainWindow = new BrowserWindow({
        title:'PatientNama',
        width,
        height,
        icon: 'logo.jpg'
    });

    MainWindow.loadFile(path.join(__dirname,"login.html"));
}

app.whenReady().then(()=>{
    createMainWindow();
});