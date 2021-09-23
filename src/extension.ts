import * as vscode from 'vscode';
import { initializeProject } from './commands/initialize-project-command';
import { newModule } from './commands/new-module-command';

export function activate(context: vscode.ExtensionContext) {

	vscode.commands.registerCommand('rainwater.newModule', newModule);
	vscode.commands.registerCommand('rainwater.initializeProject', initializeProject);
}

export function deactivate() {}
