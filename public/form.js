
function autoFill(r) {
    if (r.value != "") {
        try {
            let aStudent = JSON.parse(r.value);
            console.log(aStudent.name);
            document.getElementById("studentName").value = aStudent.name;
            document.getElementById("weight").value = aStudent.weight;
            document.getElementById("height").value = aStudent.height;
            document.getElementById("hair_color").value = aStudent.hair_color;
            document.getElementById("gpa").value = aStudent.gpa;
        } catch (err) {
            console.log(err);
            eraseFields();
        }

    } else {
        eraseFields();
    }
}

function eraseFields() {
    document.getElementById("studentName").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";
    document.getElementById("hair_color").value = "";
    document.getElementById("gpa").value = "";
}


// fetch('/changeuser', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },

//     body: JSON.stringify({
//         name: "User",
//     })
// })
//     .then(res => {
//         if (res.ok){
//             console.log("Success!");
//         } else {
//             console.log("Error!");
//         }
//         return res.json();
//     })
//     .then(data => console.log(data)
//     .catch(err => console.log(err)));
