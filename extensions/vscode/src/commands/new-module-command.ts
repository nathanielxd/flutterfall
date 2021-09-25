import * as lodash from "lodash";
import * as changeCase from "change-case";
import * as yaml from "js-yaml";

import { InputBoxOptions, OpenDialogOptions, QuickPickOptions, Uri, window, workspace } from "vscode";
import { existsSync, lstatSync, readFileSync, writeFile } from "fs";
import mkdirp = require("mkdirp");

import { getBarrelFileTemplate } from "../templates/barrel-file-template";
import { getCubitTemplate } from "../templates/cubit/cubit-template";
import { getCubitStateTemplate } from "../templates/cubit/cubit-state-template";
import { getBlocTemplate } from "../templates/bloc/bloc-template";
import { getBlocStateTemplate } from "../templates/bloc/bloc-state-template";
import { getBlocEventTemplate } from "../templates/bloc/bloc-event-template";
import { getPageTemplate } from "../templates/view/page-template";
import { getViewTemplate } from "../templates/view/view-template";
import { Pubspec } from "../models/pubspec";

export const newModule = async (uri: Uri) => {

  // Choose a module name.
  const moduleName = await showModuleNamePrompt();
  if (lodash.isNil(moduleName) || moduleName.trim() === "") {
    window.showErrorMessage("The module name cannot be empty.");
    return;
  }

  // Choose a module type.
  const moduleType = await showModuleTypePrompt();
  if(lodash.isNil(moduleType)) {
    window.showErrorMessage("The module type cannot be empty.");
    return;
  }

  // Choose a target directory if directory is null.
  let targetDirectory;
  if (lodash.isNil(lodash.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
    targetDirectory = await showTargetDirectoryPrompt();
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
    window.showErrorMessage(`Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};

function showModuleNamePrompt(): Thenable<string | undefined> {
  const options: InputBoxOptions = {
    prompt: "Module Name",
    placeHolder: "authentication",
  };
  return window.showInputBox(options);
}

function showModuleTypePrompt(): Thenable<string | undefined> {
  const options: QuickPickOptions = {
    title: "Choose the type of the module",
    canPickMany: false,
  };
  return window.showQuickPick([
    "View",
    "View & Cubit", 
    "View & BLoC",
    "View, Cubit & Input", 
    "View, BLoC & Input",
    "Cubit",
    "BLoC"
  ], options);
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

async function generateModule(moduleName: string, moduleType: string, targetDirectory: string) {
  const projectName = getProjectName(targetDirectory + '/..');
  console.log(projectName);
  const moduleDirectoryPath = `${targetDirectory}/${moduleName}`;
  const viewDirectoryPath = `${moduleDirectoryPath}/view`;
  const cubitDirectoryPath = `${moduleDirectoryPath}/cubit`;
  const blocDirectoryPath = `${moduleDirectoryPath}/bloc`;
  const inputDirectoryPath = `${moduleDirectoryPath}/input`;

  if (!existsSync(moduleDirectoryPath)) {
    await createDirectory(moduleDirectoryPath);
    if(moduleType.includes("View")) {
      await createDirectory(viewDirectoryPath);
      createFileTemplate(moduleName + "_page", getPageTemplate(moduleName, moduleType, projectName), viewDirectoryPath);
      createFileTemplate(moduleName + "_view", getViewTemplate(moduleName, moduleType, projectName), viewDirectoryPath);
    }
    if(moduleType.includes("Cubit")) {
      await createDirectory(cubitDirectoryPath);
      createFileTemplate(moduleName + "_cubit", getCubitTemplate(moduleName), cubitDirectoryPath);
      createFileTemplate(moduleName + "_state", getCubitStateTemplate(moduleName), cubitDirectoryPath);
    }
    if(moduleType.includes("BLoC")) {
      await createDirectory(blocDirectoryPath);
      createFileTemplate(moduleName + "_bloc", getBlocTemplate(moduleName), blocDirectoryPath);
      createFileTemplate(moduleName + "_state", getBlocStateTemplate(moduleName), blocDirectoryPath);
      createFileTemplate(moduleName + "_event", getBlocEventTemplate(moduleName), blocDirectoryPath);
    }
    if(moduleType.includes("Input")) {
      await createDirectory(inputDirectoryPath);
    }
  }

  await createFileTemplate(moduleName, getBarrelFileTemplate(moduleName, moduleType), moduleDirectoryPath);
}

export function createDirectory(targetDirectory: string): Promise<void> {
  return new Promise((resolve, reject) => {
    mkdirp(targetDirectory, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

export function createFileTemplate(moduleName: string, file: string, targetDirectory: string) {
  const snakeCaseModuleName = changeCase.snakeCase(moduleName.toLowerCase());
  const targetPath = `${targetDirectory}/${snakeCaseModuleName}.dart`;
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseModuleName}.dart already exists`);
  }
  return new Promise(async (resolve, reject) => {
    writeFile(targetPath, file, "utf8",
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

function getProjectName(targetDirectory: string): string {
    // Get current pubspec data.
    let pubspecData = readFileSync(targetDirectory + "/pubspec.yaml", "utf8");
    // Create new pubspec.
    let pubspec = yaml.load(pubspecData) as Pubspec;

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