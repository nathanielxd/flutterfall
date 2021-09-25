"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const initialize_project_command_1 = require("./commands/initialize-project-command");
const new_module_command_1 = require("./commands/new-module-command");
function activate(context) {
    vscode.commands.registerCommand('rainwater.newModule', new_module_command_1.newModule);
    vscode.commands.registerCommand('rainwater.initializeProject', initialize_project_command_1.initializeProject);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map