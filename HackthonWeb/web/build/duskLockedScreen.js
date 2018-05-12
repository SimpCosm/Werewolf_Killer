ww.duskLockedScreen = {};

$(function () {

    ww.duskLockedScreen.resetToFirstPlayer = function () {
        // Reset all the data to start the night cycle all over again
        wwgame.curPlayer = wwgame.getFirstLivingPlayerIndex();
        wwgame.nkPlayerIndex = -1;
        ww.duskPlayerScreen.resetForNewDusk();
    };

    ww.duskLockedScreen.showCurrentPlayer = function () {
        $("#lockName").html(wwgame.players[wwgame.curPlayer].name);
    };

    ww.duskLockedScreen.checkUnlockState = function () {
        // TODO: play audio: play [curPlayer] please open eyes. 

        setTimeout(function () {
            ww.duskPlayerScreen.showCurrentPlayer(wwgame.curPlayer);
            changeScreens("#duskPlayerScreen", "flip");
            // TODO: play audio: please assure your identity.

            ww.duskPlayerScreen.request()
        }, 5000);

    }

});
