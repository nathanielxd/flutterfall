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
exports.createFileTemplate = exports.createDirectory = exports.newModule = void 0;
const lodash = require("lodash");
const changeCase = require("change-case");
const vscode_1 = require("vscode");
const fs_1 = require("fs");
const mkdirp = require("mkdirp");
const barrel_file_template_1 = require("../templates/barrel-file-template");
const cubit_template_1 = require("../templates/cubit/cubit-template");
const cubit_state_template_1 = require("../templates/cubit/cubit-state-template");
const bloc_template_1 = require("../templates/bloc/bloc-template");
const bloc_state_template_1 = require("../templates/bloc/bloc-state-template");
const bloc_event_template_1 = require("../templates/bloc/bloc-event-template");
const page_template_1 = require("../templates/view/page-template");
const view_template_1 = require("../templates/view/view-template");
const newModule = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    // Choose a module name.
    const moduleName = yield showModuleNamePrompt();
    if (lodash.isNil(moduleName) || moduleName.trim() === "") {
        vscode_1.window.showErrorMessage("The module name cannot be empty.");
        return;
    }
    // Choose a module type.
    const moduleType = yield showModuleTypePrompt();
    if (lodash.isNil(moduleType)) {
        vscode_1.window.showErrorMessage("The module type cannot be empty.");
        return;
    }
    // Choose a target directory if directory is null.
    let targetDirectory;
    if (lodash.isNil(lodash.get(uri, "fsPath")) || !(0, fs_1.lstatSync)(uri.fsPath).isDirectory()) {
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
        placeHolder: "authentication",
    };
    return vscode_1.window.showInputBox(options);
}
function showModuleTypePrompt() {
    const options = {
        title: "Choose the type of the module",
        canPickMany: false,
    };
    return vscode_1.window.showQuickPick(["View", "View & Cubit", "View & BLoC", "View, Cubit & Input", "View, BLoC & Input"], options);
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
function generateModule(moduleName, moduleType, targetDirectory) {
    return __awaiter(this, void 0, void 0, function* () {
        const moduleDirectoryPath = `${targetDirectory}/${moduleName}`;
        const viewDirectoryPath = `${moduleDirectoryPath}/view`;
        const cubitDirectoryPath = `${moduleDirectoryPath}/cubit`;
        const blocDirectoryPath = `${moduleDirectoryPath}/bloc`;
        const inputDirectoryPath = `${moduleDirectoryPath}/input`;
        if (!(0, fs_1.existsSync)(moduleDirectoryPath)) {
            yield createDirectory(moduleDirectoryPath);
            if (moduleType.includes("View")) {
                yield createDirectory(viewDirectoryPath);
                createFileTemplate(moduleName + "_page", (0, page_template_1.getPageTemplate)(moduleName, moduleType), viewDirectoryPath);
                createFileTemplate(moduleName + "_view", (0, view_template_1.getViewTemplate)(moduleName, moduleType), viewDirectoryPath);
            }
            if (moduleType.includes("Cubit")) {
                yield createDirectory(cubitDirectoryPath);
                createFileTemplate(moduleName + "_cubit", (0, cubit_template_1.getCubitTemplate)(moduleName), cubitDirectoryPath);
                createFileTemplate(moduleName + "_state", (0, cubit_state_template_1.getCubitStateTemplate)(moduleName), cubitDirectoryPath);
            }
            if (moduleType.includes("BLoC")) {
                yield createDirectory(blocDirectoryPath);
                createFileTemplate(moduleName + "_bloc", (0, bloc_template_1.getBlocTemplate)(moduleName), blocDirectoryPath);
                createFileTemplate(moduleName + "_state", (0, bloc_state_template_1.getBlocStateTemplate)(moduleName), blocDirectoryPath);
                createFileTemplate(moduleName + "_event", (0, bloc_event_template_1.getBlocEventTemplate)(moduleName), blocDirectoryPath);
            }
            if (moduleType.includes("Input")) {
                yield createDirectory(inputDirectoryPath);
            }
        }
        yield createFileTemplate(moduleName, (0, barrel_file_template_1.getBarrelFileTemplate)(moduleName, moduleType), moduleDirectoryPath);
    });
}
function createDirectory(targetDirectory) {
    return new Promise((resolve, reject) => {
        mkdirp(targetDirectory, (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
}
exports.createDirectory = createDirectory;
function createFileTemplate(moduleName, file, targetDirectory) {
    const snakeCaseModuleName = changeCase.snakeCase(moduleName.toLowerCase());
    const targetPath = `${targetDirectory}/${snakeCaseModuleName}.dart`;
    if ((0, fs_1.existsSync)(targetPath)) {
        throw Error(`${snakeCaseModuleName}.dart already exists`);
    }
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        (0, fs_1.writeFile)(targetPath, file, "utf8", (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve("");
        });
    }));
}
exports.createFileTemplate = createFileTemplate;
//# sourceMappingURL=new-module-command.js.map