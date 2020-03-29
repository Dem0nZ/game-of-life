let field = [] ;
let intervalToken = null;

function playSound() {
    let audio = new Audio();
    audio.src = 'vzzz.mp3';
    audio.autoplay = true;
}

function onStepButtonClick() {
    gameStep();
}

function render() {
    let domList = document.getElementById('field');
domList.innerHTML='';

for (let i = 0; i < field.length; i ++) {
    for (let j = 0; j < field[i].length; j ++) {
        if (field[i][j]){
            let liveCell = document.createElement('div');
            liveCell.className = 'cell live';
            domList.appendChild(liveCell);
        } else {
            let deadCell = document.createElement('div');
            deadCell.className = 'cell';
            domList.appendChild(deadCell);
        }
    }
}
    
}

let fieldDiv = document.getElementById('field');
// from file

  function handleFileSelect(evt) {
      let file = evt.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function (e) {
        let textToArray = reader.result.split("\n").map((x)=>{return x.split(",")});   
        field = textToArray.map(function func(el) {
            if (Object.prototype.toString.call(el) == '[object Array]') {
                return el.map(func);
            }
            return +el;
        });
        fieldDiv.setAttribute('style', 'width:' + (field[0].length * 50) + 'px;');
        playSound();
         render(); 
       };
   }
  
    window.onload = function () {
    document.getElementById('file').addEventListener('change', handleFileSelect, false); 
  }

function onRndButtonClick() {
    playSound();
    let widthField = document.getElementById('widthInput').value;
    let heighField = document.getElementById('heighInput').value;
    let widthElfield = 50 * widthField;
    fieldDiv.setAttribute('style', 'width:' + widthElfield + 'px;');
    let randField = [];
    for(let i = 0; i < heighField; i++) {
        randField[i] = new Array();
        for (let j = 0; j < widthField; j++) {
            randField[i][j] = Math.floor((Math.random() * 2));
        }
    }
    field = randField;
    render();
}

function onPlayButtonClick() {
    if (intervalToken === null) {
        intervalToken = setInterval(gameStep, 500);
    } else {
        clearInterval(intervalToken);
        intervalToken = null;
    }
}

function summNear(i, j) {
     return (
        getSafe(i - 1, j - 1) + 
        getSafe(i - 1, j) + 
        getSafe(i - 1, j + 1) +
        getSafe(i, j - 1) +
        getSafe(i, j + 1) +
        getSafe(i + 1, j - 1) +
        getSafe(i + 1, j) +
        getSafe(i + 1, j + 1)
        );
}

function getSafe(i , j) {
    if (i < 0 || i > field.length - 1 || j < 0 || j > field[i].length - 1) {
        return 0;
    }
    return field[i][j];
}

function gameStep() {
let newField = field.map(function func(el) {
    if (Object.prototype.toString.call(el) == '[object Array]') {
        return el.map(func);
    }
    return 0;
});

for (let i = 0; i < field.length; i ++) {
    for (let j = 0; j < field[i].length; j ++) {
        let summ = summNear(i, j);
        if ((field[i][j] && summ === 2) || summ === 3){
            newField[i][j] = 1;
        } else {
            newField[i][j] = 0;
        }
    }
}
field = newField;
render();
}


