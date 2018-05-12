ww.duskPlayerScreen = {};

$(function () {

    ww.duskPlayerScreen.resetForNewDusk = function () {
        wwgame.maxNightActions = wwgame.getMaxNumberActionsForCurDay();
        wwgame.wolfSuggestList = [];
    };

    ww.duskPlayerScreen.showCurrentPlayer = function (playerIndex) {
        var curPlayer = wwgame.players[playerIndex];
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
                    changeScreens("#duskLockedScreen", "flip");
                    ww.duskLockedScreen.checkUnlockState()
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
