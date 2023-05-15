const gridContainer = document.querySelector(".grid-container");
const body = document.querySelector(".body");
const hight =gridContainer.clientHeight;
let eraserButton = document.getElementById("toggle-eraser");    
let rainbowButton = document.getElementById("toggle-rainbow"); 
let linesButton = document.getElementById("grid-lines-button"); 
let gridNumber = document.querySelector("#grid-size-value").textContent;

let divRowSize =100/gridNumber;


const rangeValue = document.querySelector("#grid-size-range");


function createRow() {
    let divRowSize =100/gridNumber;
    const newRow = document.createElement("div");
    newRow.classList.add("grid-row");
    newRow.style.height = `${divRowSize}%`;
    newRow.style.width = `${100}%`;
    for(let i=0; i < gridNumber; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("grid");
        newDiv.style.height = `${100}%`;
        newDiv.style.width = `${divRowSize}%`;
        newRow.appendChild(newDiv);
    }
    gridContainer.appendChild(newRow);
}

function createGrid() {
    for(let i=0; i < gridNumber; i++) {
        createRow();
    }
}
createGrid();

//Add event listener to range input and add new value to divSize

document.getElementById("grid-size-range").addEventListener("mousemove", function(e) {
    hoverValue = Math.round((e.offsetX+1) / e.target.clientWidth * parseInt(e.target.getAttribute("max")),1);
    document.querySelectorAll("#grid-size-value").forEach( v => {
        v.textContent = hoverValue;
    
})});

// Add event listener to the grid size range  and call a function that removes the old cilhd elements(and draws new with the new grid number/size)
document.getElementById("grid-size-range").addEventListener("mouseup", function() {
    gridNumber = document.querySelector("#grid-size-value").textContent;
    divSize = hight/gridNumber;
    var n = gridContainer.childElementCount;
    for(var i=0; i < n; i++) {
            gridContainer.removeChild(gridContainer.lastElementChild);
        }
    createGrid();
});

penColouring();


//add click eventListeners to eraser, rainbow and hideLines buttons
eraserButton.addEventListener("click", function(e) {  
    if(e.target.classList.length == 0) {
        e.target.classList.add("on-mode");
        rainbowButton.classList.remove("on-mode");

    }
    else {
        e.target.classList.remove("on-mode");
    }
});

rainbowButton.addEventListener("click", function(e) {  
    if(e.target.classList.length == 0) {
        e.target.classList.add("on-mode");
        eraserButton.classList.remove("on-mode");

    }
    else {
        e.target.classList.remove("on-mode");
    }
});

linesButton.addEventListener("click", function(e) {  
    if(e.target.classList.length == 0) {
        e.target.classList.add("on-mode");
        eraserButton.classList.remove("on-mode");
        gridsOff();
    }
    else {
        e.target.classList.remove("on-mode");
        const grids = document.querySelectorAll(".grid");
        grids.forEach(box => {
            box.style.borderLeft = `1px solid`;
            box.style.borderTop = `1px solid`;
        });
    }
});

function gridsOff() {
    const grids = document.querySelectorAll(".grid");
    grids.forEach(box => {
        box.style.borderLeft = `0`;
        box.style.borderTop = `0`;
})};






//if toggle eraser button is on then erase, if it is off then draw with the chosen pen colour
function changeColour(e) {
    if (!eraserButton.classList.contains("on-mode") && !rainbowButton.classList.contains("on-mode")) {
        var penColour = document.getElementById("pen-button").value;
        e.target.style.backgroundColor = penColour;
    }
    else if(rainbowButton.classList.contains("on-mode")) {
       let r = Math.round(Math.random()*255);
       let g = Math.round(Math.random()*255);
       let b = Math.round(Math.random()*255);
       let rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
       console.log(rgb);
       e.target.style.backgroundColor = rgb;
    }

    else {
        e.target.style.removeProperty("background-color");
    }

};

//add mouse down event listener to change background colour of the grid divs





function penColouring () {
  
    gridContainer.addEventListener("mousedown", function() { 
        const grids = document.querySelectorAll(".grid");
        grids.forEach(box => {
            box.addEventListener("click", changeColour)
        });
        grids.forEach(box => {
            box.addEventListener("mouseover", changeColour)
        })});
    
    body.addEventListener("mouseup", function() { 
        const grids = document.querySelectorAll(".grid");
        grids.forEach(box => {
            box.removeEventListener("mouseover", changeColour)
        })});
}


    


// function to change the backgournd (default is white)

backgorundButton = document.getElementById("background-button");


backgorundButton.addEventListener("input", function(e)  {
    document.querySelector(".grid-container").style.backgroundColor = e.currentTarget.value;

});




