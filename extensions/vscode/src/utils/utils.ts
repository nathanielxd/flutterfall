import * as lodash from 'lodash';
import * as yaml from 'js-yaml';
import * as changeCase from 'change-case';

import { OpenDialogOptions, window, workspace } from 'vscode';
import { existsSync, readFileSync, writeFile } from 'fs';
import { Pubspec } from './pubspec';

import mkdirp = require('mkdirp');

export async function showTargetDirectoryPrompt(): Promise<string | undefined> {
    const options: OpenDialogOptions = {
        openLabel: "Select a folder to initialize the project in. Needs to be a Flutter app project directory.",
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

export async function getProjectName(targetDirectory: string): Promise<string | undefined> {
    const pubspecPath = targetDirectory + '/pubspec.yaml';
    if(existsSync(pubspecPath)) {
        // Get current pubspec data.
        let pubspecData = readFileSync(pubspecPath, "utf8");
        // Create new pubspec.
        let pubspec = yaml.load(pubspecData) as Pubspec;
        return pubspec.name;
    }
    else {
        const typedName = await window.showInputBox({
            prompt: 'Type the name of your project (found in your pubspec file)', 
            placeHolder: 'myproject'
        });
        
        if(lodash.isNil(typedName)) {
            throw Error('Could not create module due to missing project name.');
        }

        return typedName;
    }
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

export function createDartFile(name: string, file: string, targetDirectory: string) {
    const snakeCaseName = changeCase.snakeCase(name.toLowerCase());
    const targetPath = `${targetDirectory}/${snakeCaseName}.dart`;
    if (existsSync(targetPath)) {
        throw Error(`${snakeCaseName}.dart already exists`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(targetPath, file, 'utf8',
        (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve("");
        });
    });
}