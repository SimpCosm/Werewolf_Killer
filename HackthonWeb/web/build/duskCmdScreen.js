ww.duskCmdScreen = {};

$(function() {

    ww.duskCmdScreen.resetToFirstPlayer = function() {
        // Reset all the data to start the night cycle all over again
        wwgame.curPlayer = wwgame.getFirstLivingPlayerIndex();
        wwgame.nkPlayerIndex = -1;
        ww.duskPlayerScreen.resetForNewDusk();
    };

    ww.duskCmdScreen.resetForNewDusk = function() {
        wwgame.maxNightActions = wwgame.getMaxNumberActionsForCurDay();
        wwgame.wolfSuggestList = [];
    };
    ww.duskCmdScreen.cmdPlayerActions = function() {
        var wolves = wwgame.getLivingWolvesList();
        var seers = wwgame.getLivingSeersList();

        console.log(wolves);
        console.log(wolves.length);
        if (wolves.length >= 1) {
            $("#duskCmdText").html("Wolves Choose Someone To Be Killed.");

            $.post("/api/files/post", {data: [1, 2, 3, 4, 5]},
                function(data, status) {
                    $("#duskCmdText").html(data);
                    $.post("/api/files/post", {data: [1, 2, 3, 4, 5]},
                    function(data, status) {
                        // change state machine.
                        // display final info.
                    })
                }
            )
        }

        setTimeout(function() { console.log("Waiting for 10 secs...")}, 10000);

        // waiting for 10 secs.
        console.log(seers);
        console.log(seers.length);
        if (seers.length >= 1) {
            console.log("seers");
            $("#duskCmdText").html("Seer Choose Someone To View.");
            $.post("/api/files/post", {data: [1, 2, 3, 4, 5]},
                function(data, status) {
                    $("#duskCmdText").html(data);
                    $.post("/api/files/post", {data: [1, 2, 3, 4, 5]},
                    function(data, status) {
                        // change state machine.
                        // display final info.
                    })
                }
            )
        }
    };


    $("#nextCmdButton").click(function() {
        console.log("next button clicked.");
        ww.dawnPlayScreen.showNightActions();
        ww.duskBlankLockedScreen.nextPage = "#dawnPlayScreen";
        changeScreens("#duskBlankLockedScreen", "flip");
    });

});
