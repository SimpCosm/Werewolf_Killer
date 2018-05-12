ww.lynchRevealScreen = {};

$(function() {

    ww.lynchRevealScreen.showLynchedPlayer = function(lynchPlayer) {
        $("#lynchRevealText").html(wwhtml.getDeathText(lynchPlayer));
    };

    $("#lynchRevealContinue").click(function() {
        var gameOver = wwgame.getGameOver();

        if (gameOver) {
            // Done!
            ww.gameOverScreen.showGameOver(gameOver);
            changeScreens("#gameOverScreen");
        }
        else {
            // Setup the first player's lock screen, game continues...
            ww.duskCmdScreen.resetToFirstPlayer();
            ww.duskCmdScreen.cmdPlayerActions();
            //ww.duskLockedScreen.showCurrentPlayer();

            changeScreens("#duskCmdScreen");
        }
    });

});
