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
                    $.post("/api/files/post", {data: [1, 2, 3, 4, 5]},
                    function(data, status) {
                        // change state machine.
                        // display final info.
                    })
                }
            )
        }
    };


    $("#nextSeerButton").click(function() {
        console.log("next button clicked.");
        ww.dawnPlayScreen.showNightActions();
        ww.duskSeerScreen.nextPage = "#dawnPlayScreen";
        changeScreens("#dawnPlayScreen", "flip");
    });

});
