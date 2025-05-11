import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "helloworld-minimal-sample" is now active!');
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World From TS, Motherfucker');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {} 