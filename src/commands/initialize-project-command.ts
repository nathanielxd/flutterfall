import * as lodash from "lodash";
import * as changeCase from "change-case";
import * as yaml from "js-yaml";
import * as fs from "fs";

import { InputBoxOptions, OpenDialogOptions, QuickPickOptions, Uri, window, workspace } from "vscode";
import mkdirp = require("mkdirp");
import { Pubspec, Dependencies } from "../models/pubspec";
import { getMainFileTemplate } from "../templates/main-file-template";
import { createDirectory, createFileTemplate } from "./new-module-command";
import { getViewTemplate } from "../templates/view/view-template";
import { getPageTemplate } from "../templates/view/page-template";
import { getAppViewTemplate } from "../templates/app/app-view-file-template";
import { getBarrelFileTemplate } from "../templates/barrel-file-template";
import { getAppTemplate } from "../templates/app/app-file-template";
import { getAppBarrelFileTemplate } from "../templates/app/app-barrel-file-template";

export const initializeProject = async (uri: Uri) => {

    // Choose a target directory if directory is null.
    let targetDirectory;
    if (lodash.isNil(lodash.get(uri, "fsPath")) || !fs.lstatSync(uri.fsPath).isDirectory()) {
        targetDirectory = await showTargetDirectoryPrompt();
        if (lodash.isNil(targetDirectory)) {
            window.showErrorMessage("Directory is not valid.");
            return;
        }
    } else {
        targetDirectory = uri.fsPath;
    }

    try {
        let withFirebase = await showProjectTypePrompt();
        if(lodash.isNil(withFirebase)) {
            window.showErrorMessage("The project type cannot be empty.");
            return;
        }
        let needsFirebase = withFirebase == "With Firebase";
        await initializeMain(targetDirectory, needsFirebase);
        await initializePubspec(targetDirectory, needsFirebase);
        window.showInformationMessage(`Successfully Generated Pubspec.yaml and main.dart.`);
    } catch (error) {
        window.showErrorMessage(`Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
}

async function initializePubspec(targetDirectory: string, needsFirebase: boolean) {
    // Get current pubspec data.
    let pubspecData = fs.readFileSync(targetDirectory + "/pubspec.yaml", "utf8");
    // Write backup.
    fs.writeFileSync(targetDirectory + "/pubspec_backup.yaml", pubspecData, "utf8");

    // Create new pubspec.
    let pubspec = yaml.load(pubspecData) as Pubspec;
    // Create new dependencies.
    let dependencies = new Dependencies(needsFirebase);
    pubspec.dependencies = dependencies;
    // Write new pubspec.
    fs.writeFileSync(targetDirectory + "/pubspec.yaml", yaml.dump(pubspec), "utf8");
}

async function initializeMain(targetDirectory: string, needsFirebase: boolean) {
    createMainFileTemplate(targetDirectory, needsFirebase);
    const appDirectory = targetDirectory + "/lib/app";
    const appViewDirectory = appDirectory + "/view";
    await createDirectory(appDirectory);
    await createDirectory(appViewDirectory);
    await createFileTemplate("app", getAppTemplate(), appViewDirectory);
    await createFileTemplate("app_view", getAppViewTemplate(), appViewDirectory);
    await createFileTemplate("app", getAppBarrelFileTemplate(), appDirectory);
}

async function showTargetDirectoryPrompt(): Promise<string | undefined> {

    const options: OpenDialogOptions = {
        openLabel: "Select a folder to create the module in",
        canSelectMany: false,
        canSelectFolders: true,
    };
  
    return window.showOpenDialog(options).then((uri) => {
        if (lodash.isNil(uri) || lodash.isEmpty(uri)) {
            return undefined;
        }
        return uri[0].fsPath;
    });
}

function showProjectTypePrompt(): Thenable<string | undefined> {

    const options: QuickPickOptions = {
      title: "Are you going to use Firebase in your project?",
      canPickMany: false,
    };

    return window.showQuickPick(["With Firebase", "Without Firebase"], options);
}

function createMainFileTemplate(targetDirectory: string, needsFirebase: boolean) {
    const targetPath = `${targetDirectory}/lib/main.dart`;
    return new Promise(async (resolve, reject) => {
        fs.writeFile(targetPath, getMainFileTemplate(needsFirebase), "utf8",
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }
            resolve("");
            }
        );
    });
}