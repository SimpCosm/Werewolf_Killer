ww.lynchRevealScreen = {};

$(function () {

    ww.lynchRevealScreen.showLynchedPlayer = function (lynchPlayer) {
        $("#lynchRevealText").html(wwhtml.getDeathText(lynchPlayer));
        setTimeout(function () {
            var gameOver = wwgame.getGameOver();

            if (gameOver) {
                // Done!
                ww.gameOverScreen.showGameOver(gameOver);
                changeScreens("#gameOverScreen");
            }
            else {
                // Setup the first player's lock screen, game continues...
                ww.duskWolfScreen.resetToFirstPlayer();
                ww.duskWolfScreen.cmdPlayerActions();
                //ww.duskLockedScreen.showCurrentPlayer();

                changeScreens("#duskWolfScreen");
            }
        }, 10000);

    };

    $("#lynchRevealContinue").click(function () {
        var gameOver = wwgame.getGameOver();

        if (gameOver) {
            // Done!
            ww.gameOverScreen.showGameOver(gameOver);
            changeScreens("#gameOverScreen");
        }
        else {
            // Setup the first player's lock screen, game continues...
            ww.duskWolfScreen.resetToFirstPlayer();
            ww.duskWolfScreen.cmdPlayerActions();
            //ww.duskLockedScreen.showCurrentPlayer();

            changeScreens("#duskWolfScreen");
        }
    });

});
