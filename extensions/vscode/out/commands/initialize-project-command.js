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
const utils = require("../utils/utils");
const templates = require("../templates/templates");
const vscode_1 = require("vscode");
const pubspec_1 = require("../utils/pubspec");
const initializeProject = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    // Choose a target directory if directory is null.
    let targetDirectory;
    if (lodash.isNil(lodash.get(uri, "fsPath")) || !fs.lstatSync(uri.fsPath).isDirectory()) {
        targetDirectory = yield utils.showTargetDirectoryPrompt();
        if (lodash.isNil(targetDirectory)) {
            vscode_1.window.showErrorMessage("Directory has to be a Flutter app project directory.");
            return;
        }
    }
    else {
        targetDirectory = uri.fsPath;
    }
    try {
        let needsFirebase = yield showProjectTypePrompt();
        if (lodash.isNil(needsFirebase)) {
            vscode_1.window.showErrorMessage("The project type cannot be empty.");
            return;
        }
        let projectName = yield initializePubspec(targetDirectory, needsFirebase);
        yield initializeMain(targetDirectory, projectName, needsFirebase);
        vscode_1.window.showInformationMessage(`Successfully Generated Pubspec.yaml and main.dart.`);
    }
    catch (error) {
        vscode_1.window.showErrorMessage(`Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
});
exports.initializeProject = initializeProject;
/// Initializes the pubspec.yaml file and returns the name of the project.
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
        if (lodash.isNil(pubspec.name)) {
            if (!lodash.isNil(vscode_1.workspace.name)) {
                return vscode_1.workspace.name;
            }
            else {
                vscode_1.window.showErrorMessage("No initial pubspec or workspace is present.");
            }
        }
        return pubspec.name;
    });
}
function initializeMain(targetDirectory, projectName, needsFirebase) {
    return __awaiter(this, void 0, void 0, function* () {
        createMainFile(targetDirectory, projectName, needsFirebase);
        const appDirectory = targetDirectory + "/lib/app";
        const appViewDirectory = appDirectory + "/view";
        yield utils.createDirectory(appDirectory);
        yield utils.createDirectory(appViewDirectory);
        yield utils.createDartFile("app", templates.getAppTemplate(projectName), appViewDirectory);
        yield utils.createDartFile("app_view", templates.getAppViewTemplate(projectName), appViewDirectory);
        yield utils.createDartFile("app", templates.getAppBarrelFileTemplate(), appDirectory);
    });
}
function showProjectTypePrompt() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            title: "Are you going to use Firebase in your project?",
            canPickMany: false,
        };
        const withFirebase = yield vscode_1.window.showQuickPick(["With Firebase", "Without Firebase"], options);
        return withFirebase === "With Firebase";
    });
}
function createMainFile(targetDirectory, projectName, needsFirebase) {
    const targetPath = `${targetDirectory}/lib/main.dart`;
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        fs.writeFile(targetPath, templates.getMainFileTemplate(projectName, needsFirebase), "utf8", (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve("");
        });
    }));
}
//# sourceMappingURL=initialize-project-command.js.map