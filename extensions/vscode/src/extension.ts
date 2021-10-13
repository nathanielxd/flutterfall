import * as vscode from 'vscode';
import { initializeProject } from './commands/initialize-project-command';
import { newModule } from './commands/new-module-command';

export function activate(context: vscode.ExtensionContext) {

	vscode.commands.registerCommand('flutterfall.newModule', newModule);
	vscode.commands.registerCommand('flutterfall.initializeProject', initializeProject);
}

export function deactivate() {}
