import * as vscode from 'vscode';
import { initializeProject } from './commands/initialize-project-command';
import { newFeature } from './commands/new-feature-command';
import { newModule } from './commands/new-module-command';

export function activate(context: vscode.ExtensionContext) {
    const newFeatureRegistration = vscode.commands.registerCommand('flutterfall.newFeature', newFeature);
    const newModuleRegistration = vscode.commands.registerCommand('flutterfall.newModule', newModule);
	const initializeProjectRegistration = vscode.commands.registerCommand('flutterfall.initializeProject', initializeProject);

    context.subscriptions.push(newFeatureRegistration, newModuleRegistration, initializeProjectRegistration);
}

export function deactivate() {}