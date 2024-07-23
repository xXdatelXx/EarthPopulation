import { ExtensionContext, StatusBarAlignment, window } from "vscode";

export async function activate(context: ExtensionContext) {
	const statusBar = window.createStatusBarItem(StatusBarAlignment.Right, 100);
	const population = JSON.parse(await fetchPopulation()).count;
	const formatedPopulation = (population / 1_000_000_000).toLocaleString(undefined, { maximumFractionDigits: 5 });

	statusBar.text = `World population: ${formatedPopulation}`;
	statusBar.show();
}

async function fetchPopulation(): Promise<string> {
	const response = await fetch('https://get-population.p.rapidapi.com/population', {
		method: 'GET',
		headers: {
			'x-rapidapi-key': 'd532385157msh808a9b563f52d70p1fe83djsnc01a912edd35',
			'x-rapidapi-host': 'get-population.p.rapidapi.com'
		}
	});

	if (response.ok)
		return response.text();

	throw response.statusText;
}
 
