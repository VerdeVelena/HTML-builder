const fsPromises = require("node:fs/promises");
const fs = require("fs");
const path = require("path");

(async () => {
	await mergeCss(
		path.join(__dirname, "styles"),
		path.join(__dirname, "project-dist", "bundle.css")
	);

	async function mergeCss(from, to) {
		const list = await fsPromises.readdir(from, { withFileTypes: true });
		const cssStream = fs.createWriteStream(to);

		list.forEach(async (elem) => {
			if (path.extname(elem.name) === ".css" && elem.isFile()) {
				const file = await fsPromises.readFile(path.join(from, elem.name));
				cssStream.write(file);
			}
		});
	}
})();
