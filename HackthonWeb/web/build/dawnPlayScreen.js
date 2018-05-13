ww.dawnPlayScreen = {};

$(function() {

    ww.dawnPlayScreen.showNightActions = function() {
        var dawnReveal = "";
        if(wwgame.nkPlayerIndex >= 0 && wwgame.nkPlayerIndex < wwgame.numPlayers) {
            wwgame.players[wwgame.nkPlayerIndex].alive = false;
            dawnReveal = "A player has been found dead in the night!<br />";
            dawnReveal += wwhtml.getDeathText(wwgame.players[wwgame.nkPlayerIndex]);
            srcName = "./audio/昨晚这个人死了.mp3";
            console.log(srcName);
            $("#bg_music_dawn").append('<audio id="m_bg_music_dawn_dead", autoplay="autoplay", src='+srcName+'/>');
            mp3 = $("#m_bg_music_dawn")[0];
            mp3.play();
        }
        else {
            dawnReveal = "The night passes quietly.  No one has died.";
            srcName = "./audio/昨晚是个平安夜.mp3";
            console.log(srcName);
            $("#bg_music_dawn").append('<audio id="m_bg_music_dawn_safe", autoplay="autoplay", src='+srcName+'/>');
            mp3 = $("#m_bg_music_dawn_safe")[0];
            mp3.play();
        }
        $("#dawnRevealNightActions").html(dawnReveal);
    };

    $("#lynchContinue").click(function() {
        // Check for end of game via NK
        var gameOver = wwgame.getGameOver();
        if (gameOver) {
            // Done!
            ww.gameOverScreen.showGameOver(gameOver);
            changeScreens("#gameOverScreen");
        }
        else {
            // And a new day dawns.
            wwgame.curDay++;
            ww.dawnChooseLynch.showPlayerLynchList();
            changeScreens("#dawnChooseLynch");
        }
    });

});
