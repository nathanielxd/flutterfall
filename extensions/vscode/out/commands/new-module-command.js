"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newModule = void 0;
const lodash = require("lodash");
const changeCase = require("change-case");
const utils = require("../utils/utils");
const vscode_1 = require("vscode");
const fs_1 = require("fs");
const templates_1 = require("../templates/templates");
const lodash_1 = require("lodash");
const path_1 = require("path");
const newModule = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    // Choose a module type.
    const moduleType = yield showModuleTypePrompt();
    // Null-check module type.
    if (lodash.isNil(moduleType)) {
        vscode_1.window.showErrorMessage("The module type cannot be empty.");
        return;
    }
    var moduleName;
    if (!moduleType.includes('Theme')) {
        // Choose a module name only if the module is not a theme.
        moduleName = yield showModuleNamePrompt();
        // Null check module name.
        if (lodash.isNil(moduleName)) {
            vscode_1.window.showErrorMessage("A data module's name cannot be empty.");
            return;
        }
    }
    // Choose a target directory if directory is null.
    let targetDirectory;
    if (lodash.isNil(lodash.get(uri, "fsPath")) || !(0, fs_1.lstatSync)(uri.fsPath).isDirectory()) {
        targetDirectory = yield utils.showTargetDirectoryPrompt();
        if (lodash.isNil(targetDirectory)) {
            vscode_1.window.showErrorMessage("Directory is not valid.");
            return;
        }
    }
    else {
        targetDirectory = uri.fsPath;
    }
    try {
        yield generateModule(moduleName, moduleType, targetDirectory);
        vscode_1.window.showInformationMessage(`Successfully Generated ${moduleName} Module.`);
    }
    catch (error) {
        vscode_1.window.showErrorMessage(`Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
});
exports.newModule = newModule;
function showModuleNamePrompt() {
    const options = {
        prompt: "Module Name",
        placeHolder: "account",
    };
    return vscode_1.window.showInputBox(options);
}
function showModuleTypePrompt() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            title: "Choose the type of the module",
            canPickMany: false,
        };
        var picks = yield vscode_1.window.showQuickPick([
            "Data (Models, Repositories)",
            "Theme (Widgets, UI)",
        ], options);
        return picks;
    });
}
function generateModule(moduleName, moduleType, targetDirectory) {
    return __awaiter(this, void 0, void 0, function* () {
        const isTheme = moduleType.includes('Theme');
        if (isTheme) {
            moduleName = 'theme';
        }
        moduleName = changeCase.lowerCase(moduleName);
        var projectName = yield utils.getProjectName(targetDirectory + '/..');
        if (lodash.isNil(projectName)) {
            vscode_1.window.showErrorMessage('Could not create module due to missing project name');
            return;
        }
        projectName = projectName.toLowerCase();
        const moduleDirectoryPath = `${targetDirectory}/${projectName}_${moduleName}`;
        const libDirectoryPath = moduleDirectoryPath + '/lib';
        const srcDirectoryPath = libDirectoryPath + '/src';
        if (!(0, fs_1.existsSync)(moduleDirectoryPath)) {
            yield utils.createDirectory(moduleDirectoryPath);
            yield utils.createDirectory(libDirectoryPath);
            yield utils.createDirectory(srcDirectoryPath);
            writePubspecFile(moduleDirectoryPath, projectName, moduleName);
            if (isTheme) {
                utils.createDartFile(`${projectName}_${moduleName}`, '', srcDirectoryPath);
                utils.createDartFile(moduleName, `export 'src/${projectName}_${moduleName}.dart';`, libDirectoryPath);
            }
            else {
                utils.createDartFile(moduleName, '', libDirectoryPath);
                utils.createDirectory(srcDirectoryPath + '/models');
                utils.createDirectory(srcDirectoryPath + '/repositories');
            }
        }
        else {
            throw Error('There is already an existent module.');
        }
    });
}
function writePubspecFile(moduleDirectoryPath, projectName, moduleName) {
    (0, fs_1.writeFile)(moduleDirectoryPath + '/pubspec.yaml', (0, templates_1.getPubspecModuleFileTemplate)(projectName, moduleName), (error) => {
        if (error) {
            (0, lodash_1.reject)(error);
        }
        (0, path_1.resolve)('');
    });
}
//# sourceMappingURL=new-module-command.js.map