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
            console.log("seers");
            $("#duskSeerText").html("Seer Choose Someone To View.");
            $.post("/api/files/post", {data: [1, 2, 3, 4, 5]},
                function(data, status) {
                    $("#duskSeerText").html(data);
                    var index = parseInt(data);
                    $.post("/api/files/post", {data: ["ok", "not_ok"]},
                    function(data, status) {
                        // change state machine.
                        // display final info.
                        if (data === "ok") {
                            var player = wwgame.getPlayerRole(index);
                            console.log(role);
                        } else if (data === "not_ok") {
                            console.log("Request Not Ok for Seer.");
                        }
                    })
                }
            )
        }
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
