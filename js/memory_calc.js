function calcMemory() {
    var MCVersion = document.getElementById("MCVersion").value;
    var maxPlayers = document.getElementById("maxPlayers").value;
    var viewDistance = document.getElementById("viewDistance").value;

    //calculate radius of view distance
    var viewRadius = calcView(viewDistance);

    if (MCVersion === 'modern') {
        //calculate modern chunks 
        var chunkInt = calcModernChunks(viewRadius, maxPlayers);
        displayResult(chunkInt * 0.5 + 1);
    } else if (MCVersion === 'legacy') {
        var chunkInt = calcLegacyChunks(viewRadius, maxPlayers);
        displayResult(chunkInt * 1);
    } else {
        document.getElementById("output").innerHTML = "you fucked something up";
    }
}

//calculate area of view distance
function calcView(radius) {
    return Math.pow((radius*2 + 1), 2);
}

//calculate chunks loaded, 2205 is chunks loaded by 5 players with view distance of 10
function calcModernChunks(viewDistance, maxPlayers) {
    return roundMemory((viewDistance * maxPlayers) / 2205);
}

//calculate chunks loaded, 4410 is chunks loaded by 5 players with view distance of 10
function calcLegacyChunks(viewDistance, maxPlayers) {
    return roundMemory((viewDistance * maxPlayers) / 4410);
}


//round chunks to whole number
function roundMemory(memory) {
    return Math.ceil(memory);
}

//print result
function displayResult(memory) {
    if (Number.isNaN(memory)) {
        document.getElementById("output").innerHTML = "something went wrong";
    } else {
        document.getElementById("output").innerHTML = memory + "GB"
    }
}