var difficultyLevel = 6;

var reset = document.getElementById("reset");
var statusText = document.getElementById("status");
var modeButton = document.querySelectorAll(".mode");
console.log(modeButton);
var displayToGuessColor = document.querySelector("span");
var square = document.querySelectorAll(".square");
var h1Bg = document.querySelector("h1");

var colors = generateRandColors(difficultyLevel);
var pickedColor = toGuessColor(difficultyLevel);

reset.addEventListener("click", resetColors);


init();

function init(){
	resetColors();
	setupModeButtons();
	setupSquareButtons();
}

function setupSquareButtons(){
	for (var i = 0; i < difficultyLevel; i++){
		square[i].addEventListener("click", function(){
			var selectedColor = this.style.backgroundColor; //get the backgroundColor of the selected square
			if (selectedColor === pickedColor){
				changeAllColors(pickedColor);
				console.log(pickedColor);
				h1Bg.style.backgroundColor = pickedColor;
				statusText.textContent = "Play Again?";
				if (difficultyLevel === 6){
					square[i].style.backgroundColor = colors[i];
				} else {
					for (var next = 3; next < 6 ; next++){
						square[next].style.display = "none";
					};
				}
			}else{
				this.style.backgroundColor = "white";
				statusText.textContent = "Try Again";
			}
		});
		square[i].style.backgroundColor = colors[i];
	}
}

function setupModeButtons(){
	for (var i = 0; i<modeButton.length; i++){
		modeButton[i].addEventListener("click", function(){
			modeButton[0].classList.remove("selected");
			modeButton[1].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "EASY"){
				difficultyLevel = 3;
				console.log("in EASY" + difficultyLevel);
			}else{
				difficultyLevel = 6;
			}
			colors = generateRandColors(difficultyLevel);
			console.log(colors);
			pickedColor = toGuessColor(difficultyLevel);
			console.log(pickedColor);
//			square[i].style.display = "block";
//			square[i].style.backgroundColor = colors[i];
			resetColors();
		});
	}
}

function changeAllColors(colors){
	for (var i = 0; i < difficultyLevel; i++){
		square[i].style.backgroundColor = colors;
	}
}

function resetColors(){
	h1Bg.style.backgroundColor = "pink";
	statusText.textContent = "";
	colors = generateRandColors(difficultyLevel); 
//	console.log("new" + colors);
	//select another color
	pickedColor = toGuessColor(difficultyLevel);
//	console.log("new" + pickedColor);
	for (var i = 0; i < difficultyLevel; i++){
		square[i].style.backgroundColor = colors[i];
	}
	
	for(var i = 0; i < square.length; i++){ //if square.len = 3
		if(colors[i]){
			square[i].style.display = "block"
			square[i].style.backgroundColor = colors[i];
		} else {
			square[i].style.display = "none";
		}
	}
};

function generateRandColors(difficultyLevel){
	var arr = []; //generate list of random 6 colors
	for (var c = 0; c < difficultyLevel; c++){
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		var colorRGB = "rgb(" + r + ", " + g + ", " + b +")"
		arr.push(colorRGB);
	}
	return arr;
}


function toGuessColor(difficultyLevel){
	var indexRand = Math.floor(Math.random() * difficultyLevel);
	displayToGuessColor.textContent = colors[indexRand];
	return colors[indexRand];
}
