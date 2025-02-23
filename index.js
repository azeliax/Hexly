setInterval(function () {
    document.getElementById("kitty1").classList.add("kitty");
    document.getElementById("kitty2").classList.remove("kitty");
}, 1000);

setInterval(function () {
    document.getElementById("kitty2").classList.add("kitty");
    document.getElementById("kitty1").classList.remove("kitty");
}, 2000);

var tries;
var randomColor;
var bestTry;
var yourColors = document.querySelector(".your-colors");
var submitButton = document.querySelector(".submit");

var colorPicker = new iro.ColorPicker('.colorPicker', { 
    colors: ["#FFFFFF"],
    wheelLightness: false,
    borderWidth: 5,
    width: 280
}); // create color picker



function resetGame() {
    submitButton.style.display= "block";
    document.querySelector(".tries").style.display = "block";
    document.querySelector(".newGame").style.visibility = "hidden";

    document.querySelector(".deltae").innerHTML = "";
    document.querySelector(".result").innerHTML = "";
    document.querySelector(".tries").innerHTML = "You have 5 tries to make your best guess!";
    yourColors.innerHTML = "<p>Your guesses: </p>"; // clear EVERYTHING
    startGame();
}

function createIcon() {
let iconColor = document.createElement("div"); // create containers for guessed colors
    iconColor.classList.add("iconStyle");
    yourColors.appendChild(iconColor);
    lastIconColor = iconColor;
    lastIconColor.style.backgroundColor = colorPicker.color.hexString;

colorPicker.on('color:change', function(color) {
    lastIconColor.style.backgroundColor = color.hexString;
}); //on change - change background color
}

function startGame() {
points = 0;
tries = 5;
bestTry = 100;

const randomHexColorCode = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};
randomColor = randomHexColorCode(); // random hex color

let randColorText = document.querySelector(".randColorText").innerHTML = randomColor;

createIcon();
}

function convertColor() {
    if (tries > 0) {
    let guessedColor = colorPicker.color.hexString;

    let deltaE = Math.round(chroma.deltaE(randomColor, guessedColor));
    bestTry = Math.min(deltaE, bestTry);
    
    yourColors.appendChild(document.createTextNode("   " + guessedColor + " " + deltaE + "%"))
    yourColors.innerHTML += "<br><br>";

    tries--;
    document.querySelector(".tries").innerHTML = "You have " + tries + " tries left."; 

    if (tries > 0)  {
        createIcon();
    }

    document.querySelector(".result").innerHTML = "you were off by (ΔE): " + deltaE + "%";
    document.querySelector(".deltae").innerHTML = "Best try: "  +  bestTry + "% off";

    }
    if (tries==0) {
        document.querySelector(".newGame").style.visibility = "visible";
        var iconColor = yourColors.appendChild(document.createElement("div"));
        iconColor.style.backgroundColor = randomColor;
        iconColor.style.width = "80px";
        iconColor.style.height = "80px";
        iconColor.style.border = "3px solid white";
        yourColors.appendChild(document.createTextNode("   " + randomColor))

        submitButton.style.display = "none";
        document.querySelector(".tries").style.display = "none";
    }
}

window.onload = startGame;