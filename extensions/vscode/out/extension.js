"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const initialize_project_command_1 = require("./commands/initialize-project-command");
const new_feature_command_1 = require("./commands/new-feature-command");
const new_module_command_1 = require("./commands/new-module-command");
function activate(context) {
    const newFeatureRegistration = vscode.commands.registerCommand('flutterfall.newFeature', new_feature_command_1.newFeature);
    const newModuleRegistration = vscode.commands.registerCommand('flutterfall.newModule', new_module_command_1.newModule);
    const initializeProjectRegistration = vscode.commands.registerCommand('flutterfall.initializeProject', initialize_project_command_1.initializeProject);
    context.subscriptions.push(newFeatureRegistration, newModuleRegistration, initializeProjectRegistration);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map