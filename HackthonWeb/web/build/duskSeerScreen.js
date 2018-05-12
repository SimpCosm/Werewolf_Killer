ww.duskSeerScreen = {};

$(function() {

    ww.duskSeerScreen.resetToFirstPlayer = function() {
        // Reset all the data to start the night cycle all over again
        wwgame.curPlayer = wwgame.getFirstLivingPlayerIndex();
        wwgame.nkPlayerIndex = -1;
        ww.duskPlayerScreen.resetForNewDusk();
    };

    ww.duskSeerScreen.resetForNewDusk = function() {
        wwgame.maxNightActions = wwgame.getMaxNumberActionsForCurDay();
        wwgame.wolfSuggestList = [];
    };
    ww.duskSeerScreen.cmdPlayerActions = function() {
        var seers = wwgame.getLivingSeersList();

        console.log(seers);
        console.log(seers.length);
        if (seers.length >= 1) {
            //TODO: play audio: please choose who to view.
            $("#duskSeerText").html("Seer Choose Someone To View.");
            $.post("/api/files/post", {data: [1, 2, 3, 4, 5, 6, 7, 8]},
                function(data, status) {
                    $("#duskSeerText").html(data);
                    var index = parseInt(data);
                    // TODO: play audio: please confirm.
                    $.post("/api/files/post", {data: ["ok", "not_ok"]},
                    function(data, status) {
                        // change state machine.
                        // display final info.
                        if (data === "ok") {
                            var player = wwgame.getPlayerRole(index);
                            role_desc = player.role.role.desc;
                            // TODO: play audio: the role of is
                            console.log(role_desc);
                            $("#duskSeerText").html(role_desc);
                            // TODO: play audio: please seer close eyes.
                            if (wwgame.hasWitch()) {
                                ww.duskSeerScreen.gotoWitch();
                            } else {
                                ww.duskSeerScreen.gotoDawn();
                            }
                        } else if (data === "not_ok") {
                            console.log("Request Not Ok for Seer.");
                        }
                    })
                }
            )
        }
    };

    ww.duskSeerScreen.gotoWitch() = function() {
        // TODO: play audio: witch please open eyes.

        setTimeout(function() {
            ww.duskWitchScreen.cmdPlayerActions();
            changeScreens("#duskWitchScreen", "flip");
        }, 5000);
    };

    ww.duskSeerScreen.gotoDawn() = function() {
        // TODO: play audio: the day is comming.

        setTimeout(function() {
            ww.dawnPlayScreen.showNightActions();
            ww.duskSeerScreen.nextPage = "#dawnPlayScreen";
            changeScreens("#dawnPlayScreen", "flip");
        }, 5000);
    };

    $("#nextSeerButton").click(function() {
        console.log("next button clicked.");
        if (wwgame.hasWitch()) {
            ww.duskWitchScreen.cmdPlayerActions();
            changeScreens("#duskWitchScreen", "flip");
        } else {
            ww.dawnPlayScreen.showNightActions();
            ww.duskSeerScreen.nextPage = "#dawnPlayScreen";
            changeScreens("#dawnPlayScreen", "flip");
        }
    });

});
