var loginFunc = () => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email && password) {
        if (email === "admin@gmail.com" && password === "12345") {
            window.location.href = "dashboard.html";
        } else {
            alert('Invalid email or password');
        }
    } else {
        alert('Please enter your email and password');
    }
};

var medFunc = () => {
    var container = document.getElementById("tab");
    var htmlContent = '<tr><td><input type="text" name="medicine" placeholder="Med Name..."></td><td><input type="text" name="dose" placeholder="Dose Name..."></td><td><input type="text" name="time" placeholder="Times a Day..."></td><td><input type="text" name="days" placeholder="Days..."></td></tr>';
    container.insertAdjacentHTML("beforeend", htmlContent);
}

var searchFunc = (event) => {
    event.preventDefault();
    var medicine = [];
    var dose = [];
    var time = [];
    var days = [];
    var flag = 0;
    var searchItem = document.getElementById("search").value;

    // Use Fetch API to read the text file
    fetch('data.txt')
        .then(response => response.text())
        .then(data => {
            var line = data.split("\n");
            for (var i = 0; i < line.length; i++) {
                if ((line[i].split("|"))[0] == searchItem) {
                    var contents = line[i].split("|");
                    var hnumber = contents[0];
                    var fname = contents[1];
                    var age = contents[2];
                    var cnic = contents[3];
                    var address = contents[4];
                    var cname = contents[5];
                    var mnumber = contents[6];
                    var selectedValue = contents[7];
                    var admitDate = contents[8];
                    var birthDate = contents[9];
                    var clinicalInfo = contents[10];
                    var examFindings = contents[11];
                    var cbc = contents[12];
                    var lfts = contents[13];
                    var electrolytes = contents[14];
                    var viralmarkers = contents[15];
                    var imaging = contents[16];
                    var others = contents[17];
                    var operatingNotes = contents[18];
                    var course_treatment = contents[19];
                    for (var j = 20; j < (contents.length - 1); j += 4) {
                        medicine.push(contents[j]);
                        dose.push(contents[j + 1]);
                        time.push(contents[j + 2]);
                        days.push(contents[j + 3]);
                    }
                    var followInfo = contents[contents.length - 1];
                    var prompt = document.getElementById("prompt");
                    var search_data = document.getElementById("search-data");
                    search_data.style.display = "block";
                    prompt.style.display = "block";
                    prompt.innerHTML = "<span>Data Found Successfully.</span>";
                    flag = 1;

                    document.getElementById("fullName").innerHTML = fname;
                    document.getElementById("cName").innerHTML = cname;
                    document.getElementById("Age").innerHTML = age;
                    document.getElementById("Gender").innerHTML = selectedValue;
                    document.getElementById("mobileNumber").innerHTML = mnumber;
                    document.getElementById("hospitalNumber").innerHTML = hnumber;
                    document.getElementById("Cnic").innerHTML = cnic;
                    document.getElementById("Address").innerHTML = address;
                    document.getElementById("AdmitDate").innerHTML = admitDate;
                    document.getElementById("BirthDate").innerHTML = birthDate;
                    document.getElementById("clinicalInfo").innerHTML = clinicalInfo;
                    document.getElementById("examFindings").innerHTML = examFindings;
                    document.getElementById("CBC").innerHTML = cbc;
                    document.getElementById("LFT").innerHTML = lfts;
                    document.getElementById("Electrolyte").innerHTML = electrolytes;
                    document.getElementById("ViralMarkers").innerHTML = viralmarkers;
                    document.getElementById("Imagings").innerHTML = imaging;
                    document.getElementById("OTHERs").innerHTML = others;
                    document.getElementById("operativeNotes").innerHTML = operatingNotes;
                    document.getElementById("treatmentNotes").innerHTML = course_treatment;
                    document.getElementById("followInstructions").innerHTML = followInfo;
                    const iter = ((contents.length - 1) - 20) / 4;
                    for (var j = 0; j < iter; j++) {
                        var htmlContentMed = '<div class="dischargeMed"><span class="dm" style="margin-left: 200px;">' + medicine[j] + '</span><span class="dm">' + dose[j] + '</span><span class="dm">' + time[j] + '</span><span class="dm">' + days[j] + '</span></div>';
                        document.getElementById("dismed").insertAdjacentHTML("beforeend", htmlContentMed);
                    }
                    break;
                }
            }
            if (flag == 0) {
                var prompt = document.getElementById("prompt");
                prompt.style.display = "block";
                prompt.innerHTML = "<span>Data Not Found.</span>";
                document.getElementById("search-data").style.display = "none";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

var obj = {};

function sendData(contents) {
    fetch('http://localhost:3000/appendData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contents)
        })
        .then(response => {
            if (response.ok) {
                console.log('Data sent to server and appended to file!');
            } else {
                console.error('Failed to send data to server:', response.status);
            }
        })
        .catch(error => {
            console.error('Error sending data to server:', error);
        });
}


var add = (event) => {
    event.preventDefault();

    var fname = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var hnumber = document.getElementById("hnumber").value;
    var cnic = document.getElementById("cnic").value;
    var address = document.getElementById("address").value;
    var cname = document.getElementById("cname").value;
    var mnumber = document.getElementById("mnumber").value;
    var genderInputs = document.querySelectorAll('.gender');
    for (var i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
            var selectedValue = genderInputs[i].value;
            break;
        }
    }
    var admitDate = document.getElementById("dt").value;
    var birthDate = document.getElementById("birthday").value;
    var clinicalInfo = document.getElementById("cl").value;
    var examFindings = document.getElementById("efArea").value;
    var cbc = document.getElementById("cbc").value;
    var lfts = document.getElementById("lfts").value;
    var electrolytes = document.getElementById("electrolytes").value;
    var viralmarkers = document.getElementById("viralmarkers").value;
    var imaging = document.getElementById("imaging").value;
    var others = document.getElementById("others").value;
    var operatingNotes = document.getElementById("ontxt").value;
    var course_treatment = document.getElementById("course").value;
    var followInfo = document.getElementById("followup").value;

    var med = document.getElementsByName("medicine");
    var d = document.getElementsByName("dose");
    var t = document.getElementsByName("time");
    var da = document.getElementsByName("days");

    var medicine = [];
    var dose = [];
    var time = [];
    var days = [];

    for (var i = 0; i < med.length; i++) {
        medicine.push(med[i].value);
        dose.push(d[i].value);
        time.push(t[i].value);
        days.push(da[i].value);
    }

    var prompt = document.getElementById("prompt");
    prompt.style.display = "block";
    prompt.innerHTML = "<span>" + medicine[0] + "</span>";

    var dataArray = [
        hnumber,
        fname,
        age,
        cnic,
        address,
        cname,
        mnumber,
        selectedValue,
        admitDate,
        birthDate,
        clinicalInfo,
        examFindings,
        cbc,
        lfts,
        electrolytes,
        viralmarkers,
        imaging,
        others,
        operatingNotes,
        course_treatment,
        followInfo
    ];


    obj = {
        hnumber: dataArray[0],
        fname: dataArray[1],
        age: dataArray[2],
        cnic: dataArray[3],
        address: dataArray[4],
        cname: dataArray[5],
        mnumber: dataArray[6],
        selectedValue: dataArray[7],
        admitDate: dataArray[8],
        birthDate: dataArray[9],
        clinicalInfo: dataArray[10],
        examFindings: dataArray[11],
        cbc: dataArray[12],
        lfts: dataArray[13],
        electrolytes: dataArray[14],
        viralmarkers: dataArray[15],
        imaging: dataArray[16],
        others: dataArray[17],
        operatingNotes: dataArray[18],
        course_treatment: dataArray[19],
    };

    const medicineCount = med.length;
    prompt.innerHTML = "<span>" + medicineCount + "</span>";
    for (let i = 0; i < medicineCount; i++) {

        obj['medicine' + (i + 1)] = medicine[i];
        obj['dose' + (i + 1)] = dose[i];
        obj['time' + (i + 1)] = time[i];
        obj['days' + (i + 1)] = days[i];
    }

    obj.followInfo = dataArray[dataArray.length - 1];
    obj.medicineCount = medicineCount;
    obj.operation = "add";

    sendData(obj);
}

function del_run() {

    fetch('data.txt')
        .then(response => response.text())
        .then(data => {
            var line = data.split("\n");
            line.splice(index, 1);
            var y = document.getElementById("print");
            y.innerHTML = "<p>Details Deleted Successfully</p>";
            y.style.display = "block";
            const object = {};
            for (let i = 0; i < line.length; i++) {
                object[i] = line[i];
            }
            if (line.length == 0) {
                object[0] = "";
            }

            object.operation = "del";
            object.count = line.length;
            sendData(object);
        });

}

var index;
var delelte = (event) => {
    event.preventDefault();
    var medicine = [];
    var dose = [];
    var time = [];
    var days = [];
    var flag = 0;
    var delteItem = document.getElementById("delte").value;

    // Use Fetch API to read the text file
    fetch('data.txt')
        .then(response => response.text())
        .then(data => {
            var line = data.split("\n");
            for (var i = 0; i < line.length; i++) {
                if ((line[i].split("|"))[0] == delteItem) {
                    index = i;
                    var contents = line[i].split("|");
                    var hnumber = contents[0];
                    var fname = contents[1];
                    var age = contents[2];
                    var cnic = contents[3];
                    var address = contents[4];
                    var cname = contents[5];
                    var mnumber = contents[6];
                    var selectedValue = contents[7];
                    var admitDate = contents[8];
                    var birthDate = contents[9];
                    var clinicalInfo = contents[10];
                    var examFindings = contents[11];
                    var cbc = contents[12];
                    var lfts = contents[13];
                    var electrolytes = contents[14];
                    var viralmarkers = contents[15];
                    var imaging = contents[16];
                    var others = contents[17];
                    var operatingNotes = contents[18];
                    var course_treatment = contents[19];
                    for (var j = 20; j < (contents.length - 1); j += 4) {
                        medicine.push(contents[j]);
                        dose.push(contents[j + 1]);
                        time.push(contents[j + 2]);
                        days.push(contents[j + 3]);
                    }
                    var followInfo = contents[contents.length - 1];
                    var prompt = document.getElementById("prompt");
                    var search_data = document.getElementById("delete-data");
                    search_data.style.display = "block";
                    prompt.style.display = "block";
                    prompt.innerHTML = "<span>Data Found Successfully.</span>";
                    flag = 1;

                    document.getElementById("fullName").innerHTML = fname;
                    document.getElementById("cName").innerHTML = cname;
                    document.getElementById("Age").innerHTML = age;
                    document.getElementById("Gender").innerHTML = selectedValue;
                    document.getElementById("mobileNumber").innerHTML = mnumber;
                    document.getElementById("hospitalNumber").innerHTML = hnumber;
                    document.getElementById("Cnic").innerHTML = cnic;
                    document.getElementById("Address").innerHTML = address;
                    document.getElementById("AdmitDate").innerHTML = admitDate;
                    document.getElementById("BirthDate").innerHTML = birthDate;
                    document.getElementById("clinicalInfo").innerHTML = clinicalInfo;
                    document.getElementById("examFindings").innerHTML = examFindings;
                    document.getElementById("CBC").innerHTML = cbc;
                    document.getElementById("LFT").innerHTML = lfts;
                    document.getElementById("Electrolyte").innerHTML = electrolytes;
                    document.getElementById("ViralMarkers").innerHTML = viralmarkers;
                    document.getElementById("Imagings").innerHTML = imaging;
                    document.getElementById("OTHERs").innerHTML = others;
                    document.getElementById("operativeNotes").innerHTML = operatingNotes;
                    document.getElementById("treatmentNotes").innerHTML = course_treatment;
                    document.getElementById("followInstructions").innerHTML = followInfo;
                    const iter = ((contents.length - 1) - 20) / 4;
                    for (var j = 0; j < iter; j++) {
                        var htmlContentMed = '<div class="dischargeMed"><span class="dm" style="margin-left: 200px;">' + medicine[j] + '</span><span class="dm">' + dose[j] + '</span><span class="dm">' + time[j] + '</span><span class="dm">' + days[j] + '</span></div>';
                        document.getElementById("dismed").insertAdjacentHTML("beforeend", htmlContentMed);
                    }
                    var showButton = document.getElementById("show");
                    showButton.style.display = "block";
                    break;
                }
            }
            if (flag == 0) {
                var prompt = document.getElementById("prompt");
                prompt.style.display = "block";
                prompt.innerHTML = "<span>Data Not Found.</span>";
                document.getElementById("delete-data").style.display = "none";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}