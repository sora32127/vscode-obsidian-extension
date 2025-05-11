import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World From TS, Motherfucker');
	});

	context.subscriptions.push(disposable);

	// Markdown用DocumentLinkProviderの登録
	const linkProvider: vscode.DocumentLinkProvider = {
		provideDocumentLinks(document: vscode.TextDocument, token: vscode.CancellationToken) {
			const text = document.getText();
			const links: vscode.DocumentLink[] = [];
			const regex = /\[\[([^\]]+)\]\]/g;
			let match: RegExpExecArray | null;
			for (let result = regex.exec(text); result !== null; result = regex.exec(text)) {
				const start = document.positionAt(result.index);
				const end = document.positionAt(result.index + result[0].length);
				const range = new vscode.Range(start, end);
				// targetは後でコマンドURIに変更予定
				const link = new vscode.DocumentLink(range);
				links.push(link);
			}
			return links;
		}
	};
	context.subscriptions.push(
		vscode.languages.registerDocumentLinkProvider({ language: 'markdown' }, linkProvider)
	);
}

export function deactivate() {} 