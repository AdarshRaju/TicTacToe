var insidegrid = document.getElementsByClassName("insidegrid");
var maincontainer = document.getElementById("maincontainer");
var statusheading = document.getElementById("statusheading");
var buttoncontainer = document.getElementById("buttoncontainer");
var singleplayerbtn = document.getElementById("singleplayerbtn");
var doubleplayerbtn = document.getElementById("doubleplayerbtn");
var gameover = true;
var singleplayer = false;
var twoplayer = false;
var pencilsound = new Audio("public/pencil-on-paper-45629.mp3");
var winsong = new Audio("public/mixkit-achievement-bell-600.wav");
var whosturn;
var playerxarr = [];
var playeryarr = [];

var r1count = 0;
var r2count = 0;
var r3count = 0;

var c1count = 0;
var c2count = 0;
var c3count = 0;

var d1count = 0;
var d2count = 0;

function resetlocalcounter(){
    r1count = 0;
    r2count = 0;
    r3count = 0;

    c1count = 0;
    c2count = 0;
    c3count = 0;

    d1count = 0;
    d2count = 0;
};


function autoclickcell(){
    let availablecells = [...insidegrid].filter(cell => { return cell.innerHTML == ""});
    // console.log("available cells are: ", availablecells);
    let noofavaicells = availablecells.length;
    let selectedcell = availablecells[Math.floor(Math.random()*noofavaicells)];
    // console.log("selected cell is: ", selectedcell);
    selectedcell.click();
}



maincontainer.addEventListener("click", (e) =>{

    if (!gameover){
        clickaudio(0, 0.45);
        // pencilsound.play();
        if(whosturn == "X") {
            toggleplayerX();
        } else if (whosturn == "Y") {
            toggleplayerY();
            // Ideally just need to have a function here where the cpu clicks on one of the available cells
            if (singleplayer == true){
                autoclickcell();
            }
        }
    }
});

singleplayerbtn.addEventListener("click", (e) =>{
    reset();
    gameover = false;
    singleplayer = true;
    twoplayer= false;
    toggleplayerX();
});

doubleplayerbtn.addEventListener("click", (e) =>{
    reset();
    gameover = false;
    singleplayer = false;
    twoplayer= true;
    toggleplayerX();
});

function clickaudio(starttime, endtime) {
    pencilsound.currentTime = starttime;
    pencilsound.play();

    var soundinterval = setInterval(() =>{
        if(!pencilsound.paused && pencilsound.currentTime >= endtime){
            pencilsound.pause();
            clearInterval(soundinterval);
        }
    },100);
};


function checkwincondition(playercell) {
        
        function declarewinner(){
            
                
                statusheading.innerHTML = `Player ${whosturn == "X" ? "1" : "2"} wins! </br>Click Single Player or Two Player to play again`;
                console.log("status heading has been changed to: ", statusheading.innerHTML);
                gameover=true;
                winsong.play();
                // pencilsound.play();
                // playercell.style.textDecoration= "line-through";
                return 
            }
        

        if (playercell.classList.contains("r1")){
            r1count++;
            if(r1count == 3){
                declarewinner();
                // use strike-through for all elements in main grid with r1 class
                let r1cells = [...insidegrid].filter(cell => cell.classList.contains("r1"));
                r1cells.forEach(cell => cell.style.textDecoration= "line-through");
            };
        }

        if (playercell.classList.contains("r2")){
            r2count++;
            if(r2count == 3){declarewinner();
                let r2cells = [...insidegrid].filter(cell => cell.classList.contains("r2"));
                r2cells.forEach(cell => cell.style.textDecoration= "line-through");
            };
        }

        if (playercell.classList.contains("r3")){
            r3count++;
            if(r3count == 3){declarewinner();
                if(r3count == 3){declarewinner()
                let r3cells = [...insidegrid].filter(cell => cell.classList.contains("r3"));
                r3cells.forEach(cell => cell.style.textDecoration= "line-through");
            };

            };
        }

        if (playercell.classList.contains("c1")){
            c1count++;
            if(c1count == 3){declarewinner();
                let c1cells = [...insidegrid].filter(cell => cell.classList.contains("c1"));
                c1cells.forEach(cell => cell.style.textDecoration= "line-through");

            };
        }

        if (playercell.classList.contains("c2")){
            c2count++;
            if(c2count == 3){declarewinner();
                let c2cells = [...insidegrid].filter(cell => cell.classList.contains("c2"));
                c2cells.forEach(cell => cell.style.textDecoration= "line-through");

            };
        }

        if (playercell.classList.contains("c3")){
            c3count++;
            if(c3count == 3){declarewinner();
                let c3cells = [...insidegrid].filter(cell => cell.classList.contains("c3"));
                c3cells.forEach(cell => cell.style.textDecoration= "line-through");

            };
        }

        if (playercell.classList.contains("d1")){
            d1count++;
            if(d1count == 3){declarewinner();
                let d1cells = [...insidegrid].filter(cell => cell.classList.contains("d1"));
                d1cells.forEach(cell => cell.style.textDecoration= "line-through");


            };
        }

        if (playercell.classList.contains("d2")){
            d2count++;
            if(d2count == 3){declarewinner();
                let d2cells = [...insidegrid].filter(cell => cell.classList.contains("d2"));
                d2cells.forEach(cell => cell.style.textDecoration= "line-through");

            };
        }
        
    };


function playerXlogic(event){
    event.target.innerHTML = "X";
    playerxarr.push(event.target);
    // check for win condition and return gameover if true
    console.log("playerxarr is now: ", playerxarr);
    // The win condition is checked each time a player makes an input
    playerxarr.forEach(checkwincondition);
    console.log("X's r1count is now: ", r1count);
    if(!gameover){
        
        resetlocalcounter();
        whosturn = "Y";

    }

    if(gameover){
        event.stopPropagation();
        [...insidegrid].forEach (cell => {
            cell.removeEventListener("click", playerYlogic);
            cell.removeEventListener("click", playerXlogic);
          
        });
    }
};

function playerYlogic(event){
    event.target.innerHTML = "Y";
    playeryarr.push(event.target);
    // check for win condition and return gameover if true
    console.log("playerxarr is now: ", playerxarr);
    // The win condition is checked each time a player makes an input
    playeryarr.forEach(checkwincondition);
    console.log("Y's r1count is now: ", r1count);
    if(!gameover){
        
        resetlocalcounter();
        whosturn = "X";

    }

    if(gameover){
        event.stopPropagation();
        [...insidegrid].forEach (cell => {
            cell.removeEventListener("click", playerXlogic);
            cell.removeEventListener("click", playerYlogic);
          
        });
    }
};


function toggleplayerX(){

    if (![...insidegrid].find(cell => cell.innerHTML == "")){
        statusheading.innerHTML = "Draw! </br> Click Single Player or Two Player to play again";
        console.log("empty check passed from toggleplayerX");
        gameover=true;
        [...insidegrid].forEach (cell => {
            cell.removeEventListener("click", playerXlogic);
            cell.removeEventListener("click", playerYlogic);
          
        });
        return;
    }
    whosturn = "X";
    statusheading.innerHTML = "Player 1's turn";
    [...insidegrid].forEach (cell => {
            cell.removeEventListener("click", playerYlogic);
            // console.log("cell.innerHTML is: ", cell.innerHTML)
            if (cell.innerHTML == ""){
                cell.addEventListener("click", playerXlogic);
            };
    });
};

function toggleplayerY(){

     if (![...insidegrid].find(cell => cell.innerHTML == "")){
        statusheading.innerHTML = "Draw! </br> Click Single Player or Two Player to play again";
        console.log("empty check passed from toggleplayerY");
        gameover=true;
        [...insidegrid].forEach (cell => {
            cell.removeEventListener("click", playerXlogic);
            cell.removeEventListener("click", playerYlogic);
          
        });
        return;
    }
    
    whosturn = "Y";
    statusheading.innerHTML = "Player 2's turn";
    [...insidegrid].forEach (cell => {
            cell.removeEventListener("click", playerXlogic);
            if (cell.innerHTML == ""){
                cell.addEventListener("click", playerYlogic);
            };
    });
};

function reset(){
     resetlocalcounter();
        playerxarr = [];
        playeryarr = [];
        
    [...insidegrid].forEach (cell => {
        cell.removeEventListener("click", playerXlogic);
        cell.removeEventListener("click", playerYlogic);
        cell.style.textDecoration = "none";
       
        cell.innerHTML = "";
        
    });

};


// Alternate way to handle events
// document.addEventListener("click", (e) => {

//     if(gameover){
//         console.log("document body was clicked on gameover=true");
//         reset();
//         gameover = false;
//         toggleplayerX();
//     } 
//     else if (!gameover){
//         if(whosturn == "X") {
//             toggleplayerX();
//         } else if (whosturn == "Y") {
//             toggleplayerY();
//             // Ideally just need to have a function here where the cpu clicks on one of the available cells
//             autoclickcell();
//         }
//     }
// });