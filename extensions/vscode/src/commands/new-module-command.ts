import * as lodash from "lodash";
import * as changeCase from "change-case";
import * as utils from '../utils/utils';

import { InputBoxOptions, QuickPickOptions, Uri, window, workspace } from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";
import { getPubspecModuleFileTemplate } from "../templates/templates";
import { reject } from "lodash";
import { resolve } from "path";

export const newModule = async (uri: Uri) => {

    // Choose a module type.
    const moduleType = await showModuleTypePrompt();
    // Null-check module type.
    if(lodash.isNil(moduleType)) {
        window.showErrorMessage("The module type cannot be empty.");
        return;
    }

    var moduleName;
    if(!moduleType.includes('Theme')) {
        // Choose a module name only if the module is not a theme.
        moduleName = await showModuleNamePrompt();
        // Null check module name.
        if (lodash.isNil(moduleName)) {
            window.showErrorMessage("A data module's name cannot be empty.");
            return;
        }
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
        await generateModule(moduleName, moduleType, targetDirectory);
        window.showInformationMessage(`Successfully Generated ${moduleName} Module.`);
    } catch (error) {
        window.showErrorMessage(`Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
};

function showModuleNamePrompt(): Thenable<string | undefined> {
    const options: InputBoxOptions = {
        prompt: "Module Name",
        placeHolder: "account",
    };
    return window.showInputBox(options);
}

async function showModuleTypePrompt(): Promise<string | undefined> {
    const options: QuickPickOptions = {
        title: "Choose the type of the module",
        canPickMany: false,
    };
    var picks = await window.showQuickPick([
        "Data (Models, Repositories)",
        "Theme (Widgets, UI)",
    ], options);

    return picks;
}

async function generateModule(moduleName: string | undefined, moduleType: string, targetDirectory: string) {

    const isTheme = moduleType.includes('Theme');
    if(isTheme) {
        moduleName = 'theme';
    }

    moduleName = changeCase.lowerCase(moduleName!);

    var projectName = await utils.getProjectName(targetDirectory + '/..');

    if(lodash.isNil(projectName)) {
        window.showErrorMessage('Could not create module due to missing project name');
        return;
    }

    projectName = projectName!.toLowerCase();
    const moduleDirectoryPath = `${targetDirectory}/${projectName}_${moduleName}`;
    const libDirectoryPath = moduleDirectoryPath + '/lib';
    const srcDirectoryPath = libDirectoryPath + '/src';

    if (!existsSync(moduleDirectoryPath)) {
        await utils.createDirectory(moduleDirectoryPath);
        await utils.createDirectory(libDirectoryPath);
        await utils.createDirectory(srcDirectoryPath);

        writePubspecFile(moduleDirectoryPath, projectName, moduleName);
        if(isTheme) {
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
}

function writePubspecFile(moduleDirectoryPath: string, projectName: string, moduleName: string) {
    writeFile(moduleDirectoryPath + '/pubspec.yaml', getPubspecModuleFileTemplate(projectName, moduleName), 
        (error) => {
            if(error) {
                reject(error);
            }
            resolve('');
        }
    );
}