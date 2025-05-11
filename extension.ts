import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {

	// obsidianLink.openコマンドの登録
	const openLinkCommand = vscode.commands.registerCommand('obsidianLink.open', async (linkName: string) => {
		const files = await vscode.workspace.findFiles(`**/${linkName}.md`, '**/node_modules/**', 10);
		if (files.length > 0) {
			await vscode.window.showTextDocument(files[0]);
		} else {
			vscode.window.showWarningMessage(`ファイルが見つかりません: ${linkName}.md`);
		}
	});
	context.subscriptions.push(openLinkCommand);

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
				const linkName = result[1];
				const commandUri = vscode.Uri.parse(`command:obsidianLink.open?${encodeURIComponent(JSON.stringify(linkName))}`);
				const link = new vscode.DocumentLink(range, commandUri);
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