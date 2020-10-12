
var resultsEl = document.querySelector("#results");
var highScore = localStorage.getItem("scores");

highScore = JSON.parse(highScore);
console.log(highScore);


postScore();

function postScore() {
    var contentOl = document.createElement("ol");
    for (var i = 0; i < highScore.length; i++) {
        var contentLi = document.createElement("li");

        contentLi.textContent = "Name: " + highScore[i].name + " Score:" + highScore[i].score;
        contentOl.append(contentLi);
        console.log(contentOl);
        highScore.sort(function (a, b) {
            return b.score - a.score
        });

    }
   

    resultsEl.append(contentOl);
    console.log(contentOl);

};

console.log(highScore);
console.log(highScore.length);

