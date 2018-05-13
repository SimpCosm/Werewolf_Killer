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
        srcName = "./audio/player" + (wwgame.curPlayer+1) + "_open_eyes.mp3";
        console.log(srcName);
        $("#bg_music_locked").append('<audio id="m_bg_music_open", autoplay="autoplay", src='+srcName+'/>');
        var mp3 = $("#m_bg_music_open")[0];
        mp3.play();

        setTimeout(function () {
            console.log('here')
            ww.duskPlayerScreen.showCurrentPlayer(wwgame.curPlayer);
            changeScreens("#duskPlayerScreen", "flip");
            // TODO: play audio: please assure your identity.
            srcName = "./audio/请确认你的身份.mp3";
            console.log(srcName);
            $("#bg_music_locked").append('<audio id="m_bg_music_confirm", autoplay="autoplay", src='+srcName+'/>');
            var mp3 = $("#m_bg_music_confirm")[0];
            mp3.play();

            ww.duskPlayerScreen.request()
        }, 5000);

    }

});
