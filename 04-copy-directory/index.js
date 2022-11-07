const fs = require("fs");
const fsPromises = require("node:fs/promises");

const path = require("path");

(async () => {
	await copyFolder(
		path.join(__dirname, "files"),
		path.join(__dirname, "files-copy")
	);

	async function copyFolder(from, to) {
		await fsPromises.mkdir(to, { recursive: true });
		const list = await fsPromises.readdir(from, { withFileTypes: true });

		list.forEach(async (elem) => {
			if (elem.isFile()) {
				const file = await fsPromises.readFile(path.join(from, elem.name));
				await fsPromises.writeFile(path.join(to, elem.name), file);
			} else {
				await copyFolder(path.join(from, elem.name), path.join(to, elem.name));
			}
		});
	}
})();
