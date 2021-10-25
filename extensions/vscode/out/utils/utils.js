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
exports.createDartFile = exports.createDirectory = exports.getProjectName = exports.showTargetDirectoryPrompt = void 0;
const lodash = require("lodash");
const yaml = require("js-yaml");
const changeCase = require("change-case");
const vscode_1 = require("vscode");
const fs_1 = require("fs");
const mkdirp = require("mkdirp");
function showTargetDirectoryPrompt() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            openLabel: "Select a folder to initialize the project in. Needs to be a Flutter app project directory.",
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
exports.showTargetDirectoryPrompt = showTargetDirectoryPrompt;
function getProjectName(targetDirectory) {
    return __awaiter(this, void 0, void 0, function* () {
        const pubspecPath = targetDirectory + '/pubspec.yaml';
        if ((0, fs_1.existsSync)(pubspecPath)) {
            // Get current pubspec data.
            let pubspecData = (0, fs_1.readFileSync)(pubspecPath, "utf8");
            // Create new pubspec.
            let pubspec = yaml.load(pubspecData);
            return pubspec.name;
        }
        else {
            const typedName = yield vscode_1.window.showInputBox({
                prompt: 'Type the name of your project (found in your pubspec file)',
                placeHolder: 'myproject'
            });
            if (lodash.isNil(typedName)) {
                throw Error('Could not create module due to missing project name.');
            }
            return typedName;
        }
    });
}
exports.getProjectName = getProjectName;
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
function createDartFile(name, file, targetDirectory) {
    const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
    const targetPath = `${targetDirectory}/${snakeCaseName}.dart`;
    if ((0, fs_1.existsSync)(targetPath)) {
        throw Error(`${snakeCaseName}.dart already exists`);
    }
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        (0, fs_1.writeFile)(targetPath, file, 'utf8', (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve("");
        });
    }));
}
exports.createDartFile = createDartFile;
//# sourceMappingURL=utils.js.map