const fs = require("fs");
const path = require("path");

const message = "Write a message \n";

const input = fs.createWriteStream(path.join(__dirname, "text.txt"));

process.stdout.write(message);

process.stdin.on("data", (data) => {
	if (data.toString() === "exit\n") {
		close();
	}
	process.stdout.write(message);
	input.write(data.toString());
});

process.on("SIGINT", () => {
	close();
});

function close() {
	process.stdout.write("\n by,by! \n");
	process.exit();
}
