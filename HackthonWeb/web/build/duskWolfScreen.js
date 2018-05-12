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
        var seers = wwgame.getLivingSeersList();

        console.log(wolves);
        console.log(wolves.length);
        if (wolves.length >= 1) {
            $("#duskWolfText").html("Wolves Choose Someone To Be Killed.");

            $.post("/api/files/post", {data: [1, 2, 3, 4, 5]},
                function(data, status) {
                    $("#duskWolfText").html(data);
                    $.post("/api/files/post", {data: [1, 2, 3, 4, 5]},
                    function(data, status) {
                        // change state machine.
                        // display final info.
                    })
                }
            )
        }
    };


    $("#nextWolfButton").click(function() {
        console.log("wolf next button clicked.");
        ww.duskSeerScreen.cmdPlayerActions();
        changeScreens("#duskSeerScreen", "flip");
    });

});
