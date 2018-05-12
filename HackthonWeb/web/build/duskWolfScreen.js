ww.duskWolfScreen = {};

$(function() {

    ww.duskWolfScreen.resetToFirstPlayer = function() {
        // Reset all the data to start the night cycle all over again
        wwgame.curPlayer = wwgame.getFirstLivingPlayerIndex();
        wwgame.nkPlayerIndex = -1;
        ww.duskPlayerScreen.resetForNewDusk();
    };

    ww.duskWolfScreen.resetForNewDusk = function() {
        wwgame.maxNightActions = wwgame.getMaxNumberActionsForCurDay();
        wwgame.wolfSuggestList = [];
    };
    ww.duskWolfScreen.cmdPlayerActions = function() {
        var wolves = wwgame.getLivingWolvesList();

        console.log(wolves);
        console.log(wolves.length);
        if (wolves.length >= 1) {
            //TODO: play audio: -> choose someone to be killed.
            $("#duskWolfText").html("Wolves Choose Someone To Be Killed.");

            $.post("/api/files/post", {data: [1, 2, 3, 4, 5, 6, 7, 8]},
                function(data, status) {
                    $("#duskWolfText").html(data);
                    var kill_index = parseInt(data);
                    //TODO: play audio: -> please confirm.

                    $.post("/api/files/post", {data: ["ok", "not_ok"]},
                    function(data, status) {
                        // change state machine.
                        // display final info.
                        if (data === "ok") {
                            wwgame.killPlayerAtIndex(kill_index);
                            console.log("Kill Play At Index", kill_index);
                            // TODO: play audio -> please wolf close eyes.
                            ww.duskWolfScreen.gotoSeer();

                        } else if (data === "not_ok") {
                            console.log("Request Not Ok");
                        }
                    })
                }
            )
        }
    };

    ww.duskWolfScreen.gotoSeer() = function() {
        // TODO: play audio: seer please open eyes.
        setTimeout(function() {
            ww.duskSeerScreen.cmdPlayerActions();
            changeScreens("#duskSeerScreen", "flip");
            //TODO: play audio: please confirm
        }, 5000);
    };

    $("#nextWolfButton").click(function() {
        console.log("wolf next button clicked.");
        ww.duskSeerScreen.cmdPlayerActions();
        changeScreens("#duskSeerScreen", "flip");
    });

});
