function printHighscores() {
    //get scores from local storage. or set to empty.
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
   //sort out scores from highest to lowest
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
    highscores.forEach(function(score) {
      //make an li for each highscore
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
      // display on page
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  document.getElementById("clear").onclick = clearHighscores;
  // run function when page loads
  printHighscores();

