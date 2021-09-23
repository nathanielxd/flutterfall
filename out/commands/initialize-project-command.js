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
exports.initializeProject = void 0;
const lodash = require("lodash");
const yaml = require("js-yaml");
const fs = require("fs");
const vscode_1 = require("vscode");
const pubspec_1 = require("../models/pubspec");
const main_file_template_1 = require("../templates/main-file-template");
const new_module_command_1 = require("./new-module-command");
const app_view_file_template_1 = require("../templates/app/app-view-file-template");
const app_file_template_1 = require("../templates/app/app-file-template");
const app_barrel_file_template_1 = require("../templates/app/app-barrel-file-template");
const initializeProject = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    // Choose a target directory if directory is null.
    let targetDirectory;
    if (lodash.isNil(lodash.get(uri, "fsPath")) || !fs.lstatSync(uri.fsPath).isDirectory()) {
        targetDirectory = yield showTargetDirectoryPrompt();
        if (lodash.isNil(targetDirectory)) {
            vscode_1.window.showErrorMessage("Directory is not valid.");
            return;
        }
    }
    else {
        targetDirectory = uri.fsPath;
    }
    try {
        let withFirebase = yield showProjectTypePrompt();
        if (lodash.isNil(withFirebase)) {
            vscode_1.window.showErrorMessage("The project type cannot be empty.");
            return;
        }
        let needsFirebase = withFirebase == "With Firebase";
        yield initializeMain(targetDirectory, needsFirebase);
        yield initializePubspec(targetDirectory, needsFirebase);
        vscode_1.window.showInformationMessage(`Successfully Generated Pubspec.yaml and main.dart.`);
    }
    catch (error) {
        vscode_1.window.showErrorMessage(`Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
});
exports.initializeProject = initializeProject;
function initializePubspec(targetDirectory, needsFirebase) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get current pubspec data.
        let pubspecData = fs.readFileSync(targetDirectory + "/pubspec.yaml", "utf8");
        // Write backup.
        fs.writeFileSync(targetDirectory + "/pubspec_backup.yaml", pubspecData, "utf8");
        // Create new pubspec.
        let pubspec = yaml.load(pubspecData);
        // Create new dependencies.
        let dependencies = new pubspec_1.Dependencies(needsFirebase);
        pubspec.dependencies = dependencies;
        // Write new pubspec.
        fs.writeFileSync(targetDirectory + "/pubspec.yaml", yaml.dump(pubspec), "utf8");
    });
}
function initializeMain(targetDirectory, needsFirebase) {
    return __awaiter(this, void 0, void 0, function* () {
        createMainFileTemplate(targetDirectory, needsFirebase);
        const appDirectory = targetDirectory + "/lib/app";
        const appViewDirectory = appDirectory + "/view";
        yield (0, new_module_command_1.createDirectory)(appDirectory);
        yield (0, new_module_command_1.createDirectory)(appViewDirectory);
        yield (0, new_module_command_1.createFileTemplate)("app", (0, app_file_template_1.getAppTemplate)(), appViewDirectory);
        yield (0, new_module_command_1.createFileTemplate)("app_view", (0, app_view_file_template_1.getAppViewTemplate)(), appViewDirectory);
        yield (0, new_module_command_1.createFileTemplate)("app", (0, app_barrel_file_template_1.getAppBarrelFileTemplate)(), appDirectory);
    });
}
function showTargetDirectoryPrompt() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            openLabel: "Select a folder to create the module in",
            canSelectMany: false,
            canSelectFolders: true,
        };
        return vscode_1.window.showOpenDialog(options).then((uri) => {
            if (lodash.isNil(uri) || lodash.isEmpty(uri)) {
                return undefined;
            }
            return uri[0].fsPath;
        });
    });
}
function showProjectTypePrompt() {
    const options = {
        title: "Are you going to use Firebase in your project?",
        canPickMany: false,
    };
    return vscode_1.window.showQuickPick(["With Firebase", "Without Firebase"], options);
}
function createMainFileTemplate(targetDirectory, needsFirebase) {
    const targetPath = `${targetDirectory}/lib/main.dart`;
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        fs.writeFile(targetPath, (0, main_file_template_1.getMainFileTemplate)(needsFirebase), "utf8", (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve("");
        });
    }));
}
//# sourceMappingURL=initialize-project-command.js.map