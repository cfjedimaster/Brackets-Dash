/*
* Totally stolen from https://github.com/njx/brackets-simple-node
*/

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, browser: true */
/*global $, define, brackets */

define(function (require, exports, module) {
    "use strict";

    var ExtensionUtils    = brackets.getModule("utils/ExtensionUtils"),
        NodeDomain        = brackets.getModule("utils/NodeDomain"),
        AppInit           = brackets.getModule("utils/AppInit"),
        KeyBindingManager = brackets.getModule("command/KeyBindingManager"),
        CommandManager    = brackets.getModule("command/CommandManager"),
        EditorManager   = brackets.getModule("editor/EditorManager");


    //commands
    var DASH_EXECUTE = "dash.execute";

    var dashDomain = new NodeDomain("dashcaller", ExtensionUtils.getModulePath(module, "node/DashCaller"));

    function callDash() {
        var ed = EditorManager.getActiveEditor();
        var sel = ed.getSelection();
        if(!sel) return;
        var text = ed.document.getRange(sel.start, sel.end);
        if(!text) return;
        dashDomain.exec("callHelp", text)
            .done(function () {
                console.log("[brackets-dash] Done with no errors.");
            }).fail(function (err) {
                console.error("[brackets-dash] Error", err);
            });
    }

    CommandManager.register("Dash Execute", DASH_EXECUTE, callDash);

    AppInit.appReady(function () {
        console.log("[brackets-dash] init");
        KeyBindingManager.addBinding(DASH_EXECUTE, "CTRL-ALT-H");

    });

});