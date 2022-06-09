const inputGradesID = [
    'Max',
    'a-plus',
    'a',
    'a-minus',
    'b-plus',
    'b',
    'b-minus',
    'c-plus',
    'c',
    'c-minus',
    'd',
    'f'
];

const listID = [
    'a-plusList',
    'aList',
    'a-minusList',
    'b-plusList',
    'bList',
    'b-minusList',
    'c-plusList',
    'cList',
    'c-minusList',
    'dList',
    'fList'
];

let grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01
];

let dict = {
    'Max': 100.00,
    'a-plus': 95.00,
    'a': 90.00,
    'a-minus': 85.00,
    'b-plus': 80.00,
    'b': 75.00,
    'b-minus': 70.00,
    'c-plus': 65.00,
    'c': 60.00,
    'c-minus': 55.00,
    'd': 50.00,
    'f': 0.00
};

window.onload = () => {
    refreshValues();
};

// allows you to change bounds of grades
inputGradesID.forEach((element) => {
    aGradeChange(element);
});

function aGradeChange(id) {
    let aInput = document.getElementById(id);

    aInput.onchange = (e) => {
        let myNumber = e.target.value;

        if (isNaN(myNumber) || myNumber < 0 || myNumber === '') {
            alert("Please enter a valid number! A positive integer within bounds!");
            aInput.value = parseFloat(dict[id]).toFixed(2);

        } else {
            myNumber = +parseFloat(myNumber).toFixed(2);

            switch (id) {
                case 'Max':
                    if (myNumber <= dict['a-plus']) {
                        alert("Max cannot be less than or equal to A+!");
                    } else {
                        dict['Max'] = myNumber;
                    }
                    break;

                case 'a-plus':
                    if (myNumber <= dict['a'] || myNumber >= dict['Max']) {
                        alert("A+ cannot be equal to, less than A or greater than Max!");
                    } else {
                        dict['a-plus'] = myNumber;
                    }
                    break;

                case 'a':
                    if (myNumber <= dict['a-minus'] || myNumber >= dict['a-plus']) {
                        alert("A cannot be equal to, less than A- or greater than A+!");
                    } else {
                        dict['a'] = myNumber;
                    }
                    break;

                case 'a-minus':
                    if (myNumber <= dict['b-plus'] || myNumber >= dict['a']) {
                        alert("A- cannot be equal to, less than B+ or greater than A!");
                    } else {
                        dict['a-minus'] = myNumber;
                    }
                    break;

                case 'b-plus':
                    if (myNumber <= dict['b'] || myNumber >= dict['a-minus']) {
                        alert("B+ cannot be equal to, less than B or greater than A-!");
                    } else {
                        dict['b-plus'] = myNumber;
                    }
                    break;

                case 'b':
                    if (myNumber <= dict['b-minus'] || myNumber >= dict['b-plus']) {
                        alert("B cannot be equal to, less than B- or greater than B+!");
                    } else {
                        dict['b'] = myNumber;
                    }
                    break;

                case 'b-minus':
                    if (myNumber <= dict['c-plus'] || myNumber >= dict['b']) {
                        alert("B- cannot be equal to, less than C+ or greater than B!");
                    } else {
                        dict['b-minus'] = myNumber;
                    }
                    break;

                case 'c-plus':
                    if (myNumber <= dict['c'] || myNumber >= dict['b-minus']) {
                        alert("C+ cannot be equal to, less than C or greater than B-!");
                    } else {
                        dict['c-plus'] = myNumber;
                    }
                    break;

                case 'c':
                    if (myNumber <= dict['c-minus'] || myNumber >= dict['c-plus']) {
                        alert("C cannot be equal to, less than C- or greater than C+!");
                    } else {
                        dict['c'] = myNumber;
                    }
                    break;

                case 'c-minus':
                    if (myNumber <= dict['d'] || myNumber >= dict['c']) {
                        alert("C- cannot be equal to, less than D or greater than C!");
                    } else {
                        dict['c-minus'] = myNumber;
                    }
                    break;

                case 'd':
                    if (myNumber >= dict['c-minus'] || myNumber <= dict['f']) {
                        alert("D cannot be equal to, greater than C- or less than F!");
                    } else {
                        dict['d'] = myNumber;
                    }
                    break;

                case 'f':
                    if (myNumber >= dict['d']) {
                        alert("F cannot be greater than or equal to D!");
                    } else {
                        dict['f'] = myNumber;
                    }
                    break;

                default:
                    alert("Invalid ID!");
                    console.log("ID: " + id + " is invalid!");
                    break;

            }
            refreshValues();
        }
    };
}

function changeListHTML(id, element) {
    getHTML = document.getElementById(id).innerHTML;

    if (getHTML.length > 17) {
        alert("You have reached the maximum number of grades! Removing overflow!");
        grades.splice(grades.indexOf(element), 1);
        console.log("Removed grade: " + element + " from grades list!");
    } else {
        document.getElementById(id).innerHTML += "O";
    }
}

// refresh the values of the grade lists and adds corresponding 'O'
function refreshValues() {
    inputGradesID.forEach((element) => {
        let aInput = document.getElementById(element);
        aInput.value = parseFloat(dict[element]).toFixed(2);
    });

    listID.forEach((element) => {
        document.getElementById(element).innerHTML = '';
    });

    grades.forEach((element) => {

        if (element <= dict['Max'] && element >= 0) {
            if (element >= dict['a-plus']) {
                changeListHTML('a-plusList', element);
            } else if (element >= dict['a']) {
                changeListHTML('aList', element);
            } else if (element >= dict['a-minus']) {
                changeListHTML('a-minusList', element);
            } else if (element >= dict['b-plus']) {
                changeListHTML('b-plusList', element);
            } else if (element >= dict['b']) {
                changeListHTML('bList', element);
            } else if (element >= dict['b-minus']) {
                changeListHTML('b-minusList', element);
            } else if (element >= dict['c-plus']) {
                changeListHTML('c-plusList', element);
            } else if (element >= dict['c']) {
                changeListHTML('cList', element);
            } else if (element >= dict['c-minus']) {
                changeListHTML('c-minusList', element);
            } else if (element >= dict['d']) {
                changeListHTML('dList', element);
            } else if (element >= dict['f']) {
                changeListHTML('fList', element);
            }
        } else {
            console.log("Error! Invalid grade found in grades list that is out of bounds!");
            console.log("Ignoring grade: " + element);
        }
    });
}



// add new grade to grades list once enter is pressed
document.getElementById("gradeField").onkeyup = (e) => {
    if (e.key === 'Enter') {
        let myNumber = e.target.value;
        if (isNaN(myNumber) || myNumber < 0 || myNumber > dict['Max'] || myNumber === '') {
            alert("Please enter a valid number!");
        } else {
            myNumber = +parseFloat(myNumber).toFixed(2);
            grades.push(myNumber);
            refreshValues();
        }

        document.getElementById("gradeField").value = '';
    }
}