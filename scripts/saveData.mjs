import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises'

/** @type {import('./scripts').SaveData} */
export default async function saveData(data, fileName) {

	/** @type {import('./scripts').MapReplacer<unknown>} */
	function mapReplacer(_key, value) {
		return value instanceof Map ?
			Array.from(value.entries())
			: value;
	}

	const json = JSON.stringify(data, mapReplacer)

	const generatedFolder = './src/generated'
	if (!existsSync(generatedFolder)) {
		await mkdir(generatedFolder)
	}

	const path = `${generatedFolder}/${fileName}.json`
	await writeFile(path, json).catch(console.error)
	console.log(`✅ Saved all data to '${path}'`)
}

