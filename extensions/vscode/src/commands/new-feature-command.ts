import * as lodash from "lodash";
import * as changeCase from "change-case";
import * as yaml from "js-yaml";
import * as utils from '../utils/utils';
import * as templates from '../templates/templates';

import { InputBoxOptions, OpenDialogOptions, QuickPickOptions, Uri, window, workspace } from "vscode";
import { existsSync, lstatSync, readFileSync, writeFile } from "fs";

import mkdirp = require("mkdirp");

export const newFeature = async (uri: Uri) => {

    // Choose a feature name.
    const featureName = await showFeatureNamePrompt();
    if (lodash.isNil(featureName)) {
        window.showErrorMessage("The feature name cannot be empty.");
        return;
    }

    // Choose a feature type.
    const featureType = await showFeatureTypePrompt();
    if(lodash.isNil(featureType)) {
        window.showErrorMessage("The feature type cannot be empty.");
        return;
    }

    // Choose a target directory if directory is null.
    let targetDirectory;
    if (lodash.isNil(lodash.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
        targetDirectory = await utils.showTargetDirectoryPrompt();
        if (lodash.isNil(targetDirectory)) {
        window.showErrorMessage("Directory is not valid.");
        return;
        }
    } else {
        targetDirectory = uri.fsPath;
    }

    try {
        await generateFeature(featureName, featureType, targetDirectory);
        window.showInformationMessage(`Successfully Generated ${featureName} feature.`);
    } catch (error) {
        window.showErrorMessage(`Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`
        );
    }
};

function showFeatureNamePrompt(): Thenable<string | undefined> {
    const options: InputBoxOptions = {
        prompt: "Feature Name",
        placeHolder: "authentication",
    };
    return window.showInputBox(options);
}

async function showFeatureTypePrompt(): Promise<string | undefined> {
    const options: QuickPickOptions = {
        title: "Choose the type of the feature",
        canPickMany: true,
    };
    var picks = await window.showQuickPick([
        "View",
        "Widgets",
        "Cubit",
        "BLoC",
        "Input",
        "Config"
    ], options);

    return picks;
}

async function generateFeature(featureName: string, featureType: string, targetDirectory: string) {

    const projectName = await utils.getProjectName(targetDirectory + '/..');

    if(lodash.isNil(projectName)) {
        window.showErrorMessage('Could not create feature due to missing project name.');
        return;
    }

    const featureDirectoryPath = `${targetDirectory}/${featureName}`;
    const viewDirectoryPath = `${featureDirectoryPath}/view`;
    const cubitDirectoryPath = `${featureDirectoryPath}/cubit`;
    const blocDirectoryPath = `${featureDirectoryPath}/bloc`;

    if (!existsSync(featureDirectoryPath)) {
        await utils.createDirectory(featureDirectoryPath);
        if(featureType.includes("View")) {
            await utils.createDirectory(viewDirectoryPath);
            utils.createDartFile(featureName + "_page", templates.getPageTemplate(featureName, featureType, projectName!), viewDirectoryPath);
            utils.createDartFile(featureName + "_view", templates.getViewTemplate(featureName, featureType, projectName!), viewDirectoryPath);
        }
        if(featureType.includes('Widgets')) {
            await utils.createDirectory(featureDirectoryPath + '/widgets');
        }
        if(featureType.includes("Cubit")) {
            await utils.createDirectory(cubitDirectoryPath);
            utils.createDartFile(featureName + "_cubit", templates.getCubitTemplate(featureName), cubitDirectoryPath);
            utils.createDartFile(featureName + "_state", templates.getCubitStateTemplate(featureName), cubitDirectoryPath);
        }
        if(featureType.includes("BLoC")) {
            await utils.createDirectory(blocDirectoryPath);
            utils.createDartFile(featureName + "_bloc", templates.getBlocTemplate(featureName), blocDirectoryPath);
            utils.createDartFile(featureName + "_state", templates.getBlocStateTemplate(featureName), blocDirectoryPath);
            utils.createDartFile(featureName + "_event", templates.getBlocEventTemplate(featureName), blocDirectoryPath);
        }
        if(featureType.includes("Input")) {
            await utils.createDirectory(featureDirectoryPath + '/input');
        }
        if(featureType.includes("Config")) {
            await utils.createDirectory(featureDirectoryPath + '/config');
        }
    }

    await utils.createDartFile(featureName, templates.getBarrelFileTemplate(featureName, featureType), featureDirectoryPath);
}