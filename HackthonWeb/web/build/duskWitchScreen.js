ww.duskWitchScreen = {};

$(function() {

    ww.duskWitchScreen.resetToFirstPlayer = function() {
        // Reset all the data to start the night cycle all over again
        wwgame.curPlayer = wwgame.getFirstLivingPlayerIndex();
        wwgame.nkPlayerIndex = -1;
        ww.duskPlayerScreen.resetForNewDusk();
    };

    ww.duskWitchScreen.resetForNewDusk = function() {
        wwgame.maxNightActions = wwgame.getMaxNumberActionsForCurDay();
        wwgame.wolfSuggestList = [];
    };
    ww.duskWitchScreen.cmdPlayerActions = function() {
        var witches = wwgame.getLivingWitchList();

        console.log(witches);
        console.log(witches.length);
        if (witches.length >= 1) {
            $("#duskWitchText").html("Wolves Choose Someone To Be Poisoned.");

            $.post("/api/files/post", {data: [1, 2, 3, 4, 5]},
                function(data, status) {
                    $("#duskWitchText").html(data);
                    var kill_index = parseInt(data);
                    $.post("/api/files/post", {data: ["ok", "not_ok"]},
                    function(data, status) {
                        // change state machine.
                        // display final info.
                        if (data === "ok") {
                            wwgame.killPlayerAtIndex(kill_index);
                            console.log("Poison Play At Index", kill_index);
                        } else if (data === "not_ok") {
                            console.log("Request Not Ok");
                        }
                    })
                }
            )
        }
    };


    $("#nextWitchButton").click(function() {
        console.log("wolf next button clicked.");
        ww.dawnPlayScreen.showNightActions();
        ww.duskSeerScreen.nextPage = "#dawnPlayScreen";
        changeScreens("#dawnPlayScreen", "flip");
    });

});
