var loginFunc = () => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    if (email && password) {
        if (email === "aliamirkhawaja1@gmail.com" && password === "12345") {
            window.location.href = "dashboard.html";
        } else {
            alert('Invalid email or password');
        }
    } else {
        alert('Please enter your email and password');
    }
};

var medFunc=()=>{
    var container=document.getElementById("tab");
    var htmlContent='<tr><td><input type="text" name="medicine" placeholder="Med Name..."></td><td><input type="text" name="dose" placeholder="Dose Name..."></td><td><input type="text" name="time" placeholder="Times a Day..."></td><td><input type="text" name="days" placeholder="Days..."></td></tr>';
    container.insertAdjacentHTML("beforeend", htmlContent);
}

var add = () =>{
    var fname=document.getElementById("name").value;
    var age=document.getElementById("age").value;
    var hnumber=document.getElementById("hnumber").value;
    var cnic=document.getElementById("cnic").value;
    var address=document.getElementById("address").value;
    var cname=document.getElementById("cname").value;
    var mnumber=document.getElementById("mnumber").value;
    var genderInputs = document.querySelectorAll('.gender');
    for (var i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
        var selectedValue = genderInputs[i].value;
      break; 
        }
    }
    var admitDate=document.getElementById("dt").value;
    var birthDate=document.getElementById("birthday").value;
    var clinicalInfo=document.getElementById("cl").value;
    var examFindings=document.getElementById("efArea").value;
    var cbc=document.getElementById("cbc").value;
    var lfts=document.getElementById("lfts").value;
    var electrolytes=document.getElementById("electrolytes").value;
    var viralmarkers=document.getElementById("viralmarkers").value;
    var imaging=document.getElementById("imaging").value;
    var others=document.getElementById("others").value;
    var operatingNotes=document.getElementById("ontxt").value;
    var course_treatment=document.getElementById("course").value;
    var followInfo=document.getElementById("followup").value;

    var med=document.getElementsByClassName("medicine");
    var d=document.getElementsByClassName("dose");
    var t=document.getElementsByClassName("time");
    var da=document.getElementsByClassName("days");

    var medicine=[];
    var dose=[];
    var time=[];
    var days=[];

    for (var i = 0; i < med.length; i++) {
        medicine.push(med[i]);
        dose.push(d[i]);
        time.push(t[i]);
        days.push(da[i]);
    }

    var prompt=document.getElementById("prompt");
    prompt.style.display="block";
    prompt.innerHTML="<span>Data Added Successfullly.</span>";

    const fs = require('fs');

    const data = hnumber+"|"+fname+"|"+age+"|"+cnic+"|"+address+"|"+cname+"|"+mnumber+"|"+
    selectedValue+"|"+admitDate+"|"+birthDate+"|"+clinicalInfo+"|"+examFindings+"|"+
    cbc+"|"+lfts+"|"+electrolytes+"|"+viralmarkers+"|"+imaging+"|"+others+"|"+
    operatingNotes+"|"+course_treatment+"|";
    for (var i=0; i<medicine.length;i++)
    {
        data+=medicine[i].value+"|"+dose[i].value+"|"+time[i].value+"|"+days[i].value+"|";
    }
    data+=followInfo;

    fs.appendFile('data.txt', data, (err) => {
    if (err) throw err;
    console.log('Data has been written to the file.');
    });
}

var searchFunc=()=>{
    var searchItem=document.getElementById("search").value;
    const fs = require('fs');

    fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    });
    const line = data.split('\n');
    for (var i=0;i<line.length;i++) {
        if(1)//line[i].includes(searchItem))
        {
            var contents=line[i].split("|");
            var hnumber=contents[0];
            var fname=contents[1];
            var age=contents[2];
            var cnic=contents[3];
            var address=contents[4];
            var cname=contents[5];
            var mnumber=contents[6];
            var selectedValue=contents[7];
            var admitDate=contents[8];
            var birthDate=contents[9];
            var clinicalInfo=contents[10];
            var examFindings=contents[11];
            var cbc=contents[12];
            var lfts=contents[13];
            var electrolytes=contents[14];
            var viralmarkers=contents[15];
            var imaging=contents[16];
            var others=contents[17];
            var operatingNotes=contents[18];
            var prompt=document.getElementById("prompt");
            prompt.style.display="block";
            prompt.innerHTML="<span>Data Found Successfully.</span>";
        }
        else{
            var prompt=document.getElementById("prompt");
            prompt.style.display="block";
            prompt.innerHTML="<span>Data Not Found.</span>";
        }
    }
}
