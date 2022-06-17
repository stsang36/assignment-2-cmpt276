const inputFields = [
    'studentName',
    'weight',
    'height',
    'hair_color',
    'gpa'
];

let myValues = {
    name: "",
    weight: "",
    height: "",
    hair_color: "",
    gpa: ""
}

// checks input on the client side, if passed, the server will check it again
inputFields.forEach(element => {
    try {
        let aInput = document.getElementById(element);

        aInput.onchange = (e) => {

            switch (element) {
                case 'studentName':
                    if (e.target.value === "") {
                        alert("Name cannot be blank!");
                        aInput.value = myValues['name'];
                    }
                    break;
                case 'weight':
                    if (isNaN(e.target.value) || e.target.value < 0 || e.target.value === '') {
                        alert("Weight must be a positive number!");
                        aInput.value = myValues['weight'];
                    }
                    break;
                case 'height':
                    if (isNaN(e.target.value) || e.target.value < 0 || e.target.value === '') {
                        alert("Height must be a positive number!");
                        aInput.value = myValues['height'];
                    }
                    break;

                case 'hair_color':
                    if (e.target.value === "" || !checkHairColor(e.target.value)) {
                        alert("Not a valid hair color!");
                        aInput.value = myValues['hair_color'];
                    }
                    break;

                case 'gpa':
                    if (isNaN(e.target.value) || e.target.value < 0 || e.target.value > 4 || e.target.value === '') {
                        alert("GPA must be a number between 0 and 4!");
                        aInput.value = myValues['gpa'];
                    }
                    break;
                default:
                    console("Error! What is this field?");
                    break;
            }
        }
    } catch (err) {
        console.log(err);
    }

    return;
});

// checks valid CSS color, similar to validateHairColor in index.js
function checkHairColor(color) {

    try {
        let mycolor = color.toLowerCase().trim();
        let test = new Option().style;
        test.color = mycolor;
        if (test.color === mycolor) {
            return true;
        }
    } catch (err) {
        console.log(err);
    }

    return false;
}

// autofills the input once an existing user is selected.
function autoFill(r) {
    if (r.value != "") {
        try {
            let aStudent = JSON.parse(r.value);
            myValues['name'] = aStudent.name;
            myValues['weight'] = aStudent.weight;
            myValues['height'] = aStudent.height;
            myValues['hair_color'] = aStudent.hair_color;
            myValues['gpa'] = aStudent.gpa;

        } catch (err) {
            console.log(err);
        }

    } else { // if the user selects nothing, clear the values"
        myValues['name'] = "";
        myValues['weight'] = "";
        myValues['height'] = "";
        myValues['hair_color'] = "";
        myValues['gpa'] = "";
    }

    refreshValues();

    return;
}

// refreshes the values on the page
function refreshValues() {
    try {
        document.getElementById("studentName").value = myValues['name'];
        document.getElementById("weight").value = myValues['weight'];
        document.getElementById("height").value = myValues['height'];
        document.getElementById("hair_color").value = myValues['hair_color'];
        document.getElementById("gpa").value = myValues['gpa'];
    } catch (err) {
        console.log(err);
    }

    return;
}