ww.duskPlayerScreen = {};

$(function () {

    ww.duskPlayerScreen.resetForNewDusk = function () {
        wwgame.maxNightActions = wwgame.getMaxNumberActionsForCurDay();
        wwgame.wolfSuggestList = [];
    };

    ww.duskPlayerScreen.showCurrentPlayer = function (playerIndex) {
        var curPlayer = wwgame.players[playerIndex];
        console.log(playerIndex)
        // Setup name, role
        $("#duskPlayerName").html(curPlayer.name);
        $("#roleInfo").html("You are a <b>" + wwhtml.GetRoleAndAttributes(curPlayer.role) + "</b>");
        $("#duskPlayerBg").removeClass();
        $("#duskPlayerBg").addClass("centerAlign " + curPlayer.role.role.imgClass);
    }

    ww.duskPlayerScreen.request = function () {
        var array = [];
        array[0] = 'ok';
        array[1] ='not_ok'
        $.post("/api/files/post", { data: array },
            function (data, status) {
                if (data == 'ok') {
                    //TODO: player [curPlayer] please close your eyes.
                    
                    srcName = "./audio/player" + (wwgame.curPlayer+1) + "_close_eyes.mp3";
                    console.log(srcName);
                    $("#bg_music_player").append('<audio id="m_bg_music_close", autoplay="autoplay", src='+srcName+'/>');
                    var mp3 = $("#m_bg_music_close")[0];
                    mp3.play();

                    changeScreens("#duskLockedScreen", "flip");
                    wwgame.curPlayer = wwgame.getNextLivingPlayerIndex(wwgame.curPlayer);
                    
                    if (wwgame.curPlayer >= 0 && wwgame.curPlayer < wwgame.numPlayers) {
                        ww.duskLockedScreen.checkUnlockState()
                        ww.duskLockedScreen.showCurrentPlayer();
                        ww.duskBlankLockedScreen.nextPage = "#duskLockedScreen";
                        changeScreens("#duskBlankLockedScreen", "flip");
                    }
                    else {
                        if (wwgame.curDay === 0) {
                            //TODO: wolf please open your eyes.
                            srcName = "./audio/狼人请睁眼.mp3";
                            console.log(srcName);
                            $("#bg_music_wolf").append('<audio id="m_bg_music_wolf_open", autoplay="autoplay", src='+srcName+'/>');
                            mp3 = $("#m_bg_music_wolf_open")[0];
                            mp3.play();

                            srcName = "./audio/狼人请互相确认身份.mp3";
                            console.log(srcName);
                            $("#bg_music_wolf").append('<audio id="m_bg_music_wolf_id", autoplay="autoplay", src='+srcName+'/>');
                            mp3 = $("#m_bg_music_wolf_id")[0];
                            mp3.play();
                            
                            
                            ww.duskWolfScreen.cmdPlayerActions();
                            changeScreens("#duskWolfScreen", "flip");
                        }
                    }
                }
            }
        )
    }

    $("#nextPlayerButton").click(function () {
        // Setup next player on lock screen
        wwgame.curPlayer = wwgame.getNextLivingPlayerIndex(wwgame.curPlayer);
        if (wwgame.curPlayer >= 0 && wwgame.curPlayer < wwgame.numPlayers) {
            ww.duskLockedScreen.showCurrentPlayer();
            ww.duskBlankLockedScreen.nextPage = "#duskLockedScreen";
            changeScreens("#duskBlankLockedScreen", "flip");
        }
        else {
            if (wwgame.curDay === 0) {
                console.log("Today is Day 0");
                ww.duskWolfScreen.cmdPlayerActions();
                changeScreens("#duskWolfScreen", "flip");
            }
            /*            
                        else {
                            ww.dawnPlayScreen.showNightActions();
                            ww.duskBlankLockedScreen.nextPage = "#dawnPlayScreen";
                            changeScreens("#duskBlankLockedScreen", "flip");
                        }
            */
        }
        return false;
    });

});
