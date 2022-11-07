const fs = require("fs");
const fsPromises = require("node:fs/promises");

const path = require("path");

fsPromises
	.readdir(path.join(__dirname, "secret-folder"), { withFileTypes: true })
	.then((result) => {
		result.forEach((element) => {
			if (element.isFile()) {
				fs.stat(
					path.join(__dirname, "secret-folder", element.name),
					(err, stat) => {
						const arr = element.name.split(".");
						console.log(`${arr[0]} - ${arr[1]} - ${stat.size / 1024}kb`);
					}
				);
			}
		});
	});
