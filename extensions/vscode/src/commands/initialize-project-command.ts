import * as lodash from 'lodash';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as utils from '../utils/utils';
import * as templates from '../templates/templates';

import { OpenDialogOptions, QuickPickOptions, Uri, window, workspace } from 'vscode';
import { Dependencies, Pubspec } from '../utils/pubspec';

export const initializeProject = async (uri: Uri) => {
    // Choose a target directory if directory is null.
    let targetDirectory;
    if (lodash.isNil(lodash.get(uri, "fsPath")) || !fs.lstatSync(uri.fsPath).isDirectory()) {
        targetDirectory = await utils.showTargetDirectoryPrompt();
        if (lodash.isNil(targetDirectory)) {
            window.showErrorMessage("Directory has to be a Flutter app project directory.");
            return;
        }
    }
    else {
        targetDirectory = uri.fsPath;
    }

    try {
        let needsFirebase = await showProjectTypePrompt();
        if(lodash.isNil(needsFirebase)) {
            window.showErrorMessage("The project type cannot be empty.");
            return;
        }
        let projectName = await initializePubspec(targetDirectory, needsFirebase);
        await initializeMain(targetDirectory, projectName, needsFirebase);
        window.showInformationMessage(`Successfully Generated Pubspec.yaml and main.dart.`);
    } catch (error) {
        window.showErrorMessage(`Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
};

/// Initializes the pubspec.yaml file and returns the name of the project.
async function initializePubspec(targetDirectory: string, needsFirebase: boolean): Promise<string> {
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

    if(lodash.isNil(pubspec.name)) {
        if(!lodash.isNil(workspace.name)) {
            return workspace.name;
        }
        else {
            window.showErrorMessage("No initial pubspec or workspace is present.");
        }
    }
    return pubspec.name;
}

async function initializeMain(targetDirectory: string, projectName: string, needsFirebase: boolean) {

    createMainFile(targetDirectory, projectName, needsFirebase);
    const appDirectory = targetDirectory + "/lib/app";
    const appViewDirectory = appDirectory + "/view";

    await utils.createDirectory(appDirectory);
    await utils.createDirectory(appViewDirectory);
    await utils.createDartFile("app", templates.getAppTemplate(projectName), appViewDirectory);
    await utils.createDartFile("app_view", templates.getAppViewTemplate(projectName), appViewDirectory);
    await utils.createDartFile("app", templates.getAppBarrelFileTemplate(), appDirectory);
}

async function showProjectTypePrompt(): Promise<boolean> {

  const options: QuickPickOptions = {
    title: "Are you going to use Firebase in your project?",
    canPickMany: false,
  };

  const withFirebase = await window.showQuickPick(["With Firebase", "Without Firebase"], options);
  return withFirebase === "With Firebase";
}

function createMainFile(targetDirectory: string, projectName: string, needsFirebase: boolean) {
  const targetPath = `${targetDirectory}/lib/main.dart`;
  return new Promise(async (resolve, reject) => {
    fs.writeFile(targetPath, templates.getMainFileTemplate(projectName, needsFirebase), "utf8",
    (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve("");
    });
  });
}