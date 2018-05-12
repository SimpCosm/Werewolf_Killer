ww.titleScreen = {};

$(function () {

    ww.titleScreen.resetTitleScreen = function () {
        // Title Screen Setup
        var options = "";
        var addedPlayers = [];

        for (var role in ww.Rolesets) {
            if (jQuery.inArray(ww.Rolesets[role].players, addedPlayers) === -1) {
                addedPlayers.push(ww.Rolesets[role].players);
                options += '<option value="' + ww.Rolesets[role].players + '"';
                if (ww.Rolesets[role].players == wwgame.numPlayers) {
                    options += ' selected';
                }
                options += '>' + ww.Rolesets[role].players + ' Players</option>';
            }
        }
        $('#players').html(options);
        $("#players").change(); // init values
        $('#roleset').change(); // init values
    };

    // React to players combo box changing
    $("#players").change(function () {
        wwgame.numPlayers = parseInt($('#players').val(), 10);
        var options = "";
        for (var role in ww.Rolesets) {
            if (ww.Rolesets[role].players == wwgame.numPlayers) {
                wwgame.roleset = ww.Rolesets[role];
                var desc = "<br />";
                for (var r in wwgame.roleset.roles) {
                    desc += wwgame.roleset.roles[r].count + "x  &nbsp;&nbsp;";
                    desc += wwhtml.GetRoleAndAttributes(wwgame.roleset.roles[r], true);
                    desc += "<br />";
                }
                desc += "<br />"
                $('#rolesetdesc').html(desc);
            }
        }
    });

    // React to Play button
    $("#titlePlayButton").click(function () {
        $.get("/api/files/analysis", function (data, status) {
            console.log(data)
        });
        ww.playerEntryScreen.createLineForEachPlayer();
        var i = 0;
        // Extract all the names
        for (i = 0; i < wwgame.numPlayers; i++) {
            wwgame.players[i] = { name: $("#playerName" + i).val() };
        }
        // Extract and randomize the roles
        var randomRoles = [];
        for (i = 0; i < wwgame.roleset.roles.length; i++) {
            for (var j = 0; j < wwgame.roleset.roles[i].count; j++) {
                randomRoles.push(wwgame.roleset.roles[i]);
            }
        }
        shuffle(randomRoles);
        // Then hand them out
        for (i = 0; i < wwgame.numPlayers; i++) {
            wwgame.players[i].role = randomRoles[i];
            wwgame.players[i].alive = true;
            wwgame.players[i].index = i;
        }

        // Reset to a new game
        wwgame.curDay = 0;

        // Setup the first player's lock screen
        ww.duskLockedScreen.resetToFirstPlayer();
        ww.duskLockedScreen.showCurrentPlayer();
        changeScreens("#duskLockedScreen");
        ww.duskLockedScreen.checkUnlockState()

        return false;
    });

});
