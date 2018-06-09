var squarenum = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var goalColorDisplay = document.querySelector("#goalColor");
var messageDisplay = document.querySelector("#message");
var h1DispalyColor = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeBtn = document.querySelectorAll(".mode");

init();

function init(){
	setupButtons();
	setupSquares();
	reset();
}


function setupButtons() {
	//change between button mode
	for(var i = 0; i < modeBtn.length; i++) {
		modeBtn[i].addEventListener("click", function() {
			modeBtn[0].classList.remove("selected");
			modeBtn[1].classList.remove("selected");
			this.classList.add("selected");

			if (this.textContent === "Easy") {
				squarenum = 3;
			}
			else {
				squarenum = 6;
			}
			reset();
		});
	}
}


resetButton.addEventListener("click", function() {
	reset();
});


function setupSquares() {
	for(var i = 0; i < squares.length; i++){
		squares[i].addEventListener("click", function() {		
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				changeColor(clickedColor);
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
			}
			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}


function reset() {
	//generate new colors
	colors = generateRandomColors(squarenum);
	//pick a new goal color
	pickedColor = pickColor();
	//show goalColor in h1
	goalColorDisplay.textContent = pickedColor;

	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";

	for(var i = 0; i < squares.length; i++){
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		}
		else {
			squares[i].style.display = "none";
		}
	}
	h1DispalyColor.style.backgroundColor = "steelblue";
}



//change h1-background color and all squares color to picked color
function changeColor(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
	h1DispalyColor.style.backgroundColor = color;
}


//generate random numbers for rgb
function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}


//generate random rgb color array
function generateRandomColors(num) {
	var rgbArr = [];
	for (var i = 0; i < num; i++) {
		rgbArr.push(randomColor());
	}
	return rgbArr;
}


//pick a random color from colors-array to be the goal color
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}