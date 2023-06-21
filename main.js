const path = require("path");
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const {
    PythonShell
} = require('python-shell');
const {
    app,
    BrowserWindow
} = require('electron');

function createMainWindow() {
    const {
        screen
    } = require('electron')
    const primaryDisplay = screen.getPrimaryDisplay()
    const {
        width,
        height
    } = primaryDisplay.workAreaSize
    const MainWindow = new BrowserWindow({
        title: 'PatientNama',
        width,
        height,
        icon: 'logo.jpg'
    });

    MainWindow.loadFile(path.join(__dirname, "login.html"));
}

function serverAdd() {
    const app = express();
    const port = 3000;
    app.use(bodyParser.json());

    app.post('/appendData', (req, res) => {
        const data = req.body;
        const obj = JSON.parse(JSON.stringify(data));

        if (obj.operation == "add") {
            var x = obj.hnumber + "|" + obj.fname + "|" + obj.age + "|" + obj.cnic + "|" + obj.address + "|" + obj.cname + "|" + obj.mnumber + "|" + obj.selectedValue + "|" +
                obj.admitDate + "|" + obj.birthDate + "|" + obj.clinicalInfo + "|" + obj.examFindings + "|" + obj.cbc + "|" + obj.lfts + "|" + obj.electrolytes + "|" + obj.viralmarkers +
                "|" + obj.imaging + "|" + obj.others + "|" + obj.operatingNotes + "|" + obj.course_treatment + "|";

            for (var i = 0; i < obj.medicineCount; i++) {
                x += obj['medicine' + (i + 1)] + "|" + obj['dose' + (i + 1)] + "|" + obj['time' + (i + 1)] + "|" + obj['days' + (i + 1)] + "|";
            }
            x += obj.followInfo;

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
                console.log("Appended");
            });
        } else if (obj.operation == "del") {
            var info = "";
            for (var i = 0; i < obj.count; i++) {
                info = info + obj[i] + "\n";
            }

            console.log("Data: " + info.slice(0, 10));
            if (!data) {
                console.log("No Data");
                res.status(400).send('No data provided');
                return;
            }
            console.log("C");
            fs.writeFile('data.txt', info + '\n', 'utf8', (err) => {
                if (err) {
                    console.error('Error appending to file:', err);
                    res.status(500).send('Error appending to file');
                    return;
                }
                res.status(200).send('Data deleted from file');
                console.log("Deleted");
            });
        } else if (obj.operation == "download") {
            var x = obj.hnumber + "|" + obj.fname + "|" + obj.age + "|" + obj.cnic + "|" + obj.address + "|" + obj.cname + "|" + obj.mnumber + "|" + obj.selectedValue + "|" +
                obj.admitDate + "|" + obj.birthDate + "|" + obj.clinicalInfo + "|" + obj.examFindings + "|" + obj.cbc + "|" + obj.lfts + "|" + obj.electrolytes + "|" + obj.viralmarkers +
                "|" + obj.imaging + "|" + obj.others + "|" + obj.operatingNotes + "|" + obj.course_treatment + "|";

            for (var i = 0; i < obj.medicineCount; i++) {
                x += obj['medicine' + (i + 1)] + "|" + obj['dose' + (i + 1)] + "|" + obj['time' + (i + 1)] + "|" + obj['days' + (i + 1)] + "|";
            }
            x += obj.followInfo;

            console.log("Data: " + x);
            if (!data) {
                console.log("No Data");
                res.status(400).send('No data provided');
                return;
            }
            fs.writeFile('download.txt', x + '\n', 'utf8', (err) => {
                if (err) {
                    console.error('Error downloading to file:', err);
                    res.status(500).send('Error appending to file');
                    return;
                }
                res.status(200).send('Download File');
                console.log("Download");
            });

            PythonShell.run('pdfGen.py', null, function(err) {
                if (err) throw err;
                console.log('Python script executed successfully.');
            });

        }
    });
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        console.log("F");
    });
}

app.whenReady().then(() => {
    createMainWindow();
    serverAdd();
});