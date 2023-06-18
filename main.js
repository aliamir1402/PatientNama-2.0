const path=require("path");
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
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

    MainWindow.loadFile(path.join(__dirname,"add.html"));
}

app.whenReady().then(()=>{
    createMainWindow();

    const app = express();
    const port = 3000;
    app.use(bodyParser.json());

    console.log("A");
    console.log("B");
    app.post('/appendData', (req, res) => {
      const data = req.body;
      const result = JSON.stringify(data);
      const obj = JSON.parse(result);
      console.log("F: "+obj.name);
      var x=obj.name+"|"+obj.age;
    console.log("Data: "+x);
    if (!data) {
        console.log("No Data");
        res.status(400).send('No data provided');
        return;
    }
    console.log("C");
    fs.appendFile('data.txt', x + '\n', 'utf8', (err) => {
        if (err) {
        console.error('Error appending to file:', err);
        res.status(500).send('Error appending to file');
        return;
        }
        res.status(200).send('Data appended to file');
        console.log("Appending");
        console.log("D");
    });
    });
    console.log("E");
    app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log("F");
    });
});
    
