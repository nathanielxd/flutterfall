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
exports.newFeature = void 0;
const lodash = require("lodash");
const utils = require("../utils/utils");
const templates = require("../templates/templates");
const vscode_1 = require("vscode");
const fs_1 = require("fs");
const newFeature = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    // Choose a feature name.
    const featureName = yield showFeatureNamePrompt();
    if (lodash.isNil(featureName)) {
        vscode_1.window.showErrorMessage("The feature name cannot be empty.");
        return;
    }
    // Choose a feature type.
    const featureType = yield showFeatureTypePrompt();
    if (lodash.isNil(featureType)) {
        vscode_1.window.showErrorMessage("The feature type cannot be empty.");
        return;
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
        yield generateFeature(featureName, featureType, targetDirectory);
        vscode_1.window.showInformationMessage(`Successfully Generated ${featureName} feature.`);
    }
    catch (error) {
        vscode_1.window.showErrorMessage(`Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
});
exports.newFeature = newFeature;
function showFeatureNamePrompt() {
    const options = {
        prompt: "Feature Name",
        placeHolder: "authentication",
    };
    return vscode_1.window.showInputBox(options);
}
function showFeatureTypePrompt() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            title: "Choose the type of the feature",
            canPickMany: true,
        };
        var picks = yield vscode_1.window.showQuickPick([
            "View",
            "Widgets",
            "Cubit",
            "BLoC",
            "Input",
            "Config"
        ], options);
        return picks;
    });
}
function generateFeature(featureName, featureType, targetDirectory) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectName = yield utils.getProjectName(targetDirectory + '/..');
        if (lodash.isNil(projectName)) {
            vscode_1.window.showErrorMessage('Could not create feature due to missing project name.');
            return;
        }
        const featureDirectoryPath = `${targetDirectory}/${featureName}`;
        const viewDirectoryPath = `${featureDirectoryPath}/view`;
        const cubitDirectoryPath = `${featureDirectoryPath}/cubit`;
        const blocDirectoryPath = `${featureDirectoryPath}/bloc`;
        if (!(0, fs_1.existsSync)(featureDirectoryPath)) {
            yield utils.createDirectory(featureDirectoryPath);
            if (featureType.includes("View")) {
                yield utils.createDirectory(viewDirectoryPath);
                utils.createDartFile(featureName + "_page", templates.getPageTemplate(featureName, featureType, projectName), viewDirectoryPath);
                utils.createDartFile(featureName + "_view", templates.getViewTemplate(featureName, featureType, projectName), viewDirectoryPath);
            }
            if (featureType.includes('Widgets')) {
                yield utils.createDirectory(featureDirectoryPath + '/widgets');
            }
            if (featureType.includes("Cubit")) {
                yield utils.createDirectory(cubitDirectoryPath);
                utils.createDartFile(featureName + "_cubit", templates.getCubitTemplate(featureName), cubitDirectoryPath);
                utils.createDartFile(featureName + "_state", templates.getCubitStateTemplate(featureName), cubitDirectoryPath);
            }
            if (featureType.includes("BLoC")) {
                yield utils.createDirectory(blocDirectoryPath);
                utils.createDartFile(featureName + "_bloc", templates.getBlocTemplate(featureName), blocDirectoryPath);
                utils.createDartFile(featureName + "_state", templates.getBlocStateTemplate(featureName), blocDirectoryPath);
                utils.createDartFile(featureName + "_event", templates.getBlocEventTemplate(featureName), blocDirectoryPath);
            }
            if (featureType.includes("Input")) {
                yield utils.createDirectory(featureDirectoryPath + '/input');
            }
            if (featureType.includes("Config")) {
                yield utils.createDirectory(featureDirectoryPath + '/config');
            }
        }
        yield utils.createDartFile(featureName, templates.getBarrelFileTemplate(featureName, featureType), featureDirectoryPath);
    });
}
//# sourceMappingURL=new-feature-command.js.map