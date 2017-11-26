//-----------------------------------------------------------------------------
// DaedraKyne Plugins - Unlimited common event choices - opening a website
//                    -------
//        Unlimited common event choices.js
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
 /*:
 * @plugindesc v1.0
 * 
 * @author DaedraKyne
 * 
 * 
 * @param choices
 * @text Choices
 * @desc Add choices (don't forget to add their respective common
 * events after!)
 * @type text[]
 * @default []
 * 
 * @param common events
 * @text The choices' common events.
 * @desc Link common events to each choice!
 * @type number[]
 * @default []
 * 
 *
 * 
 * @help
 * ----------------------------------------------------------------------------
 * Introduction
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 * Plugin commands
 * ----------------------------------------------------------------------------
 *
 * 
 * ----------------------------------------------------------------------------
 * Changelog
 * ----------------------------------------------------------------------------
 * v 1.0: Created the plugin.
 * 
//----------------------------------------------------------------------------
*/

(function () {

    var parameters = PluginManager.parameters("Unlimited common event choices");
    var choiceParameters = JSON.parse(parameters["choices"]);
    var commonEventParameters = JSON.parse(parameters["common events"]);


    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        if(command == "choice") {
            $gameMessage.setChoices(choiceAdding(), 0, -1);
            $gameMessage.setChoiceCallback(function(choice) {
                for(var i = 0; i < commonEventParameters.length; i++) {
                    if(choice == i) {$gameTemp.reserveCommonEvent(commonEventParameters[i])};
                    }

             });

        };
        if(command == "cutChoice") {
            var begin = Number(args[0]);
            var end = Number(args[1]);
            console.log(begin);
            console.log(end);
            $gameMessage.setChoices(choiceAddingCut(begin, end), 0, -1);
            $gameMessage.setChoiceCallback(function(choice) {
                var choice = choice + begin - 1;
                console.log(choice);
                for(var i = 0; i < commonEventParameters.length; i++) {
                    if(choice == i) {
                        $gameTemp.reserveCommonEvent(commonEventParameters[i])};
                    }

             });

        };

    };



var choiceAdding = function() {
    var fullChoices = [];
    for(var i = 0; i < choiceParameters.length; i++) {
        fullChoices.push(choiceParameters[i]);
    }
    return fullChoices;
};

var choiceAddingCut = function(beginning, ending) {
    var fullChoices = [];
    var begin = beginning -1;
    var end = ending;
    for(var i = begin; i < end; i++) {
        fullChoices.push(choiceParameters[i]);
    }
    return fullChoices;
};


})();


