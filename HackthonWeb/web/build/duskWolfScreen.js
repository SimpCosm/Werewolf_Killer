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
            srcName = "./audio/狼人请杀人.mp3";
            console.log(srcName);
            $("#bg_music_wolf").append('<audio id="m_bg_music_wolf_kill", autoplay="autoplay", src='+srcName+'/>');
            mp3 = $("#m_bg_music_wolf_kill")[0];
            mp3.play();

            $("#duskWolfText").html("Wolves Choose Someone To Be Killed.");

            $.post("/api/files/post", {data: [1, 2, 3, 4, 5, 6, 7, 8]},
                function(data, status) {
                    var str = 'Do you want to kill Player ';
                    str += data;
                    str += ' ?'
                    $("#duskWolfText").html(str);
                    var kill_index = parseInt(data.trim());
                    console.log(kill_index);
                    //TODO: play audio: -> please confirm.
                    srcName = "./audio/请确认你的身份.mp3";
                    console.log(srcName);
                    $("#bg_music_wolf").append('<audio id="m_bg_music_wolf_confirm", autoplay="autoplay", src='+srcName+'/>');
                    mp3 = $("#m_bg_music_wolf_confirm")[0];
                    mp3.play();

                    $.post("/api/files/post", {data: ["ok", "not_ok"]},
                    function(data, status) {
                        // change state machine.
                        // display final info.
                        if (data === "ok") {
                            wwgame.killPlayerAtIndex(kill_index);
                            $("#duskWolfText").html("Kill Player "+kill_index);
                            // TODO: play audio -> please wolf close eyes.
                            srcName = "./audio/狼人请闭眼.mp3";
                            console.log(srcName);
                            $("#bg_music_wolf").append('<audio id="m_bg_music_wolf_close", autoplay="autoplay", src='+srcName+'/>');
                            mp3 = $("#m_bg_music_wolf_close")[0];
                            mp3.play();
                            
                            ww.duskWolfScreen.gotoSeer();

                        } else if (data === "not_ok") {
                            console.log("Request Not Ok");
                            ww.duskWolfScreen.cmdPlayerActions()
                        }
                    })
                }
            )
        }
    };

    ww.duskWolfScreen.gotoSeer = function() {
        // TODO: play audio: seer please open eyes.
        srcName = "./audio/预言家请睁眼.mp3";
        console.log(srcName);
        $("#bg_music_seer").append('<audio id="m_bg_music_seer_open", autoplay="autoplay", src='+srcName+'/>');
        mp3 = $("#m_bg_music_seer_open")[0];
        mp3.play();

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
