/**
 * Created by andre on 17/09/2017.
 */

var idMatrix = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"]
];

var winnerRsp = {};
winnerRsp["status"] = null; //1 = player 1 won, 2 = player 2 won, 0 = nothing , -1 = velha
winnerRsp["message"] = "...";
winnerRsp["position"] = "< line | column | diagonal >";
winnerRsp["positionId"] = -1;


var turn = 0;
var statusID;
var matchFinished = false;


function setStatusId(id) {
    statusID = id;
    updateNext(id, turn);
}

function nextTurn(turn) {
    return ((turn + 1) % 2);
}

function turnToLetter(turn) {
    return (turn == 0)?"X":"O";
}

function turnToValue(turn) {
    return (turn == 0)?-1:1;
}

function clicked(id) {
    console.log("PLAYER "+turn+" CLICKED AT: id("+id+")");
    if(!matchFinished){
        var textInButton = document.getElementById(id).innerHTML;
        if(textInButton == ""){
            document.getElementById(id).innerHTML = turnToLetter(turn);
            document.getElementById(id).setAttribute("value", turnToValue(turn));

            if(turn == 0){
                document.getElementById(id).style.color = "#15c828";
            }else{
                document.getElementById(id).style.color = "#1681fa";
            }


            var winnerInfo = verifyWinner();
            var color = (turn == 0)?"#15c828":"#1681fa";

            if(winnerInfo["status"] == -1){
                matchFinished = true;
                document.getElementById(statusID).innerHTML = "[Empate]";
                console.log("MATCH FINISHED: [VELHA]");
            }else if(winnerInfo["status"] == 1){
                matchFinished = true;
                document.getElementById(statusID).innerHTML = "[O Player [<span id='next' style='color:"+color+"'>"+turnToLetter(turn)+"</span>] ganhou]";
                console.log("MATCH FINISHED: [PLAYER 1] WON");
            }else if(winnerInfo["status"] == 2){
                matchFinished = true;
                document.getElementById(statusID).innerHTML = "[O Player [<span id='next' style='color:"+color+"'>"+turnToLetter(turn)+"</span>] ganhou]";
                console.log("MATCH FINISHED: [PLAYER 2] WON");
            }else{
                console.log("SETING NEXT PLAYER'S TURN");
                turn = nextTurn(turn);
                updateNext(statusID, turn);
            }

        }else{
            console.log("CLICKED AT INVALID SPOT: this move cannot be considered");
        }
    }else{
        console.log("THE MATCH HAS FINISHED: this move cannot be considered")
    }

}

function updateNext(id, turn) {
    var color = (turn == 0)?"#15c828":"#1681fa";

    document.getElementById(id).innerHTML = "[Vez do player [<span id='next' style='color:"+color+"'>"+turnToLetter(turn)+"</span>]]";
}


function verifyWinner() {
    var i, j;
    var zeroCount = 9;

    for(i = 0; i < 3; i++) {

        var sumLine = 0;
        var sumColumn = 0;



        for(j = 0; j < 3; j++){
            var auxLine = parseInt(document.getElementById(idMatrix[i][j]).getAttribute("value"));
            var auxColumn = parseInt(document.getElementById(idMatrix[j][i]).getAttribute("value"));

            console.log("\t LINE["+i+"] Value: " + auxLine + " potition: ["+i+"]["+j+"]");
            console.log("\t COLUMN["+i+"] Value: " + auxColumn + " potition: ["+j+"]["+i+"]");


            if(auxLine != 0){
                zeroCount--;
                //alert("COUNTED "+zeroCount+" zeroes");
            }

            sumLine += auxLine;
            sumColumn += auxColumn;
        }


        console.log("ANALYZING LINE " + i +" SUM IS: "+sumLine);
        console.log("ANALYZING COLUMN " + i +" SUM IS: "+sumColumn);

        if(sumLine == 3){
            console.log("!PLAYER 1 WON IN LINE" + i + "!");
            winnerRsp["status"] = 1; //1 = player 1 won, 2 = player 2 won, 0 = nothing , -1 = velha
            winnerRsp["message"] = "player 1 ganhou";
            winnerRsp["position"] = "line";
            winnerRsp["positionId"] = i;
            setWinnerColor([i+"0",i+"1",i+"2"]);
            return winnerRsp;

        }else if(sumLine == -3){
            console.log("!PLAYER 2 WON IN LINE" + i + "!");
            winnerRsp["status"] = 2; //1 = player 1 won, 2 = player 2 won, 0 = nothing , -1 = velha
            winnerRsp["message"] = "player 2 ganhou";
            winnerRsp["position"] = "line";
            winnerRsp["positionId"] = i;
            setWinnerColor([i+"0",i+"1",i+"2"]);
            return winnerRsp;
        }

        if(sumColumn == 3){
            console.log("!PLAYER 1 WON IN COLUMN" + i + "!");
            winnerRsp["status"] = 1; //1 = player 1 won, 2 = player 2 won, 0 = nothing , -1 = velha
            winnerRsp["message"] = "player 1 ganhou";
            winnerRsp["position"] = "column";
            winnerRsp["positionId"] = i;
            setWinnerColor(["0"+i,"1"+i, "2"+i]);
            return winnerRsp;

        }else if(sumColumn == -3){
            console.log("!PLAYER 2 WON IN COLUMN" + i + "!");
            winnerRsp["status"] = 2; //1 = player 1 won, 2 = player 2 won, 0 = nothing , -1 = velha
            winnerRsp["message"] = "player 2 ganhou";
            winnerRsp["position"] = "column";
            winnerRsp["positionId"] = i;
            setWinnerColor(["0"+i,"1"+i, "2"+i]);
            return winnerRsp;
        }
    }


    //DIAGONAL 0
    var sumDiagonal0 = 0;
    var sumDiagonal1 = 0;

    for(i = 0; i < 3; i++){
        sumDiagonal0 += parseInt(document.getElementById(idMatrix[i][i]).getAttribute("value"));
        sumDiagonal1 += parseInt(document.getElementById(idMatrix[i][2-i]).getAttribute("value"));
    }
    console.log("ANALYZING DIAGONAL 0 SUM IS: "+sumDiagonal0);
    console.log("ANALYZING DIAGONAL 1 SUM IS: "+sumDiagonal1);

    if(sumDiagonal0 == 3){
        console.log("!PLAYER 1 WON IN DIAGONAL 0!");
        winnerRsp["status"] = 1; //1 = player 1 won, 2 = player 2 won, 0 = nothing , -1 = velha
        winnerRsp["message"] = "player 1 ganhou";
        winnerRsp["position"] = "diagonal";
        winnerRsp["positionId"] = 0;
        setWinnerColor(["00","11", "22"]);
        return winnerRsp;

    }else if(sumDiagonal0 == -3){
        console.log("!PLAYER 2 WON IN DIAGONAL 0!");
        winnerRsp["status"] = 2; //1 = player 1 won, 2 = player 2 won, 0 = nothing , -1 = velha
        winnerRsp["message"] = "player 2 ganhou";
        winnerRsp["position"] = "diagonal";
        winnerRsp["positionId"] = 0;
        setWinnerColor(["00","11", "22"]);
        return winnerRsp;
    }

    if(sumDiagonal1 == 3){
        console.log("!PLAYER 1 WON IN DIAGONAL 1!");
        winnerRsp["status"] = 1; //1 = player 1 won, 2 = player 2 won, 0 = nothing , -1 = velha
        winnerRsp["message"] = "player 1 ganhou";
        winnerRsp["position"] = "diagonal";
        winnerRsp["positionId"] = 1;
        setWinnerColor(["02","11", "20"]);
        return winnerRsp;

    }else if(sumDiagonal1 == -3){
        console.log("!PLAYER 2 WON IN DIAGONAL 1!");
        winnerRsp["status"] = 2; //1 = player 1 won, 2 = player 2 won, 0 = nothing , -1 = velha
        winnerRsp["message"] = "player 2 ganhou";
        winnerRsp["position"] = "diagonal";
        winnerRsp["positionId"] = 1;
        setWinnerColor(["02","11", "20"]);
        return winnerRsp;
    }

    console.log("THERE ARE "+ zeroCount+" UNMARKED SPOTS");

    if(zeroCount == 0){
        console.log("!VELHA!");
        winnerRsp["status"] = -1;
        winnerRsp["message"] = "Deu velha!";
        setNoWinnerColor();
        return winnerRsp;
    }

    winnerRsp["status"] = 0; //1 = player 1 won, 2 = player 2 won, 0 = nothing , -1 = velha
    winnerRsp["message"] = "player 1 ganhou";
    winnerRsp["position"] = "line";
    winnerRsp["positionId"] = i;
    return winnerRsp;
}

function restart() {
    console.log("------------------------------- RESTARTING MATCH -------------------------------");
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            var elem = idMatrix[i][j];
            document.getElementById(elem).innerHTML = "";
            document.getElementById(elem).setAttribute("value", "0");
            console.log("CLEANING AT id("+i+""+j+")");
            /*document.getElementById(elem).style.backgroundColor = "#2b2b2b";
            document.getElementById(elem).style.boxShadow = "rgba(51, 47, 52, 0.91) 0 0 10px";*/
            document.getElementById(elem).setAttribute("style", "");
        }
    }

    matchFinished = false;
    turn = 0;
    updateNext(statusID, 0);
    console.log("------------------------------- GAME IS READY -------------------------------");
}

function setWinnerColor(coms) {
    var color = (turn == 0)?"#12671a":"#0c4885";
    for(var i = 0; i < 3; i++){
        document.getElementById(coms[i]).style.backgroundColor = color;
        document.getElementById(coms[i]).style.boxShadow = color+" 0 0 10px";
    }
}

function setNoWinnerColor() {
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            document.getElementById(i.toString() + j.toString()).style.backgroundColor = "#828282";
            document.getElementById(i.toString() + j.toString()).style.color = "#676767";
        }
    }
}