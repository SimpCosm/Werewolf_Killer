var ww = {};

(function(){

    ww.Roles = {
        Villager: {desc:"Villager", nightActionReq:0, team:"Good", imgClass:"bgRoleVillager"},
        Werewolf: {desc:"Werewolf", nightActionReq:1, team:"Evil", imgClass:"bgRoleWerewolf"},
        Seer: {desc:"Seer", nightActionReq:1, team:"Good", imgClass:"bgRoleSeer"},
        Witch: {desc:"Witch", nightActionReq:1, team:"Good", imgClass:"bgRoleWitch"}
    };
    ww.Roles.Seer.viewFor = ww.Roles.Werewolf;
    ww.Roles.Witch.viewFor = ww.Roles.Seer;

    ww.N0Actions = {
        Kill: {desc:"Kills a player N0."},
        ChooseView: {desc:"Chooses a player to view N0."},
        Rescue: {desc:"Try to rescue a player N0."},
        Poison: {desc:"Try to poison a player N0."}
    };

    ww.Rolesets = [
        {name:"Basic 5 player",
            desc:"A simple 5-player game with a single seer and a single werewolf.",
            players: 5,
            roles: [
                {role:ww.Roles.Villager, count: 3},
                {role:ww.Roles.Werewolf, n0:ww.N0Actions.Kill, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1}
            ]
        },
        {name:"Basic 6 player",
            desc:"A simple 6-player game with a single seer and a single werewolf.",
            players: 6,
            roles: [
                {role:ww.Roles.Villager, count: 3},
                {role:ww.Roles.Werewolf, n0:ww.N0Actions.Kill, count: 2},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1}
            ]
        },
        {name:"Simple 7 player",
            desc:"A simple 7-player game.",
            players: 7,
            roles: [
                {role:ww.Roles.Villager, count: 4},
                {role:ww.Roles.Werewolf, n0:ww.N0Actions.Kill, count: 2},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1}
            ]
        },
        {name:"Simple 8 player",
            desc:"A simple 8-player game.",
            players: 8,
            roles: [
                {role:ww.Roles.Villager, count: 2},
                {role:ww.Roles.Werewolf, n0:ww.N0Actions.Kill, count: 3},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Witch, n0:ww.N0Actions.Rescue, count: 1}
            ]
        },
    ];

})();
